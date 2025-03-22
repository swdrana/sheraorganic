import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DescriptionInput = ({ productDetails, setProductDes }) => {
  const [value, setValue] = useState("");

  // Sync state when productDetails changes
  useEffect(() => {
    if (productDetails?.description) {
      setValue(productDetails.description);
    }
  }, [productDetails]);

  // Update the external handler when the value changes
  useEffect(() => {
    setProductDes(value);
  }, [value, setProductDes]);

  return (
    <ReactQuill
    className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 focus:ring-0 outline-none"
      value={value}
      onChange={setValue}
      style={{ height: "500px", overflowY: "auto" }}
      modules={{
        toolbar: [
          ["bold", "italic", "underline"],
          [{ font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      }}
      formats={[
        "bold",
        "italic",
        "underline",
        "font",
        "list",
        "bullet",
        "align",
        "link",
        "image",
      ]}
    />
  );
};

export default DescriptionInput;
