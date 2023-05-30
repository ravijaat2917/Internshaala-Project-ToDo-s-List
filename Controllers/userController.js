import bcrypt from "bcryptjs";
import userModel from "../Models/userModel.js";
import listModel from "../Models/listsModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User Already Exists" });
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(200)
      .send({ success: true, message: "Registeration Successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register User",
      error: error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ status: false, message: "Invalid Email or Password" });
    }
    const token = user._id;
    res
      .status(200)
      .send({ success: true, message: "Login Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Login Controller : ${error.message}`,
    });
  }
};

export const createListController = async (req, res) => {
  try {
    const { title, description, id } = req.body;
    const list = await listModel.create({
      title , description , user :id , completed:false
    })
    await list.save();
    res.status(200).send({ success: true, message: "List Saved Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in creating List" });
  }
};

export const getUsercontroller = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.findById(id);
    res.status(200).send({ success: true, message: "User Getting Succesfully", user });

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Getting User", error });
  }
}