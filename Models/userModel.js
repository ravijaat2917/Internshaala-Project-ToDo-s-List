import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: {
    type: [mongoose.ObjectId],
    
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
