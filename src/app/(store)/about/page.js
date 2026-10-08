import AboutBody from "@/app/components/store/about/AboutBody";
import { getStoreStats } from "@/app/data/cachedData";

const page = async () => {
  const stats = await getStoreStats();
  return <AboutBody stats={stats} />;
};

export default page;
