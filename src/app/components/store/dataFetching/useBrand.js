// hooks/usebrands.js

import { getAllBrands } from "@/app/backend/controllers/brand.controller";
import { useState, useEffect } from "react";

const usebrands = () => {
  const [brands, setbrands] = useState([]);
  const [brandLoading, setBrandsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBrands();
        // console.log("res..in", res);
        setbrands(res);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setBrandsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { brands, brandLoading };
};

export default usebrands;
