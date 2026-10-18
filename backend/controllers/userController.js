// Allow user to create an account and to loggedIn to website -->
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// * Login Route -->
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ sucess: false, message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // coming pass and DB password for the given user

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ sucess: true, token });
    } else {
      res.json({ sucess: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

// * Regestiration Route -->
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ sucess: false, message: "User Already Exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ sucess: false, message: "Please Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        sucess: false,
        message: "Please Enter a strong password",
      });
    }

    // Create account for user if both is ok , but we will hash the password and then we will store in our DB so for that we will use the bcyrpt package
    // Hashing user password
    const salt = await bcrypt.genSalt(10); // the higher the number the higer it will take time to encrypt the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // To store in DB with user -->
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // After login we wil generate a token so that using that the user get loggedIn , we will do this using the userId
    const token = createToken(user._id);
    res.json({ sucess: true, token });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

// * Admin Login Route -->
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ sucess: true, token });
    } else {
      res.json({ sucess: false, message: "Invaid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin }; // using this controllers we will create different routes in routes folder
