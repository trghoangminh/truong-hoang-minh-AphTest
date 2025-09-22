import "swiper/css";
import "swiper/css/pagination";
import { Breadcrumb, Button, Col, Image, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination, Thumbs } from "swiper/modules";
import defaultImage from "../assets/images/defaultImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetProductByUrlQuery, useGetRelatedProductsQuery } from "../services/api/product.api";

function ProductDetail() {
  const { url } = useParams();
  const { data: product } = useGetProductByUrlQuery(url);
  const { data: related } = useGetRelatedProductsQuery(product?.id, { skip: !product?.id });

  const swiperRef = useRef(null);
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

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

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
                      title: "Packaging",
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
                  {product?.media?.map((m) => (
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
                    {product?.media?.map((m) => (
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
                <h1 className="product-title product_title entry-title">{product?.name || ""}</h1>
                <div className="sku">
                  <strong>SKU: </strong>
                  <span>{product?.sku}</span>
                </div>
                <div className="description">{product?.shortDesc}</div>
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
                  <div className="inner-content" dangerouslySetInnerHTML={{ __html: product?.specification || "" }} />
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

      <section className="xylomas-goad section">
        <div className="section-content relative">
          <div className="_0qkm">
            <Row gutter={30}>
              <Col span={24}>
                <div className="blocks_title_nav">
                  <h2 className="title_prj">Frequently Bought Together</h2>
                  <div className="nav_swpier_prj">
                    <div className="swpier_prj-prev" onClick={handlePrev}>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                    </div>
                    <div className="swpier_prj-next" onClick={handleNext}>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="_8sxd">
            <Row gutter={20}>
              <Col span={24} className="_0lfn">
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper; // Gắn instance của Swiper vào ref
                  }}
                  modules={[Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  loop={true}
                  className="SliderProduct"
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {related?.map((p) => (
                    <SwiperSlide key={p.id}>
                      <Link className="box_project block has-hover" to={`/product/${p.slug}`}>
                        <div className="media_prj image-zoom">
                          <Image src={p.thumb} alt="Product Thumb" fallback={defaultImage} preview={false} className="_7omy" />
                        </div>
                        <div className="text_prj">
                          <h4 className="textLine-2">{p.name}</h4>
                          <div className="_7yax">
                            <strong>SKU&nbsp;</strong>
                            <span>{p.sku}</span>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
