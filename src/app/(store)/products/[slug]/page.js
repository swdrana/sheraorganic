import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import ShopGridBody from "@/app/components/store/shopGrid/ShopGridBody";
import { redirectIfHiddenListing } from "./hiddenListing";

function extracValue(encodedString) {
  // Decode the encoded string
  const decodedString = decodeURIComponent(encodedString);

  // Split the string using '=' as the delimiter
  const parts = decodedString.split("=");

  // Return the last part, which is the ID
  return parts;
}
const page = async ({ params }) => {
  const { slug } = params;
  const values = extracValue(slug);
  await redirectIfHiddenListing(values);
  return (
    <>
      <Breadcrumb title="Shop Layout" page="Shop Grid" />
      <ShopGridBody categoryOrBrand={values[1]} />
    </>
  );
};

export default page;
