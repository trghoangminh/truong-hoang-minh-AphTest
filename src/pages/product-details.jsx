import "swiper/css";
import "swiper/css/pagination";
import { Breadcrumb, Button, Col, Image, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Thumbs } from "swiper/modules";
import defaultImage from "../assets/images/defaultImage.png";
import { useGetProductByUrlQuery } from "../services/api/product.api";

function ProductDetail() {
  const { url } = useParams();
  const location = useLocation();
  const fallback = location.state?.fallback;
  const { data: product } = useGetProductByUrlQuery(url);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [direction, setDirection] = useState("vertical");

  const updateDirection = () => {
    setDirection(window.innerWidth < 768 ? "horizontal" : "vertical");
  };

  useEffect(() => {
    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => {
      window.removeEventListener("resize", updateDirection);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [url]);

  

  const model = product || fallback;
  const images = (model?.media && model.media.length ? model.media : (fallback?.thumb ? [fallback.thumb] : []));

  return (
    <div id="content" className="content-area">
      <section className="coach-pug section">
        <div className="section-content relative">
          <div className="_0vqs">
            <Row gutter={30}>
              <Col span={24}>
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
                      title: (
                        <Link to={`/category/${location.state?.fromCategory || 'consumer-packaging'}`} className="item-bread">
                          Packaging
                        </Link>
                      ),
                    },
                    {
                      title: <span className="active-bread">Food Wrap</span>,
                    },
                  ]}
                  id="breadcrumb"
                />
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="snouting-daw section">
        <div className="section-content relative">
          <div className="_1ghu">
            <div className="_6tdv">
              <div className="product-vertical-thumbnails">
                <Swiper
                  modules={[Mousewheel, Pagination, Thumbs]}
                  direction={direction}
                  slidesPerView="auto"
                  spaceBetween={20}
                  mousewheel={true}
                  pagination={{
                    clickable: true,
                  }}
                  watchSlidesProgress={true}
                  onSwiper={setThumbsSwiper}
                  className="ThumbGallery GalleryArea"
                >
                  {images.map((m) => (
                    <SwiperSlide key={m}>
                      <Image src={m} alt="Product Thumb" fallback={defaultImage} preview={false} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Image.PreviewGroup>
                  <Swiper
                    modules={[Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="ProductGallery GalleryArea"
                  >
                    {images.map((m) => (
                      <SwiperSlide key={m}>
                        <Image src={m} alt="Product" fallback={defaultImage} preview={false} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Image.PreviewGroup>
              </div>

              <div className="_6hoq">
                <Button
                  style={{ textTransform: "none" }}
                  type="link"
                  className="_7lpb"
                >
                  <span>Download data sheet</span>
                  <i className="fa-regular fa-arrow-right"></i>
                </Button>
              </div>
            </div>
            <div className="_5enz">
              <div className="product-info">
                <h1 className="product-title product_title entry-title">{model?.name || ""}</h1>
                <div className="sku">
                  <strong>SKU: </strong>
                  <span>{model?.sku}</span>
                </div>
                <div className="description">{model?.shortDesc}</div>
                <div className="_6zrw">
                  <Link to="/contact-us" className="button button-gradient">
                    <span>Request Quote</span>
                  </Link>
                  <a href="#" className="button button-outline-green">
                    <span>Add to Basket</span>
                  </a>
                </div>
                <div className="contents widget-content">
                  <h4 className="_9cfu">Performance Features:</h4>
                  <div className="inner-content" dangerouslySetInnerHTML={{ __html: model?.specification || "" }} />
                </div>
                <div className="contents widget-content">
                  <h4 className="_9cfu">Product Information:</h4>
                  <div className="table">
                    <table>
                      <tbody>
                        {model?.altRef && (
                          <tr>
                            <td>Alternative Reference</td>
                            <td>{model.altRef}</td>
                          </tr>
                        )}
                        {model?.widthCm && (
                          <tr>
                            <td>Width</td>
                            <td>{model.widthCm}cm</td>
                          </tr>
                        )}
                        {model?.lengthCm && (
                          <tr>
                            <td>Length</td>
                            <td>{model.lengthCm}cm</td>
                          </tr>
                        )}
                        {model?.maxWeight && (
                          <tr>
                            <td>Maximum Weight</td>
                            <td>{model.maxWeight}</td>
                          </tr>
                        )}
                        {model?.colors && (
                          <tr>
                            <td>Color(s)</td>
                            <td>{model.colors}</td>
                          </tr>
                        )}
                        {model?.material && (
                          <tr>
                            <td>Material</td>
                            <td>{model.material}</td>
                          </tr>
                        )}
                        {model?.recycle && (
                          <tr>
                            <td>Recycle</td>
                            <td>{model.recycle}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="spinally-zee section">
        <div className="section-content relative">
          <div className="_7zow row">
            <div className="_4cnm col large-12 medium-12 small-12 RemovePaddingBottom">
              <div className="col-inner">
                <div className="_4zte">
                  <h2 className="_9orw">Specifications</h2>
                  <Button
                    style={{ textTransform: "none" }}
                    type="link"
                    className="_2oxj"
                  >
                    <span>Download data sheet</span>
                    <i className="fa-regular fa-arrow-right"></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="_5nyy col large-12 medium-12 small-12 RemovePaddingBottom">
              <div className="col-inner">
                <div className="wrapper-table"></div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      
    </div>
  );
}

export default ProductDetail;
