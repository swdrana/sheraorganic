// import mongoose from "mongoose";

// let isConnected = false; // Variable to track the connection status

// export const connectToDB = async () => {
//   // Set strict query mode for Mongoose to prevent unknown field queries.
//   mongoose.set("strictQuery", true);

//   if (!process.env.MONGODB_URI) return console.log("Missing MongoDB URL");

//   // If the connection is already established, return without creating a new connection.
//   if (isConnected) {
//     console.log("MongoDB connection already established");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI);

//     isConnected = true; // Set the connection status to true
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

import mongoose from "mongoose";
// console.log("mongo uri", process.env.MONGODB_URI);
const connectDB = async () => {
  try {
    // connect to mongodb database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
