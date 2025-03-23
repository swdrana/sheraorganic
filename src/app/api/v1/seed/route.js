import { NextResponse } from "next/server";

import connectDB from "../../../utils/database";

import Product from "../../../backend/model/product.model";
import Attribute from "../../../backend/model/attributes.model";
import Brand from "../../../backend/model/brands.model";
import { allAttributes } from "../../../utils/attributes";
import { allBrands } from "../../../utils/brands";
import { allProducts } from "../../../utils/products";
import Category from "../../../backend/model/category.model";
import { allCategories } from "../../../utils/categories";
import Order from "../../../backend/model/order.model";
import { allOrders } from "../../../utils/order";
import Setting from "../../../backend/model/setting.model";
import { allSetting } from "../../../utils/setting";
import { allUsers } from "../../../utils/users";
import User from "../../../backend/model/user.model";
import { allBlogs } from "../../../utils/blogs";
import Blog from "../../../backend/model/blog.model";

export async function GET() {
  try {
    await connectDB();

    // Clear the collection
    // await Attribute.deleteMany();
    // await Brand.deleteMany();
    // await Product.deleteMany();
    // await Category.deleteMany();
    // await Order.deleteMany();
    // await Setting.deleteMany();
    // await User.deleteMany();
    // await Blog.deleteMany();

    // Insert seed data
    // await Attribute.insertMany(allAttributes);
    // await Brand.insertMany(allBrands);
    // await Product.insertMany(allProducts);
    // await Category.insertMany(allCategories);
    // await Order.insertMany(allOrders);
    // await User.insertMany(allUsers);
    // await Blog.insertMany(allBlogs);
    // await Setting.insertMany(allSetting);

    return NextResponse.json({ message: "Database seeded successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error seeding database", error },
      { status: 500 }
    );
  }
}
