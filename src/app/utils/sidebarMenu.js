import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiTarget,
} from "react-icons/fi";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/admin", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },

  {
    icon: FiSlack,
    name: "Catalog",
    routes: [
      {
        path: "/admin/product",
        name: "Products",
      },
      {
        path: "/admin/category",
        name: "Categories",
      },
      {
        path: "/admin/attributes",
        name: "Attributes",
      },
      {
        path: "/admin/coupon",
        name: "Coupons",
      },
      {
        path: "/admin/brands",
        name: "Brands",
      },
    ],
  },

  {
    path: "/admin/customers",
    icon: FiUsers,
    name: "Customers",
  },
  {
    path: "/admin/order",
    icon: FiCompass,
    name: "Orders",
  },
  {
    path: "/admin/packing-reports",
    icon: FiTarget,
    name: "Packing Reports",
  },

  {
    path: "/admin/staff",
    icon: FiUser,
    name: "OurStaff",
  },
  {
    path: "/admin/blogs",
    icon: FiCompass,
    name: "Blogs",
  },
  {
    icon: FiTarget,
    name: "OnlineStore",
    routes: [
      {
        name: "ViewStore",
        path: "/",
        outside: "store",
      },

      {
        path: "/admin/store-customization",
        name: "StoreCustomization",
      },
      // {
      //   path: "/store/store-settings",
      //   name: "StoreSettings",
      // },
    ],
  },

  {
    icon: FiSlack,
    name: "Pages",
    routes: [
      // submenu

      {
        path: "/admin/404",
        name: "404",
      },
      {
        path: "/admin/coming-soon",
        name: "Coming Soon",
      },
    ],
  },
  // {
  //   path: "/settings",
  //   icon: FiSettings,
  //   name: "Settings",
  // },
];

export default sidebar;
