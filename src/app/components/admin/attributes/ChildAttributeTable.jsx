"use client";
import { useMainContext } from "../context/mainContext";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin5Fill } from "react-icons/ri";


import SwitchToggleStatus from "../form/switch/SwitchToggleStatus";

const ChildAttributeTable = ({ attributes, attributeChildrenId }) => {
  const {
    setIsDeleteModal,
    setOpenChildAttributeDrawer,
    setSingleVariant,
    setVariantsId
  } = useMainContext();
  const singleAttribut = attributes?.find((a) => a._id === attributeChildrenId);
  
  
 

  return (
    <>
      

      <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle bg-white py-11 px-8 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
              <thead>
                <tr className="bg-primary-2">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-dark sm:pl-6 lg:pl-8"
                  >
                    Id
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                    status
                  </th>
                

                
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {singleAttribut?.variants?.map((item) => (
                  <tr key={item._id}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {item?._id.toString().slice(18, 23)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item?.name}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{singleAttribut.option}</td>
                   
                   <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                    <SwitchToggleStatus item={item} attributeChildrenId={attributeChildrenId}  />
                   {/* <Switch  onClick={() => handelChildAttributeStatus(item)}
      checked={item.status==="show"}
      className={classNames(
        item.status==="show" ? 'bg-brand' : 'bg-gray-200',
        'relative inline-flex h-3 w-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2'
      )}
    >
      
      <span
        aria-hidden="true"
        className={classNames(
          item.status==="show" ? 'translate-x-3' : 'translate-x-0',
          'pointer-events-none inline-block h-2 w-2 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch> */}
                    </td>
                    
                   
                    
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                      <div className="inline-flex items-center justify-center gap-2">
                      <button 
                              onClick={() => {
                                setOpenChildAttributeDrawer(true), setSingleVariant(item);
                              }}
                              className="text-green-500 cursor-pointer mr-2 "
                            >
                              <LiaEdit /><span className="sr-only"> {item.name}</span>
                            </button>

                            <button
                            onClick={() => {
                              setIsDeleteModal(true), setVariantsId(item._id.toString());
                            }}
                              className="text-brand"
                            >
                              <RiDeleteBin5Fill className=" cursor-pointer " />
                            </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default ChildAttributeTable;
