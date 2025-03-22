import ShopGridProductTwo from "./ShopGridProductTwo";
import ShopGridSidebar from "./ShopGridSidebar";

const ShopGridBodyTwo = () => {
  return (
    <>
      <section className="gshop-gshop-grid ptb-120">
            <div className="container">
                <div className="row g-4">
                    {/* shop gride sidebar */}
                    <ShopGridSidebar/>
                    {/* Shop gride product */}
                   <ShopGridProductTwo/>
                  </div>
            </div>
        </section>
    </>
  )
};

export default ShopGridBodyTwo
