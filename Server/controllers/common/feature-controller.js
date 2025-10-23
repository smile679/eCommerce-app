const Feature = require("../../models/feature");

const addFeatureImage = async(req, res)=>{
  try{
      const { image } = req.body;
      if(!image){
        return res.status(400).json({
          success: false,
          message: "image file not provided",
        });
      }

      const featureImages = new Feature({
        image,
      })
      await featureImages.save()

      res.status(201).json({
          success: true,
          data : featureImages,
        });

  }catch(e){
    console.log(e);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
}

const getFeatureImages = async(req, res)=>{
  try{
    const featureImages = await Feature.find({})
    if(!featureImages){
        return res.status(400).json({
          success: false,
          message: "image not found!",
        });
      }

    res.status(200).json({
          success: true,
          data : featureImages,
        });

  }catch(e){
    console.log(e);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
}

module.exports = { addFeatureImage, getFeatureImages}