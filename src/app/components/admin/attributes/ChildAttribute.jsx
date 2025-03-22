
import { getAllAttributes } from "@/app/backend/controllers/attribute.controller";
import { useMainContext } from "../context/mainContext";
import ChildAttributeDrawer from "../drawer/ChildAttributeDrawer";
import DeleteModal from "../modal/DeleteModal";
import ChildAttributeTable from "./ChildAttributeTable";
import { useEffect, useState } from "react";
import TableLoading from "../loader/TableLoading";


const ChildAttribute = ({attributeChildrenId}) => {
  const {setOpenChildAttributeDrawer,variantId,setSingleVariant,updateAttribute} = useMainContext();
  
  const [loading,setLoading]=useState(true)
  const [attributes,setAttributes]=useState([])
  useEffect(() => {
    const fetchData = async () => {
    const  res = await getAllAttributes()
    // console.log('res..in',res )
    setAttributes(res)
      setLoading(false)
    };

    fetchData();
  }, [updateAttribute]);
  return (
    <>
    <DeleteModal attributeChildrenId={attributeChildrenId} variantId={variantId}  />
      <ChildAttributeDrawer attributeChildrenId={attributeChildrenId} />
      
      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Attribute value</h2>
  
          </div>

           <div>
           <button
              onClick={() => {
                setOpenChildAttributeDrawer(true), setSingleVariant({})
              }}
              type="button"
              className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add value
            </button>
          </div>
         
        </div>

     
       


           
          

        {
          loading ? <> <TableLoading/> </> : <ChildAttributeTable
          attributes={attributes}
          attributeChildrenId={attributeChildrenId}
        />
        }

      </section>
    </>
  )
};

export default ChildAttribute
