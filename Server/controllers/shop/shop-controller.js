const Cart = require("../../models/Cart"); 
const Product =  require("../../models/Product")

const addToCartItem = async(req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    if (!userId || !productId || !quantity <= 0 ) {
      return res.status(400).json({
        success: false,
        message: "Invalide data provided!",
      });
    }

    const product = await Product.findById(productId)
      if( !product ){
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }

    const cart = await Cart.findOne({userId})
      if (!cart) {
       cart = new Cart({
        userId,
        items : [],
       })
    }

    const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toStringify() === productId);

    if(findCurrentProductIndex === -1){
      cart.items.push({productId, quantity})
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save()

    res.status(200).json({
      success : true,
      data : cart,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something is wrong!",
    });
  }
};

const fetchCartItems =async (req, res) => {
  try {
    const { userId } = req.params;

    if(!userId){
      return res.status(400).json({
      success : false,
      message : 'user id is required!'
    })
    }

    const cart =await Cart.findOne({userId}).populate({
      path : 'items.productId',
      select : "image title price salePrice"
    })

    if(!cart){
      return res.status(400).json({
      success : false,
      message : 'Cart not found!'
    })
    }

      //validate items if they are present or deleted by admin 
    const validItems = cart.items.filter(productItem=>productItem.productId)

    if(validItems.length < cart.items.length){
      cart.items = validItems
      await cart.save()
    }

      const populateCartItem = validItems.map(item=>({
        productId : item.productId._id,
        image : item.productId.image,
        title : item.productId.title,   
        price : item.productId.price,
        salePrice : item.productId.salePrice,
        quantity : item.quantity,
      }))

    res.status(200).json({
      success : true,
      data : {
        ...cart._doc,
        populateCartItem
      },
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something is wrong!",
    });
  }
};

const updateCartItem = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something is wrong!",
    });
  }
};

const deleteCartItem = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something is wrong!",
    });
  }
};

module.exports = {
  addToCartItem,
  fetchCartItems,
  deleteCartItem,
  updateCartItem,
};
