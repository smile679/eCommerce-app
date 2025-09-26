const express = require("express");
const {
  handleImageUpoad,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/Product-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("file_path"), handleImageUpoad);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchProduct);

module.exports = router;