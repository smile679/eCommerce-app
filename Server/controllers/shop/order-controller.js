

const createOrder = async(req, res)=>{
  try{

  }catch(error){
    console.log(error);
    res.status(500).json({
      success : false,
      message : 'Enteral server error'
    })
  }
}