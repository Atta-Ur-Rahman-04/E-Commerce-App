import mongoose, { mongo } from "mongoose";

// * Connect to DB -->
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "e-commerce",
    serverSelectionTimeoutMS: 8000,
  });
};
export default connectDB;
