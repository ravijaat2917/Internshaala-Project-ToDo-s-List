import listModel from "../Models/listsModel.js";

export const getAllLists = async (req, res) => {
  try {
    const { userId } = req.body;
    const lists = await listModel
      .find({ user: userId, deleted: false })
      .sort({ updatedAt: -1 });
    res.send({ success: true, message: "Lists Getting Successfully", lists });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting Lists", error });
  }
};

export const getSingleList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await listModel.findById(id);
    res
      .status(200)
      .send({ success: true, message: "Getting List Successfully", list });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting List", error });
  }
};

export const UpdateListController = async (req, res) => {
  try {
    const { id, completed, title, description } = req.body;
    console.log(id, completed, title, description);
    const updateList = await listModel.findByIdAndUpdate(id, {
      completed,
      title,
      description,
    });
    res.status(201).send({ success: true, message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Updating List", error });
  }
};

export const deleteListController = async (req, res) => {
  try {
    const { id } = req.body;
    const list = await listModel.findByIdAndUpdate(id, {
      deleted: true,
    });
    res.status(200).send({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Deleting List", error });
  }
};

export const getDeletedLists = async (req, res) => {
  try {
    const { userId } = req.body;
    const lists = await listModel
      .find({ user: userId, deleted: true })
      .sort({ updatedAt: -1 });
    res.send({ success: true, message: "Lists Getting Successfully", lists });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting Lists", error });
  }
};

export const restoreList = async (req, res) => {
  try {
    const { id } = req.body;
    const list = await listModel.findByIdAndUpdate(id, {
      deleted: false,
    });
    res.status(200).send({ success: true, message: "Restored Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Deleting List", error });
  }
};

export const deleteAllDeletedLists = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const lists = await listModel.deleteMany({ user: id, deleted: true });
    res
      .status(200)
      .send({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in deleting lists", error });
  }
};

export const deleteSingleList = async (req, res) => {
  try {
    const { id } = req.body;
    const list = await listModel.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Deleting List", error });
  }
}