const Product = require('../../models/Product')

const getFilteredProducts =async(req, res)=>{
  try{
    const { category = [], brand = [], sortBy = 'price-lowtohigh' } = req.query;
    const filters = {}
    let sort = {}

    if(category.length){
      filters.category = {$in: category.split(',')}
    }

    if(brand.length){
      filters.brand = {$in: brand.split(',')}
    }

    switch (sortBy) {
      case 'price-lowtohig':
        sort.price = 1
        break;
      case 'price-hightolow':
        sort.price = -1
        break;
      case 'title-atoz':
        sort.title = 1
        break;
      case 'title-ztoa':
        sort.title = -1
        break;
      default:
        sort.price = 1
        break;
    }
    
    const fetchProducts = await Product.find(filters).sort(sort);

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

const getProductDetails=async (req,res)=>{
  const {id} = req.params;
  try{
    const data = await Product.findById(id);

    if(!data){
      return res.status(400).json({
      success : false,
      message : 'sorry card details not found!'
    })
    }

    res.status(200).json({
      success : true,
      data,
    })

  }catch(error){
    console.log(error);
    res.status(400).json({
      success : true,
      message : 'something is wrong with fetching products'
    })
  }
}

module.exports = { getFilteredProducts, getProductDetails }