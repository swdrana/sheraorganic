"use client";
const Price = ({ product, price, originalPrice }) => {
  return (
    <div className="font-weight-bold">
      {product?.variants?.length > 0 ? (
        <span
          className=
            
               "d-inline-block text-2xl text-danger font-semibold"
          
        >
         
          ৳{price}
        </span>
      ) : (
        <span
          className=
            
               "d-inline-block text-2xl text-danger font-semibold"
          
        >
      
          ৳{product?.prices?.price}
        </span>
      )}

      {price < product?.prices?.originalPrice ? (
        <del
          className=
            
               "text-2xl font-semibold text-muted ml-3"
          
        >
        
          ৳{parseFloat(originalPrice).toFixed(2)}
        </del>
      ) : null}
    </div>
  );
};

export default Price;
