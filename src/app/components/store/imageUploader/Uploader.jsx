"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
// import cloudinary from "cloudinary/lib/cloudinary";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";
import Container from "./Container";
import { toast } from "react-toastify";
// import { toast.error, toast.success} from "@/app/utils/toast";

//internal import

// cloudinary?.config({
//   cloud_name: import.meta.env.VITE_APP_CLOUD_NAME,
//   api_key: import.meta.env.VITE_APP_CLOUDINARY_API_KEY,
//   api_secret: import.meta.env.VITE_APP_CLOUDINARY_API_SECRET,
// });

const Uploader = ({ setImageUrl, imageUrl, product, folder }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  // console.log('process.env.NEXT_PUBLIC_CLOUDINARY_URL',process.env.NEXT_PUBLIC_CLOUDINARY_URL)

  // console.log("data", data);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: product ? true : false,
    maxSize: 500000,
    maxFiles: 3,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (fileRejections) {
      fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map((e) => (
              <li key={e.code}>
                {e.code === "too-many-files"
                  ? toast.error(`Maximum 3 Image Can be Upload!`)
                  : toast.error(e.message)}
              </li>
            ))}
          </ul>
        </li>
      ));
    }

    if (files) {
      files.forEach((file) => {
        if (product && imageUrl?.length + files?.length > 3) {
          return toast.error(`Maximum 3 Image Can be Upload!`);
        }

        setLoading(true);
        setError("Uploading....");

        if (product) {
          const result = imageUrl?.find(
            (img) => img === process.env.NEXT_PUBLIC_CLOUDINARY_URL
          );

          if (result) return setLoading(false);
        }

        const name = file.name.replaceAll(/\s/g, "");
        const public_id = name?.substring(0, name.lastIndexOf("."));

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );
        formData.append(
          "cloud_name",
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        );
        formData.append("folder", folder);
        formData.append("public_id", public_id);

        axios({
          url: cloudinaryUploadUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: formData,
        })
          .then((res) => {
            toast.success("Image Uploaded successfully!");
            setLoading(false);
            if (product) {
              setImageUrl((imgUrl) => [...imgUrl, res.data.secure_url]);
            } else {
              setImageUrl(res.data.secure_url);
            }
          })
          .catch((err) => {
            console.error("err", err);
            toast.error(err.Message);
            setLoading(false);
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          className="d-inline-flex border border-2 border-light w-25"
          src={file.preview}
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleRemoveImage = async (img) => {
    try {
      // const url = img.substring(img.length - 25);
      // const url = img.split("/").pop().split(".")[0];
      // const public_id = `${folder}/${url}`;

      // const res = await cloudinary.v2.uploader.destroy(public_id);

      setLoading(false);
      // toast.error(
      //   res.result === "ok" ? "Image delete successfully!" : res.result
      // );
      toast.error("Image delete successfully!");
      if (product) {
        const result = imageUrl?.filter((i) => i !== img);
        setImageUrl(result);
      } else {
        setImageUrl("");
      }
    } catch (err) {
      console.error("err", err);
      toast.error(err.Message);
      setLoading(false);
    }
  };

  return (
    <div className="w-100 text-center">
      <div
        className="border border-2 border-secondary border-dashed rounded cursor-pointer px-3 pt-3 pb-3"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="d-flex justify-content-center mx-auto">
          <FiUploadCloud className="fs-1 text-success" />
        </span>
        <p className="small mt-2">DragYourImage</p>
        <em className="text-muted small">imageFormat</em>
      </div>

      <div className="text-success">{loading && err}</div>
      <aside className="d-flex flex-wrap mt-3">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : !product && imageUrl ? (
          <div className="position-relative">
            <img
              className="d-inline-flex border rounded border-light w-25 p-2"
              src={imageUrl}
              alt="product"
            />
            <button
              type="button"
              className="position-absolute top-0 end-0 text-danger border-0 bg-transparent"
              onClick={() => handleRemoveImage(imageUrl)}
            >
              <FiXCircle />
            </button>
          </div>
        ) : (
          thumbs
        )}
      </aside>
    </div>
  );
};

export default Uploader;
