
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      CartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderData,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured!",
    });
  }
};


const capturePayment = async (req, res) => {
  try {

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured!",
    });
  }
};


module.exports = { createOrder, capturePayment}