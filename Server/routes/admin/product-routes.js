const express = require("express");
const {
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
  handleImageUpload,
} = require("../../controllers/admin/Product-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("file_path"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchProduct);

module.exports = router;