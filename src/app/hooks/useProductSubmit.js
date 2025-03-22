"use client";
import combinate from "combinate";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useUtilsFunction from "./useUtilsFunction";
import { toast } from "react-toastify";
import { useMainContext } from "../components/admin/context/mainContext";
import { addProduct } from "../backend/controllers/product.controller";
import { productUpdate } from "../backend/actions/product.action";
import swal from "sweetalert";

const useProductSubmit = (attribue) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const {
    productDetails,
    setIsProductDrawerOpen,
    isProductDrawerOpen,
    setUpdateProduct,
  } = useMainContext();

  // react ref
  const resetRefTwo = useRef("");

  // react hook
  const [imageUrl, setImageUrl] = useState([]);
  const [tag, setTag] = useState([]);
  const [values, setValues] = useState({});
  let [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [isBasicComplete, setIsBasicComplete] = useState(false);
  const [tapValue, setTapValue] = useState("Basic Info");
  const [isCombination, setIsCombination] = useState(false);
  const [attTitle, setAttTitle] = useState([]);
  const [variantTitle, setVariantTitle] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [productId, setProductId] = useState("");
  const [updatedId, setUpdatedId] = useState(productDetails._id);
  const [imgId, setImgId] = useState("");
  const [isBulkUpdate, setIsBulkUpdate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [flashSaleProduct, setFlashSaleProduct] = useState(false);
  const [productDes, setProductDes] = useState("");

  // console.log("category..,bands", category, brand);
  // console.log("flashSaleProduct...", flashSaleProduct);

  // console.log("updatedId..", updatedId);

  // const { handlerTextTranslateHandler } = useTranslationValue();
  const { getNumber, getNumberTwo } = useUtilsFunction();

  // console.log("attribue..", attribue);

  // handle click
  const onCloseModal = () => setOpenModal(false);
  // console.log("image url", imageUrl);

  const onSubmit = async (data) => {
    // console.log("data is data", data);s
    // console.log("onSubmit call......");
    // console.log("isProductDrawerOpen..", isProductDrawerOpen);
    setUpdateProduct(false);
    const discount =
      ((data.originalPrice - data.price) / data.originalPrice) * 100;

    try {
      setIsSubmitting(true);

      if (imageUrl?.length === 0) {
        setIsSubmitting(false);
        return toast.error("Image is required");
      }

      if (getNumber(data.originalPrice) < getNumberTwo(data.price)) {
        setIsSubmitting(false);
        return toast.error(
          "Sale Price must be less then or equal of product price!"
        );
      }

      if (!brand) {
        setIsSubmitting(false);
        return toast.error("Brand is required!");
      }

      const updatedVariants = variants.map((v) => {
        const newObj = {
          ...v,
          price: getNumberTwo(v?.price),
          originalPrice: getNumberTwo(v?.originalPrice),
          discount: getNumberTwo(v?.discount),
          quantity: Number(v?.quantity || 0),
        };
        return newObj;
      });

      setIsBasicComplete(true);
      setPrice(data.price);
      setQuantity(data.stock);
      setBarcode(data.barcode);
      setSku(data.sku);
      setOriginalPrice(data.originalPrice);

      const productData = {
        productId: productId,
        sku: data.sku || "",
        barcode: data.barcode || "",
        name: data.name,
        description: productDes || "",
        videoUrl: data.videoUrl,
        // ...descriptionTranslates,
        brand: brand,
        flashSale: flashSaleProduct,

        slug: data.slug
          ? data.slug
          : data.name.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"),

        category: category,

        image: imageUrl,
        stock: variants?.length < 1 ? data.stock : Number(totalStock),
        tag: JSON.stringify(tag),

        prices: {
          price: getNumber(data.price),
          originalPrice: getNumber(data.originalPrice),
          discount: discount,
        },
        isCombination: updatedVariants?.length > 0 ? isCombination : false,
        variants: isCombination ? updatedVariants : [],
      };

      if (updatedId) {
        const res = await productUpdate(updatedId, productData);
        if (res) {
          if (isCombination) {
            toast.success(res.message);
            setIsBasicComplete(true);
            setIsSubmitting(false);
            handleProductTap("Combination", true);
            setUpdateProduct(true);
          } else {
            toast.success(res.message);
            setIsSubmitting(false);
            setUpdateProduct(true);
          }
        }

        if (
          tapValue === "Combination" ||
          (tapValue !== "Combination" && !isCombination)
        ) {
          // console.log("daware close");
          // setIsSubmitting(false);
          setIsProductDrawerOpen(false);
        }
      } else {
        const res = await addProduct(productData);
        // console.log("res .... ", res);
        // setIsProductDrawerOpen(false);
        if (isCombination) {
          setUpdatedId(res?.product?._id);
          setValue("name", res?.product?.name);
          setValue("videoUrl", res?.product?.videoUrl);
          setProductDes(res?.product?.description);
          setValue("slug", res?.product?.slug);
          setValue("show", res?.product?.show);
          setValue("barcode", res?.product?.barcode);
          setValue("stock", res?.product?.stock);
          setFlashSaleProduct(res?.product?.flashSale);
          setTag(JSON.parse(res?.product?.tag));
          setImageUrl(res?.product?.image);
          setVariants(res?.product?.variants);
          setValue("productId", res?.product?.productId);
          setProductId(res?.product?.productId);
          setOriginalPrice(res?.product?.prices?.originalPrice);
          setPrice(res?.product?.prices?.price);
          setBarcode(res?.product?.barcode);
          setSku(res?.product?.sku);
          setBrand(res?.product?.brand);
          setBrand(res?.product?.category);
          const result = res.variants.map(({ ...rest }) => rest);

          setVariant(result);

          setIsBasicComplete(true);
          setIsSubmitting(false);
          handleProductTap("Combination", true);
          toast.success("Product Added Successfully!");
          setUpdateProduct(true);
        } else {
          toast.success("Product Added Successfully....!");
          setUpdateProduct(true);
          setIsProductDrawerOpen(false);
        }

        if (
          tapValue === "Combination" ||
          (tapValue !== "Combination" && !isCombination)
        ) {
          setIsProductDrawerOpen(false);
        }
      }
    } catch (err) {
      // console.log("err", err);
      setIsSubmitting(false);
      toast.error(err?.response?.data?.message || err?.message);
      setIsProductDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (!isProductDrawerOpen) {
      setSlug("");
      handleProductTap("Basic Info", true);
      setValue("sku");
      setValue("name");
      setValue("slug");

      setProductDes("");
      setValue("quantity");
      setValue("stock");
      setValue("originalPrice");
      setValue("price");
      setValue("barcode");
      setValue("videoUrl");
      setValue("category");
      // setValue("productId");

      // setProductId("");
      // setValue('show');
      setImageUrl([]);
      setFlashSaleProduct(false);
      setTag([]);
      setVariants([]);
      setVariant([]);
      setValues({});
      setTotalStock(0);
      setSelectedCategory([]);
      setDefaultCategory([]);
      // if (location.pathname === "/products") {
      //   resetRefTwo?.current?.resetSelectedValues();
      // }

      clearErrors("sku");
      clearErrors("title");
      clearErrors("slug");

      clearErrors("stock");
      clearErrors("quantity");
      setValue("stock", 0);
      setValue("costPrice", 0);
      setValue("price", 0);
      setValue("originalPrice", 0);
      clearErrors("show");
      clearErrors("barcode");
      setIsCombination(false);
      setIsBasicComplete(false);
      setIsSubmitting(false);
      setAttributes([]);
      setBrand();
      setUpdatedId();
      return;
    } else {
      handleProductTap("Basic Info", true);
    }

    if (productDetails._id) {
      setIsBasicComplete(true);
      setSlug(productDetails.slug);
      setUpdatedId(productDetails._id);
      setValue("name", productDetails.name);
      // setProductDes(productDetails.description);
      setValue("slug", productDetails.slug);
      setValue("show", productDetails?.show);
      setValue("sku", productDetails?.sku);
      setValue("barcode", productDetails?.barcode);
      setValue("stock", productDetails?.stock);
      setValue("productId", productDetails?.productId);
      setValue("price", productDetails?.prices?.price);
      setValue("originalPrice", productDetails?.prices?.originalPrice);
      setValue("stock", productDetails?.stock);
      setValue("videoUrl", productDetails?.videoUrl);
      setFlashSaleProduct(productDetails?.flashSale);
      setProductId(
        productDetails?.productId
          ? productDetails.productId
          : productDetails._id
      );
      setBarcode(productDetails?.barcode);
      setBrand(productDetails?.brand);
      setCategory(productDetails?.category);
      setSku(productDetails?.sku);
      setSelectedCategory(productDetails?.categories);
      setDefaultCategory([productDetails?.category]);
      setTag(JSON.parse(productDetails.tag));
      setImageUrl(productDetails?.image);
      setVariants(productDetails?.variants);
      setIsCombination(productDetails?.isCombination);
      setQuantity(productDetails?.stock);
      setTotalStock(productDetails?.stock);
      setOriginalPrice(productDetails?.prices?.originalPrice);
      setPrice(productDetails?.prices?.price);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails, isProductDrawerOpen]);

  useEffect(() => {
    if (productDetails.description) {
      setProductDes(productDetails.description);
    }
  }, [productDetails, isProductDrawerOpen]);

  // console.log("productDetails..", productDetails);

  //for filter related attribute and extras for every product which need to update
  useEffect(() => {
    const result = attribue
      ?.filter((att) => att.option !== "Checkbox")
      .map((v) => {
        return {
          label: v?.title,
          value: v?.title,
        };
      });
    // console.log("attribue", attribue);
    if (result === undefined) return;
    setAttTitle([...result]);

    const res = Object?.keys(Object.assign({}, ...variants));
    const varTitle = attribue?.filter((att) => res.includes(att._id));

    if (variants?.length > 0) {
      const totalStock = variants?.reduce((pre, acc) => pre + acc.quantity, 0);
      setTotalStock(Number(totalStock));
    }
    setVariantTitle(varTitle);
  }, [attribue, variants]);

  //for adding attribute values
  const handleAddAtt = (v) => {
    const result = attribue.filter((att) => {
      const attribueTItle = att?.title;
      return v.some((item) => item.label === attribueTItle);
    });

    const attributeArray = result.map((value) => {
      const attributeTitle = value?.title;
      return {
        ...value,
        label: attributeTitle,
        value: attributeTitle,
      };
    });

    setAttributes(attributeArray);
  };

  //generate all combination combination
  const handleGenerateCombination = () => {
    if (Object.keys(values).length === 0) {
      return toast.error("Please select a variant first!");
    }

    const result = variants.filter(
      ({ ...rest }) => JSON.stringify({ ...rest }) !== "{}"
    );

    // console.log("result", result);

    setVariants(result);

    const combo = combinate(values);

    combo.map((com, i) => {
      if (JSON.stringify(variant).includes(JSON.stringify(com))) {
        return setVariant((pre) => [...pre, com]);
      } else {
        const newCom = {
          ...com,

          originalPrice: getNumberTwo(originalPrice),
          price: getNumber(price),
          quantity: Number(quantity),
          discount: Number(originalPrice - price),
          productId: productId && productId + "-" + (variants.length + i),
          barcode: barcode,
          sku: sku,
          image: imageUrl[0] || "",
        };

        setVariants((pre) => [...pre, newCom]);
        return setVariant((pre) => [...pre, com]);
      }
    });

    setValues({});
  };

  //for clear selected combination
  const handleClearVariant = () => {
    console.log("handelclear variant....");
    setVariants([]);
    setVariant([]);
    setValues({});
  };

  //for edit combination values
  const handleEditVariant = () => {
    setTapValue("Combine");
  };

  //for remove combination values
  const handleRemoveVariant = (vari) => {
    // console.log("handleRemoveVariant", vari, ext);
    swal({
      title: `Are you sure to delete this combination`,
      text: `(If Okay, It will be delete this combination)`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const result = variants.filter((v) => v !== vari);
        setVariants(result);
        // console.log("result", result);
        const { ...rest } = vari;
        const res = variant.filter(
          (obj) => JSON.stringify(obj) !== JSON.stringify(rest)
        );
        setVariant(res);
        setIsBulkUpdate(true);
        // setTimeout(() => setIsBulkUpdate(false), 500);
        const timeOutId = setTimeout(() => setIsBulkUpdate(false), 500);
        return clearTimeout(timeOutId);
      }
    });
  };

  // handle notification for combination and extras
  const handleIsCombination = () => {
    if ((isCombination && variantTitle.length) > 0) {
      swal({
        title: "Are you sure to remove combination from this product!",
        text: "(It will be delete all your combination )",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((value) => {
        // console.log(value);
        if (value) {
          setIsCombination(!isCombination);
          setTapValue("Basic Info");
          setVariants([]);
          setVariant([]);
        }
      });
    } else {
      setIsCombination(!isCombination);
      setTapValue("Basic Info");
    }
  };

  //for select individual combination image
  const handleSelectInlineImage = (id) => {
    setImgId(id);
    setOpenModal(!openModal);
  };

  //this for variant/combination list
  const handleSkuBarcode = (value, name, id) => {
    variants[id][name] = value;
  };

  const handleProductTap = (e, value) => {
    // console.log(e);

    if (value) {
      if (!value)
        return toast.err(
          `${"Please save product before adding combinations!"}`
        );
    } else {
      if (!isBasicComplete)
        return toast.error(
          `${"Please save product before adding combinations!"}`
        );
    }
    setTapValue(e);
  };
  //for select bulk action images
  const handleSelectImage = (img) => {
    if (openModal) {
      variants[imgId].image = img;
      setOpenModal(false);
    }
  };
  //this one for combination list
  const handleQuantityPrice = (value, name, id, variant) => {
    console.log(
      "handleQuantityPrice",
      "name",
      name,
      "value",
      value,
      "variant",
      variant
    );
    if (name === "originalPrice" && Number(value) < Number(variant.price)) {
      // variants[id][name] = Number(variant.originalPrice);
      toast.error("Price must be more then or equal of originalPrice!");
      setValue("originalPrice", variant.originalPrice);
      setIsBulkUpdate(true);
      const timeOutId = setTimeout(() => setIsBulkUpdate(false), 100);
      return () => clearTimeout(timeOutId);
    }
    if (name === "price" && Number(variant.originalPrice) < Number(value)) {
      // variants[id][name] = Number(variant.originalPrice);
      toast.error("Sale Price must be less then or equal of product price!");
      setValue("price", variant.originalPrice);
      setIsBulkUpdate(true);
      const timeOutId = setTimeout(() => setIsBulkUpdate(false), 100);
      return () => clearTimeout(timeOutId);
    }
    setVariants((pre) =>
      pre.map((com, i) => {
        if (i === id) {
          const updatedCom = {
            ...com,
            [name]: Math.round(value),
          };

          if (name === "price") {
            updatedCom.price = getNumberTwo(value);
            updatedCom.discount = Number(variant.originalPrice) - Number(value);
          }
          if (name === "originalPrice") {
            updatedCom.originalPrice = getNumberTwo(value);
            updatedCom.discount = Number(value) - Number(variant.price);
          }

          return updatedCom;
        }
        return com;
      })
    );

    const totalStock = variants.reduce(
      (pre, acc) => Number(pre) + Number(acc.quantity),
      0
    );
    setTotalStock(Number(totalStock));
  };

  //for handle product slug
  const handleProductSlug = (value) => {
    setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };

  return {
    tag,
    setTag,
    values,
    register,
    onSubmit,
    errors,
    slug,
    openModal,
    attribue,
    setValues,
    variants,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    onCloseModal,
    isBulkUpdate,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
    handleProductSlug,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
    originalPrice,
    price,
    brand,
    setBrand,
    flashSaleProduct,
    setFlashSaleProduct,
    category,
    setCategory,
    productDes,
    setProductDes,
  };
};

export default useProductSubmit;
