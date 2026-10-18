import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // to prevent the account from duplication of loggedIn email
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false },
  // bydefault mongoose dont save the property with empty data, and we want that when user get loggedIn then the cartData should be created for him and it should be save in the database so we set the minimize to false so the mongoose donnot neglect it
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
