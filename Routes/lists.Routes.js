import express from "express";
import { UpdateListController, deleteAllDeletedLists, deleteListController, deleteSingleList, getAllLists, getDeletedLists, getSingleList, restoreList} from '../Controllers/listController.js'

const router = express();

// Get all Lists
router.post("/all-lists", getAllLists);

// Get Single List
router.post('/list/:id', getSingleList);

// Update List
router.post('/update-list', UpdateListController);

// Delete List
router.post('/delete-list', deleteListController);

// Get Deleted Lists
router.post('/deleted-lists', getDeletedLists);

// Restore  deleted Lists
router.post('/restore', restoreList);

// Delete All Deleted Lists
router.post('/delete', deleteAllDeletedLists);

// Delete Single List
router.post('/delete-single', deleteSingleList);

export default router;
