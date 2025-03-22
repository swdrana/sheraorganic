// hooks/userUsers.js

import { useState, useEffect } from "react";
import { getAllUser } from "../../../backend/controllers/customer.controller";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUser();
        // console.log("res..in", res);
        setUsers(res?.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchData();
  }, []);

  return { users, usersLoading };
};

export default useUsers;
