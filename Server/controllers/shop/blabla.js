const Cart = require("../../models/Cart");
const Product = require("../../models/Product")


const addToCartItem = async(req, res)=>{
  const { userId, productId, quantity } = req.body

  const product = await Product.findById(productId);

  if(!product){
    return
  }

  const cart = await Cart.findOne(userId)
  if(!cart){
    cart = new Cart({
      userId,
      items : [],
    })
  } else {
    const getCurrentIndex = cart.items.findIndex(item=>item.productId.toStringify() === productId)

    if(getCurrentIndex === -1){
      cart.items.push({productId, quantity})
    } else {
      cart.items[getCurrentIndex].quantity += quantity;
    }
  }


}


const fetchCartItems = async(req, res)=>{
  const { userId } = req.params;

  if(!userId) return

  const cart = await Cart.findOne({userId}).populate({
    path : "items.productId",
    select : 'title image price salesPrice'
  })

  if(!cart) return

  const validateItem = cart.items.filter(productItem=>productItem.productId)

  if(validateItem.items.length < cart.items.length){
      cart.items = validateItem
      cart.save()
  }

  const populatedItems = ({
    userId : 

  })


}