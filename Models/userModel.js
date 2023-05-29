import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: {
    type: [],
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
