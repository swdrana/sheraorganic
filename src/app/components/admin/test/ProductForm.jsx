import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function DynamicProductForm() {
  const { control, handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      hasVariants: false,
      price: 0,
      stock: 0,
      attributes: [], // Array to hold attribute definitions
      variants: [], // Array to hold the generated variants
    },
  });

  const { fields: attributes, append: appendAttribute } = useFieldArray({
    control,
    name: "attributes",
  });

  const { fields: variants, replace: replaceVariants } = useFieldArray({
    control,
    name: "variants",
  });

  // Watch for changes to attributes to regenerate variants
  const watchedAttributes = watch("attributes");

  // Function to generate variants dynamically based on attributes
  useEffect(() => {
    const generateVariants = () => {
      if (!watchedAttributes.length) {
        replaceVariants([]);
        return;
      }

      // Helper function to create combinations
      const combine = (arr) =>
        arr.reduce(
          (acc, options) =>
            acc.flatMap((prev) => options.map((option) => [...prev, option])),
          [[]]
        );

      // Collect all attribute options
      const allOptions = watchedAttributes.map((attr) => attr.options || []);
      const combinations = combine(allOptions);

      // Generate variant objects
      const newVariants = combinations.map((combination) => {
        const variant = {};
        watchedAttributes.forEach((attr, index) => {
          variant[attr.name] = combination[index];
        });
        variant.price = 0; // Default price
        variant.stock = 0; // Default stock
        return variant;
      });

      replaceVariants(newVariants);
    };

    generateVariants();
  }, [watchedAttributes, replaceVariants]);

  const onSubmit = async (data) => {
    // console.log("Form Data:", data);

    // Example API call
    const response = await fetch("/api/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Product created successfully!");
    } else {
      alert("Error creating product");
    }
  };

  // Add a new attribute
  const addAttribute = () => {
    appendAttribute({ name: "", options: [""] });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <input
        type="text"
        placeholder="Product Name"
        {...register("name", { required: true })}
        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Description"
        {...register("description")}
        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Category"
        {...register("category")}
        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register("hasVariants")}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <span className="text-gray-700">Has Variants</span>
      </label>

      {watch("hasVariants") && (
        <>
          <h3 className="text-lg font-semibold">Attributes</h3>
          {attributes.map((attribute, attrIndex) => (
            <div
              key={attribute.id}
              className="border p-4 rounded-md space-y-2 bg-gray-50"
            >
              <Controller
                name={`attributes.${attrIndex}.name`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Attribute Name (e.g., Color, Size)"
                    {...field}
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name={`attributes.${attrIndex}.options`}
                control={control}
                render={({ field }) => (
                  <>
                    {field.value.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...field.value];
                          newOptions[optionIndex] = e.target.value;
                          setValue(
                            `attributes.${attrIndex}.options`,
                            newOptions
                          );
                        }}
                        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setValue(`attributes.${attrIndex}.options`, [
                          ...field.value,
                          "",
                        ]);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Add Option
                    </button>
                  </>
                )}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addAttribute}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Attribute
          </button>

          <h3 className="text-lg font-semibold">Generated Variants</h3>
          {variants.map((variant, variantIndex) => (
            <div
              key={variant.id}
              className="border p-4 rounded-md space-y-2 bg-gray-50"
            >
              {Object.entries(variant).map(([key, value]) =>
                key !== "price" && key !== "stock" ? (
                  <p key={key} className="text-gray-700">
                    {key}: {value}
                  </p>
                ) : null
              )}
              <Controller
                name={`variants.${variantIndex}.price`}
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    placeholder="Price"
                    {...field}
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              <Controller
                name={`variants.${variantIndex}.stock`}
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    placeholder="Stock"
                    {...field}
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </div>
          ))}
        </>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
      >
        Create Product
      </button>
    </form>
  );
}
