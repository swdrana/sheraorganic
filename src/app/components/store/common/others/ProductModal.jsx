"use client";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Controller } from "swiper"; // Import Controller from modules in Swiper 8.4.0
import Link from "next/link";
import { useSession } from "next-auth/react";

import StarRating from "./StartRating";

import { useMainContext } from "../../provider/MainContextStore";
import usebrands from "../../dataFetching/useBrand";
import { useCart } from "react-use-cart";
import useAddToCart from "../../hooks/useAddToCart";
import { getAllAttributes } from "../../../../backend/controllers/attribute.controller";
import VariantList from "../../productDetails/VariantList";
import Price from "../../productDetails/Price";
import { trackAddToCart } from "@/app/utilities/facebookPixel";

const ProductModal = () => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const [loadingHuteiThak, set] = useState(true);

  const { brands } = usebrands();

  const { handelAddItem, handleIncrement, handleDecrement, quantity } =
    useAddToCart();
  const { openProductModal, setOpenProductModal, productDetails } =
    useMainContext();
  const { items, inCart } = useCart();

  const [attributes, setAttributes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAttributes();
      // console.log("res..in========================================", res);
      setAttributes(res);
    };

    // Only fetch data when the modal is open
    if (openProductModal) {
      fetchData();
    }
  }, [openProductModal]);

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
      const result = productDetails?.variants?.filter((variant) =>
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
    } else if (productDetails?.variants?.length > 0) {
      const result = productDetails?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );
      // console.log("variant============", productDetails.variants[0]?.quantity);
      setVariants(result);

      setSalePrice(Number(productDetails.variants[0]?.price));
      setOriginalPrice(Number(productDetails.variants[0]?.originalPrice));
      setStock(productDetails.variants[0]?.quantity);
      setUnit(productDetails?.variants[0]?.unit);
      setDiscount(Number(productDetails.variants[0]?.discount));
      setSelectVariant(productDetails.variants[0]);
      setSelectVa(productDetails.variants[0]);
    } else {
      setSalePrice(Number(productDetails?.prices?.price));
      setOriginalPrice(Number(productDetails?.prices?.originalPrice));

      setStock(productDetails?.stock);
      setVolume(productDetails?.measurement?.volume);
      setTotalVolume(productDetails?.measurement?.totalVolume);
      setUnit(productDetails?.measurement?.unit);
      setDiscount(Number(productDetails?.prices?.discount));
    }
  }, [
    productDetails?.prices?.discount,
    productDetails?.prices?.originalPrice,
    productDetails?.prices?.price,
    productDetails?.stock,
    productDetails?.variants,
    selectVa,
    selectVariant,
    value,
  ]);

  // console.log("attributes==================", attributes);
  useEffect(() => {
    if (
      productDetails?.variants &&
      Array.isArray(productDetails.variants) &&
      attributes
    ) {
      const res = Object.keys(Object.assign({}, ...productDetails.variants));
      const varTitle = attributes.filter((att) => res.includes(att?._id));
      setVariantTitle(varTitle.sort());
    }
  }, [productDetails, attributes]);

  // console.log("variantTitle", variantTitle);
  const { data: session } = useSession();

  const handleAddToCart = (p) => {
    if (p.variants.length === 1 && p.variants[0].quantity < 1)
      return toast.error("Insufficient stock");

    if (stock <= 0) return toast.error("Insufficient stock");

    if (
      productDetails?.variants.map(
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
          productDetails.variants.length <= 1
            ? productDetails._id
            : productDetails._id +
              variantTitle?.map((att) => selectVariant[att._id]).join("-")
        }`,
        name: `${
          productDetails.variants.length <= 1
            ? productDetails.name
            : productDetails.name +
              "-" +
              selectVariantTitle?.map((el) => el?.name).join(", ")
        }`,
        variant:
          productDetails.variants.length === 0
            ? productDetails.prices
            : selectVariant,
        prices: {
          price:
            productDetails?.variants.length === 0
              ? productDetails.prices.price
              : salePrice,
          originalPrice:
            productDetails.variants.length === 0
              ? productDetails.prices.originalPrice
              : originalPrice,
        },
      };
      
      // Track Facebook Pixel AddToCart event
      trackAddToCart({
        content_ids: [p._id],
        contents: [{
          id: p._id,
          quantity: quantity,
          item_price: newItem.prices.price
        }],
        currency: 'BDT',
        value: newItem.prices.price * quantity,
        user_data: {
          em: session?.user?.email || '',
          fn: session?.user?.name?.split(' ')[0] || '',
          ln: session?.user?.name?.split(' ')[1] || ''
        }
      });
      
      // console.log("newitem for add to cart.......", newItem);
      handelAddItem(newItem);
    } else {
      return toast.error("Please select all variant first!");
    }
  };

  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenProductModal(false);
      }
    };

    if (openProductModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Clean up event listener on unmount or when modal closes
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openProductModal, setOpenProductModal]);

  // console.log("product details..", productDetails);
  if (!openProductModal || !productDetails) return null;
  return (
    <>
      <div
        className={`modal fade bg-black bg-opacity-25 ${
          openProductModal ? "show d-block" : ""
        }`}
      >
        <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
          <div className="modal-content">
            <div className="modal-body bg-white rounded-3">
              <button
                type="button"
                onClick={() => setOpenProductModal(false)}
                className="btn-close float-end"
              ></button>
              <div className="gstore-product-quick-view bg-white rounded-3 py-6 px-4">
                <div className="row g-4">
                  <div className="col-xl-6 align-self-end">
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
                          <SwiperSlide className="swiper-slide text-center">
                            <img
                              src={productDetails?.image[0]}
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide text-center">
                            <img
                              src="/img/products/p-lg-2.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide text-center">
                            <img
                              src="/img/products/p-lg-3.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide text-center">
                            <img
                              src="/img/products/p-lg-4.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                        </Swiper>
                      </div>

                      {/* Thumbnail Slider */}
                      <div className="product-thumbnail-slider mt-2">
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
                          <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center">
                            <img
                              src={productDetails?.image[0]}
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center">
                            <img
                              src="/img/products/thumb-sm-2.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center">
                            <img
                              src="/img/products/thumb-sm-3.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center">
                            <img
                              src="/img/products/thumb-sm-4.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="product-info">
                      <h2 className="h5 mt-1 mb-3">{productDetails?.name}</h2>
                      <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                        <StarRating rating={productDetails?.averageRating} />
                        <span className="flex-shrink-0">
                          ({productDetails?.rating?.length} Reviews)
                        </span>
                      </div>
                      <div className="pricing mt-2">
                        <Price
                          product={productDetails}
                          price={salePrice}
                          originalPrice={originalPrice}
                        />
                      </div>
                      <div className="widget-title d-flex mt-4">
                        <h6 className="mb-1 flex-shrink-0">Description</h6>
                        <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                      </div>
                      <p className="tt-line-clamp tt-clamp-3 mb-3">
                        {productDetails?.description}
                      </p>

                      <div className="mb-3">
                        {variantTitle?.map((a) => (
                          <div key={a._id}>
                            <h4 className="h6 py-2 font-weight-bold text-secondary">
                              {a?.name}
                            </h4>
                            <div className="d-flex flex-row mb-3">
                              <VariantList
                                att={a._id}
                                varTitle={variantTitle}
                                option={a.option}
                                variants={productDetails?.variants}
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
                            disabled={inCart(productDetails._id)}
                            onClick={handleDecrement}
                            className="decrese"
                          >
                            -
                          </button>
                          <input readOnly type="number" value={quantity} />
                          <button
                            disabled={inCart(productDetails._id)}
                            onClick={handleIncrement}
                            className="increase"
                          >
                            +
                          </button>
                        </div>
                        <a
                          type="button"
                          onClick={() =>
                            handelAddItem({
                              ...productDetails,
                              id: productDetails._id,
                            })
                          }
                          className="btn btn-secondary btn-md"
                        >
                          <span className="me-2">
                            <i className="fa-solid fa-cart-plus"></i>
                          </span>
                          Add to Cart
                        </a>
                      </div>
                      <div className="tt-category-tag my-4 mb-7">
                        {brands?.slice(0, 5).map((brand, i) => (
                          <Link
                            key={i}
                            href={`/products/brands=${brand.name
                              .replace(/\s+/g, "")
                              .toLowerCase()}=${brand._id}`}
                            className="text-muted fs-xxs"
                            onClick={() => setOpenProductModal(false)}
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                      <Link
                        className="btn btn-sm btn-primary"
                        href={`/product-details/${productDetails._id}`}
                        onClick={() => setOpenProductModal(false)}
                      >
                        More Info
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
