import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import dns from "dns";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

// * App config -->
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// * middlewares -->
app.use(express.json()); // whatever req we will get will be parse using jason
app.use(cors()); // we can access the backend from any ip

// * API endpoints -->
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API is working");
});

// * Start the expressServer -->
app.listen(port, () => {
  console.log("server started on PORT: ", port);
});
