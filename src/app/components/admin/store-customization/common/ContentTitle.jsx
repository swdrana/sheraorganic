import { CiSettings } from "react-icons/ci";


const ContentTitle = ({title}) => {
  return (
    <> 
      <h5 className="text-lg font-medium pb-4 border-b mb-4 flex items-center gap-2"> <CiSettings/> {title} </h5>
    </>
  )
};

export default ContentTitle
