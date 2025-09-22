import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Slider,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../services/api/product.api";

function Category() {
  // Bỏ cmt nếu bạn sử dụng phần này
  // const { productCategory } = useSelector((state) => state.category);

  const [form] = Form.useForm();

  const [filterData, setFilterData] = useState();
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const { url } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const page = useMemo(() => Number(new URLSearchParams(location.search).get("page")) || 1, [location.search]);

  const categoryMeta = {
    "consumer-packaging": { ids: [1], name: "Consumer Packaging" },
    "industrial-packaging": { ids: [2], name: "Industrial Packaging" },
  };

  const ids = (categoryMeta[url]?.ids) || [1];
  const defaultName = categoryMeta[url]?.name || "Consumer Packaging";
  const [selectedIds, setSelectedIds] = useState(ids);
  const [title, setTitle] = useState(defaultName);
  const { data } = useGetProductsByCategoryQuery({ ids: selectedIds, page });
  const pageSize = 9;

  // Derived filtering on client (mock does not support server filters)
  const filteredItems = useMemo(() => {
    const source = data?.items || [];
    if (!filterData) return source;

    let result = source;
    if (filterData.textSearch) {
      const q = String(filterData.textSearch).toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q));
    }
    // Placeholders for other filters when backend available
    return result;
  }, [data, filterData]);

  const itemsToRender = useMemo(() => {
    const start = (page - 1) * pageSize;
    const sliced = filteredItems.slice(start, start + pageSize);
    return sliced.length ? sliced : filteredItems;
  }, [filteredItems, page]);

  // Scroll on page change or slug change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [url, page]);

  // Initialize category selection only when slug changes
  useEffect(() => {
    const preset = categoryMeta[url]?.ids;
    form.setFieldsValue({ categories: preset });
    setSelectedIds(preset || [1]);
    setTitle(categoryMeta[url]?.name || "All Products");
  }, [url]);

  const onValuesChange = (changedValues, allValues) => {
    const hasValue = Object.values(allValues).some((value) => value);
    setSubmitDisabled(!hasValue);

    if (Object.prototype.hasOwnProperty.call(changedValues, "categories")) {
      const selected = changedValues.categories || [];
      // stay on this page; if none or both selected, label as "All Products"
      if (selected.length === 0 || selected.length === 2) {
        setSelectedIds([1, 2]);
        setTitle("All Products");
        const params = new URLSearchParams(location.search);
        params.set("page", "1");
        navigate({ pathname: location.pathname, search: params.toString() });
        return;
      }
      if (selected.length === 1) {
        const targetId = selected[0];
        setSelectedIds([targetId]);
        setTitle(targetId === 1 ? "Consumer Packaging" : "Industrial Packaging");
        const params = new URLSearchParams(location.search);
        params.set("page", "1");
        navigate({ pathname: location.pathname, search: params.toString() });
      }
    }
  };

  const onFilter = async (values) => {
    const hasValue = Object.values(values).some((value) => value);
    if (!hasValue) {
      return;
    }

    let filters;
    Object.keys(values).forEach((key) => {
      if (
        values[key] &&
        values[key].length > 0 &&
        key !== "categories" &&
        key !== "textSearch"
      ) {
        filters = { ...filters, [key]: values[key] };
      }
    });

    // Save filters locally and reset to first page
    setFilterData({ ...values, filters });
    const params = new URLSearchParams(location.search);
    params.set("page", "1");
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const clearFilters = () => {
    form.resetFields();
    setFilterData();
    setSubmitDisabled(true);
    const params = new URLSearchParams(location.search);
    params.set("page", "1");
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <div className="video-overlay no-click fill"></div>
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="images/website/video_category_product.mp4"
              type="video/mp4"
            />
          </video>
          <div className="section-bg-overlay absolute fill"></div>
        </div>
        <div className="section-content relative">
          <div className="_4csl">
            <Row gutter={30}>
              <Col span={12} className="_9trw RemovePaddingBottom">
                <div className="_4yvp">
                  <Breadcrumb
                    items={[
                      {
                        title: (
                          <a href="/" className="item-bread">
                            Home
                          </a>
                        ),
                      },
                      {
                        title: (
                          <Link to="/all-product" className="item-bread">
                            All Products
                          </Link>
                        ),
                      },
                      {
                        title: <span className="active-bread">Packaging</span>,
                      },
                    ]}
                    id="breadcrumb"
                  />

                  <h2 className="_5xfq _1kly">Packaging</h2>
                  <div className="_7vyg">
                    <p>
                      All our products are under absolute supervision, from raw
                      materials to finished products.
                    </p>
                    <p>
                      We apply an international quality management system to all
                      of our products.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="penury-gym section">
        <div className="section-content relative">
          <div className="category-page-row">
            <Row gutter={30}>
              <Col span={6}>
                <div className="product_sidebar_cate">
                  <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onValuesChange}
                    onFinish={onFilter}
                  >
                    <div className="_4get">
                      <div className="_4yee">
                        <div className="_5tyu">Filters</div>
                        <div className="_2wzq">
                          <Button
                            type="link"
                            size="small"
                            id="clear-filter"
                            onClick={clearFilters}
                            disabled={!filterData}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                      <Form.Item name="textSearch" className="_7pia">
                        <Input
                          placeholder="Search Products"
                          className="_8jji"
                          suffix={<SearchOutlined />}
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="Categories"
                      name="categories"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value={1}>Consumer Packaging</Checkbox>
                        <Checkbox value={2}>Industrial Packaging</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Type of"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value={3}>Food Storage</Checkbox>
                        <Checkbox value={4}>Trash Bags</Checkbox>
                        <Checkbox value={5}>
                          Knife – Case – Storage Box
                        </Checkbox>
                        <Checkbox value={6}>Containers</Checkbox>
                        <Checkbox value={7}>Gloves</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Width (cm)"
                      className="widget_product_categories"
                    >
                      <Slider min={10} max={60} range />
                    </Form.Item>

                    <Form.Item
                      label="Length (cm)"
                      className="widget_product_categories"
                    >
                      <Slider min={20} max={120} range />
                    </Form.Item>

                    <Form.Item
                      label="Recycle"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value="Yes">Yes</Checkbox>
                        <Checkbox value="No">No</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    {!isSubmitDisabled && (
                      <Button type="link" htmlType="submit" className="filter">
                        Filter
                      </Button>
                    )}
                  </Form>
                </div>
              </Col>

              <Col span={18}>
                <div className="product_cate">
                <div className="_7mkr">
                  <h2 className="_3rac">{title}</h2>
                </div>
                <div className="products">
                  {filteredItems.length === 0 && (
                    <div style={{ gridColumn: "1 / -1", color: "#696969" }}>
                      No products found.
                    </div>
                  )}
                  {itemsToRender?.map((p) => (
                    <div key={p.id} className="col has-hover product">
                      <div className="col-inner">
                        <div className="box-product has-hover">
                          <div className="box-image customer-box-image-product">
                            <Link to={`/product/${p.slug}`} state={{ fallback: p, fromCategory: url }} className="_1gqs block image-zoom">
                              <img src={p.thumb} className="_8wjh" />
                            </Link>
                          </div>
                          <div className="box-text box-text-products text-left">
                            <div className="title-wrapper">
                              <h4 className="product-title">
                                <Link to={`/product/${p.slug}`} state={{ fallback: p, fromCategory: url }} className="product_link">
                                  {p.name}
                                </Link>
                              </h4>
                              <p className="sku">
                                SKU: <span>{p.sku}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  current={page}
                  total={filterData ? filteredItems.length : (data?.total ?? filteredItems.length)}
                  pageSize={pageSize}
                  onChange={(p) => {
                    const params = new URLSearchParams(location.search);
                    params.set("page", String(p));
                    navigate({ pathname: location.pathname, search: params.toString() });
                  }}
                  className="pagination-cntt"
                />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      {/* Catalog section removed per request */}
    </div>
  );
}

export default Category;
