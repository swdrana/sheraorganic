import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import ShopGridBody from "@/app/components/store/shopGrid/ShopGridBody";

function extracValue(encodedString) {
  // Decode the encoded string
  const decodedString = decodeURIComponent(encodedString);

  // Split the string using '=' as the delimiter
  const parts = decodedString.split("=");

  // Return the last part, which is the ID
  return parts;
}
const page = ({ params }) => {
  const { slug } = params;
  // console.log('slug',slug)
  const values = extracValue(slug);
  // console.log("values 1..", values);
  return (
    <>
      <Breadcrumb title="Shop Layout" page="Shop Grid" />
      <ShopGridBody categoryOrBrand={values[1]} />
    </>
  );
};

export default page;
