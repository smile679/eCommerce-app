const mongoose = require('mongoose');

const connectToDb = async () => {
  try{
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log('mongoose successfully connected')
  }catch(error){
    console.log(error);
  }
}

module.exports = connectToDb;