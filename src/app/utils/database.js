import mongoose from "mongoose";

// One connection per server process. The promise lives on `global` so dev hot reloads and
// concurrent requests reuse it instead of calling mongoose.connect() again.
const cached = global._mongooseConnection || (global._mongooseConnection = { promise: null });

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      })
      .catch((error) => {
        cached.promise = null; // allow the next request to retry
        console.error("MongoDB connection error:", error?.message || error);
      });
  }
  await cached.promise;
  return mongoose.connection;
};

export default connectDB;
