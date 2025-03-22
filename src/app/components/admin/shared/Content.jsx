"use client"
import { usePathname} from "next/navigation";
import DashboardHome from "../dashboard/DashboardHome";
import Products from "../products/Products";
import ProductDetails from "../products/ProductDetails";
import Category from "../category/Category";
import Coupon from "../coupon/Coupon";
import Staffs from "../staffs/Staffs";
import Orders from "../orders/Orders";
import Attribute from "../attributes/Attribute";
import ChildAttribute from "../attributes/ChildAttribute";
import ChildCategory from "../category/ChildCategory";

const Content = ({productId,allProducts,categoriesList,attribue,categories,coupons,staffs,attributeChildrenId,categoryId,attributes}) => {
    const pathname = usePathname();
  return (
    <>
      
              
              {pathname === "/" && <DashboardHome allProducts={allProducts} />}
              {pathname === "/product" && (
                <Products allProducts={allProducts} attribue={attribue} categoriesList={categoriesList} />
              )}

              {
                productId !==undefined && <ProductDetails categoriesList={categoriesList} attributs={attribue} allProducts={allProducts} productId={productId} />
              }

              {pathname === "/category" && <Category categories={categories} />}

              {pathname === "/coupon" && <Coupon coupons={coupons} />}

              {pathname === "/staff" && <Staffs staffs={staffs} />}

              {pathname === "/order" && <Orders />}
              {pathname === "/attributes" && (
                <Attribute attributes={attributes}    />
              )}

              {
                attributeChildrenId && <ChildAttribute attributes={attributes} attributeChildrenId={attributeChildrenId}  />
              }
              {
                categoryId && <ChildCategory categories={categories} categoryId={categoryId}/>
              }
           
          
           
    </>
  )
};

export default Content
