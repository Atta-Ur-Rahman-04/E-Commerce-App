import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderBank,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  markPaid,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin features Routes -->
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.post("/markpaid", adminAuth, markPaid);

// Payment Features Routes -->
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/bank", authUser, placeOrderBank);

// User feature routes -->
orderRouter.post("/userorders", authUser, userOrders);

// verify payment -->
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
