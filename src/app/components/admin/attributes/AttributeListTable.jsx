"use client"

import { RiDeleteBin5Fill } from "react-icons/ri";

import { Avatar} from "@windmill/react-ui";
import Image from "next/image";

const AttributeListTable = ({
  variants,
  variantTitle,
  handleSelectInlineImage,
}) => {


  return (
    <>
      

      <tbody className="divide-y divide-gray-200 bg-white">
      {variants?.map((variant, i) => (
          <tr key={i+1}>
            <td className="whitespace-nowrap text-center py-4">
            {variant.image ? (
                  <span>
                    <Avatar
                      className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                      src={variant.image}
                      alt="product"
                    />
                    <p
                      className="text-xs cursor-pointer"
                      onClick={() => handleSelectInlineImage(i)}
                    >
                      Change
                    </p>
                  </span>
                ) : (
                  <span>
                    {/* <img
                      src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                      alt="product"
                      className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none" style={{width:"30px",height:"25px"}}
                    /> */}
                    <Image src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
      alt="Landscape picture"
      width={30}
      height={25} />
                    <p
                      className="text-xs cursor-pointer"
                      onClick={() => handleSelectInlineImage(i)}
                    >
                      Change
                    </p>
                  </span>
                )}
            </td>
          
            <td className="whitespace-nowrap text-center py-4">
              <div className="text-sm text-center text-gray-900 ">{variantTitle?.length > 0 && (
                  <span>
                    {variantTitle
                      ?.map((att) => {
                        const attributeData = att?.variants?.filter(
                          (val) => val?.name !== "All"
                        );

                        const attributeName = attributeData?.find(
                          (v) => v._id === variant[att?._id]
                        )?.name;
                        if (attributeName === undefined) {
                          return attributeName?.en;
                        } else {
                          return attributeName
                        }
                      })
                      ?.filter(Boolean)
                      .join(" ")}
                  </span>
                )}

                {variant.productId && (
                  <span className="text-xs productId text-gray-500">
                    ({variant.productId})
                  </span>
                )}</div>
            </td>
             <td className="whitespace-nowrap  py-4">
              <div className="text-sm text-center  text-gray-900 ">{variant?.sku}</div>
            </td>
            
            <td className="whitespace-nowrap text-center py-4">
              <div className="text-sm text-center text-gray-900 ">{variant?.barcode}</div>
            </td>
            <td className="whitespace-nowrap text-center  py-4">
          {variant.originalPrice}
            </td>
            <td className="whitespace-nowrap text-center  py-4">
          {variant.price}
            </td>
            <td className="whitespace-nowrap text-center  py-4">
          {variant.quantity}
            </td>
            

            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right flex justify-center  items-center gap-2 text-sm font-medium sm:pr-0 mt-2">
              

              <a
               
                className="text-indigo-600 hover:text-indigo-900"
              >
                <RiDeleteBin5Fill size={20} className=" cursor-pointer " />
              </a>
            </td>
          </tr>
        ))}
      </tbody>

     
    </>
  );
};

export default AttributeListTable;
