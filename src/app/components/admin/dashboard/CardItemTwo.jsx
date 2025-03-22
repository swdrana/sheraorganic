import React from "react";
const CardItemTwo = ({ title, Icon, amount,totalCount}) => {
  return (
    <>
      <div className="max-w-md  bg-white rounded-lg py-6 px-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white">
            <Icon size={22} />
          </div>
          <div>
            <h2 className=" text-lg font-semibold">{title} <span className="text-secondary font-blod">({totalCount})</span></h2>
            <div>
               <p className="text-base text-primray font-bold">{amount}</p>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItemTwo;
