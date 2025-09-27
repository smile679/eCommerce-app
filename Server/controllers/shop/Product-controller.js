const Product = require('../../models/Product')

const getFilteredProducts =async(req, res)=>{
  try{
    const fetchProducts = await Product.find({});

    if(!fetchProducts){
      return res.status(400).json({
        success : false,
        message : 'something is wrong with fetching products',
      })
    }

    res.status(200).json({
      success : true,
      data : fetchProducts,
    })

  }catch(e){
    console.log(e);
    res.status(400).json({
      success : true,
      message : 'something is wrong with fetching products'
    })
    
  }
}

module.exports = { getFilteredProducts }