"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { Controller } from "swiper"; // Import Controller from modules in Swiper 8.4.0
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllAttributes } from "../../../backend/controllers/attribute.controller";
import PreLoader from "../common/others/PreLoader";
import StarRating from "../common/others/StartRating";
import usebrands from "../dataFetching/useBrand";
import useSingleProduct from "../dataFetching/useSingleProduct";
import useAddToCart from "../hooks/useAddToCart";
import Price from "./Price";
import ProductDetailsSidebar from "./ProductDetailsSidebar";
import ProductDetailsTab from "./ProductDetailsTab";
import VariantList from "./VariantList";

const ProductDetailsBody = ({ id }) => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const [loadingHuteiThak, set] = useState(true);

  const { product, productLoading } = useSingleProduct(id);

  const { brands } = usebrands();
  // console.log("product..", product);
  const { handelAddItem, handleIncrement, handleDecrement, quantity } =
    useAddToCart();
  const { items, inCart } = useCart();
  if (!product) {
    return (
      <div className="alert alert-warning text-center py-10" role="alert">
        Product Not Found
      </div>
    );
  }
  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAttributes();
      // console.log('res..in',res )
      setAttributes(res);
    };

    fetchData();
  }, []);

  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("ml");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [volume, setVolume] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [discount, setDiscount] = useState("");

  let [selectVariant, setSelectVariant] = useState({});
  const [selectVa, setSelectVa] = useState({});
  const [variantTitle, setVariantTitle] = useState([]);
  const [variants, setVariants] = useState([]);
  useEffect(() => {
    // console.log('value', value, product);
    if (value) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );

      const res = result?.map(
        ({
          originalPrice,
          price,
          discount,
          quantity,
          inUse,
          inUseOrder,
          barcode,
          volume,
          totalVolume,
          unit,
          sku,
          productId,
          image,
          ...rest
        }) => ({ ...rest })
      );

      const filterKey = Object.keys(Object.assign({}, ...res));
      const selectVar = filterKey?.reduce(
        (obj, key) => ({ ...obj, [key]: selectVariant[key] }),
        {}
      );
      const newObj = Object.entries(selectVar).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );

      const result2 = result?.find((v) =>
        Object.keys(newObj).every((k) => newObj[k] === v[k])
      );

      if (result.length <= 0 || result2 === undefined) return setStock(0);

      setVariants(result);

      setSelectVariant(result2);
      setSelectVa(result2);
      setSalePrice(Number(result2?.price));
      setOriginalPrice(Number(result2?.originalPrice));
      setStock(result2?.quantity);
      setVolume(result2?.volume);
      setTotalVolume(result2?.totalVolume);
      setUnit(result2?.unit);
      setDiscount(Number(result2?.discount));
    } else if (product?.variants?.length > 0) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );
      // console.log("variant============", product.variants[0]?.quantity);
      setVariants(result);

      setSalePrice(Number(product.variants[0]?.price));
      setOriginalPrice(Number(product.variants[0]?.originalPrice));
      setStock(product.variants[0]?.quantity);
      setUnit(product?.variants[0]?.unit);
      setDiscount(Number(product.variants[0]?.discount));
      setSelectVariant(product.variants[0]);
      setSelectVa(product.variants[0]);
    } else {
      setSalePrice(Number(product?.prices?.price));
      setOriginalPrice(Number(product?.prices?.originalPrice));

      setStock(product?.stock);
      setVolume(product?.measurement?.volume);
      setTotalVolume(product?.measurement?.totalVolume);
      setUnit(product?.measurement?.unit);
      setDiscount(Number(product?.prices?.discount));
    }
  }, [
    product?.prices?.discount,
    product?.prices?.originalPrice,
    product?.prices?.price,
    product?.stock,
    product?.variants,
    selectVa,
    selectVariant,
    value,
  ]);
  useEffect(() => {
    if (product?.variants && Array.isArray(product.variants) && attributes) {
      const res = Object.keys(Object.assign({}, ...product.variants));
      const varTitle = attributes.filter((att) => res.includes(att?._id));
      setVariantTitle(varTitle.sort());
    }
  }, [product, attributes]);

  // console.log("variantTitle", variantTitle);
  const handleAddToCart = (p) => {
    if (p.variants.length === 1 && p.variants[0].quantity < 1)
      return toast.error("Insufficient stock");

    if (stock <= 0) return toast.error("Insufficient stock");

    if (
      product?.variants.map(
        (variant) =>
          Object.entries(variant).sort().toString() ===
          Object.entries(selectVariant).sort().toString()
      )
    ) {
      const selectVariantTitle = variantTitle?.map((att) =>
        att.variants?.find((v) => v._id === selectVariant[att._id])
      );

      const newItem = {
        ...p,
        id: `${
          product.variants.length <= 1
            ? product._id
            : product._id +
              variantTitle?.map((att) => selectVariant[att._id]).join("-")
        }`,
        name: `${
          product.variants.length <= 1
            ? product.name
            : product.name +
              "-" +
              selectVariantTitle?.map((el) => el?.name).join(", ")
        }`,
        variant: product.variants.length === 0 ? product.prices : selectVariant,
        prices: {
          price:
            product.variants.length === 0 ? product.prices.price : salePrice,
          originalPrice:
            product.variants.length === 0
              ? product.prices.originalPrice
              : originalPrice,
        },
      };
      // console.log("newitem for add to cart.......", newItem);
      handelAddItem(newItem);
    } else {
      return toast.error("Please select all variant first!");
    }
  };
  return (
    <>
      {productLoading ? (
        <PreLoader />
      ) : (
        <section className="product-details-area ptb-120">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-9">
                <div className="product-details">
                  <div className="gstore-product-quick-view bg-white rounded-3 py-6 px-4">
                    <div className="row g-4">
                      <div className="col-xl-6 align-self-end">
                        {/* product details slider */}
                        <div className="quickview-double-slider">
                          {/* Main Product Slider */}
                          <div className="quickview-product-slider">
                            <Swiper
                              modules={[Controller]}
                              onSwiper={setFirstSwiper} // Set the swiper instance
                              controller={{ control: secondSwiper }} // Connect the two sliders
                              slidesPerView={1}
                              centeredSlides={true}
                              speed={700}
                              loop={true}
                              loopedSlides={6}
                            >
                              {product?.image.map((img, i) =>{
                                return (
                                  <SwiperSlide className="swiper-slide text-center" key={i}>
                                    <img
                                      src={img}
                                      alt={img}
                                      className="img-fluid"
                                    />
                                  </SwiperSlide>
                                )})}
                            </Swiper>
                          </div>

                          {/* Thumbnail Slider */}
                          <div className="product-thumbnail-slider mt-80">
                            <Swiper
                              modules={[Controller]}
                              onSwiper={setSecondSwiper} // Set the swiper instance
                              controller={{ control: firstSwiper }} // Connect the two sliders
                              slidesPerView={4}
                              speed={700}
                              loop={true}
                              spaceBetween={20}
                              slideToClickedSlide={true}
                              loopedSlides={6}
                              centeredSlides={true}
                              breakpoints={{
                                0: { slidesPerView: 2 },
                                380: { slidesPerView: 3 },
                                576: { slidesPerView: 4 },
                              }}
                            >
                              {product?.image.map((img, i) =>{
                                // console.log(img)
                                return (
                                  <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center" key={i}>
                                    <img
                                      src={img}
                                      alt={img}
                                      className="img-fluid"
                                    />
                                  </SwiperSlide>
                                )})}
                            </Swiper>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="product-info">
                          <h2 className="h5 mt-1 mb-3">{product?.name}</h2>
                          <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                            <StarRating rating={product?.averageRating} />
                            <span className="flex-shrink-0">
                              ({product?.ratings?.length} Reviews)
                            </span>
                          </div>
                          <div className="pricing mt-2">
                            {/* <span className="fw-bold fs-xs text-danger">
                                ${product?.prices?.price}.00
                              </span>
                              {product?.prices?.discout > 0 && (
                                <span className="fw-bold fs-xs deleted ms-1">
                                  ${product?.prices?.originalPrice}.00
                                </span>
                              )} */}
                            <Price
                              product={product}
                              price={salePrice}
                              originalPrice={originalPrice}
                            />
                          </div>
                          <div className="widget-title d-flex mt-4">
                            <h6 className="mb-1 flex-shrink-0">Description</h6>
                            <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                          </div>
                          <div
                            className="tt-line-clamp tt-clamp-2 mb-3"
                            dangerouslySetInnerHTML={{
                              __html: product?.description,
                            }}
                          ></div>

                          <div className="mb-3">
                            {variantTitle?.map((a, i) => (
                              <div key={a._id}>
                                <h4 className="h6 py-2 font-weight-bold text-secondary">
                                  {a?.name}
                                </h4>
                                <div className="mb-3">
                                  <VariantList
                                    att={a._id}
                                    varTitle={variantTitle}
                                    option={a.option}
                                    variants={product?.variants}
                                    setValue={setValue}
                                    setSelectVa={setSelectVa}
                                    selectVariant={selectVariant}
                                    setSelectVariant={setSelectVariant}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="d-flex align-items-center gap-4 flex-wrap">
                            <div className="product-qty d-flex align-items-center">
                              <button
                                disabled={inCart(product?._id)}
                                onClick={handleDecrement}
                                className={`px-2 py-1 border rounded-l ${
                                  inCart(product?._id)
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                                title={
                                  inCart(product?._id)
                                    ? "Item is already in your cart"
                                    : ""
                                }
                              >
                                -
                              </button>
                              <input readOnly type="number" value={quantity} />
                              <button
                                disabled={inCart(product?._id)}
                                onClick={handleIncrement}
                                className={`px-2 py-1 border rounded-end ${
                                  inCart(product?._id) ? "disabled" : ""
                                }`}
                                title={
                                  inCart(product?._id)
                                    ? "Item is already in your cart"
                                    : ""
                                }
                              >
                                +
                              </button>
                            </div>
                            <a
                              type="button"
                              // onClick={() =>
                              //   handelAddItem({
                              //     ...product,
                              //     id: product?._id,
                              //   })
                              // }
                              onClick={() => handleAddToCart(product)}
                              className="btn btn-secondary btn-md"
                            >
                              <span className="me-2">
                                <i class="fas fa-cart-plus"></i>
                              </span>
                              Add to Cart
                            </a>

                            <Link
                              href={`/checkout`}
                              onClick={() =>
                                handelAddItem({ ...product, id: product._id })
                              }
                              className="btn btn-primary d-block btn-md "
                            >
                              <span className="me-2">
                                <i className="fa-solid fa-bag-shopping"></i>
                              </span>
                              Buy Now
                            </Link>
                          </div>
                          <div className="tt-category-tag mt-4">
                            {brands.map((brand, i) => (
                              <Link
                                key={i}
                                href={`/products/brands=${brand?.name
                                  .replace(/\s+/g, "")
                                  .toLowerCase()}=${brand._id}`}
                                className="text-muted fs-xxs"
                              >
                                {brand?.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ProductDetailsTab product={product} />
                </div>
              </div>

              <ProductDetailsSidebar />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetailsBody;
