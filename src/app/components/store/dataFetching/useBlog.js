import { useState, useEffect } from "react";
import { getAllBlogs } from "../../../backend/controllers/blog.controller";
import { useMainContext } from "../../admin/context/mainContext";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const { blogUpdate } = useMainContext();

  useEffect(() => {
    const fetchData = async () => {
      setBlogLoading(true);
      try {
        const res = await getAllBlogs();
        // console.log("res..in use fetch blog", res);
        setBlogs(res?.blogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchData();
  }, [blogUpdate]);

  return { blogs, blogLoading };
};

export default useBlog;
