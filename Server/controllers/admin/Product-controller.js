const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpoad = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//adding product
const addProduct = async (req, res) => {
  try {
    const {
      image,  
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    })
    await newlyCreatedProduct.save()

    res.status(201).json({
      success: true,
      data : newlyCreatedProduct,
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetching product
const fetchProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    if(!listOfProducts){
      return res.status(401).json({
        success : false,
        data : listOfProducts
      })
    }

    res.status(200).json({
      success : true,
      data : listOfProducts,
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//editing product
const editProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if(!findProduct){
      return res.status(401).json({
        success : false,
        message : 'Products not found'
      })
    }

      findProduct.image = image || findProduct.image;
      findProduct.title = title || findProduct.title;
      findProduct.description = description | findProduct.description;
      findProduct.category = category || findProduct.category;
      findProduct.brand = brand || findProduct.brand;
      findProduct.price = price === '' ? 0 : price || findProduct.price;
      findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
      findProduct.totalStock = totalStock || findProduct.totalStock;

    findProduct.save();
    res.status(200).json({
      success : true,
      message : "product successfully updated!",
      data : findProduct,
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",

    });
  }
};
//deleteing product
const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id)

    if(!deleteProduct){ 
      return res.status(404).json({
        success : false,
        message : 'products not found!'
      })
    }

    res.status(200).json({
      success : true,
      message : "product successfully deleted!",
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = { handleImageUpoad, addProduct, fetchProduct, editProduct, deleteProduct};
