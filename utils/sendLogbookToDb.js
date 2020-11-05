require('dotenv').config();
const url = process.env.CN_STRING;
const devUrl = process.env.LOCAL_CN_STRING;
const mongoose = require('mongoose');
const LogbookModel = require('./models/logbook');

module.exports = async (logbook,i) => {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (cn) => {
    if(i === 0){
      await LogbookModel.deleteMany({}).exec();
    }
    await logbook.save();  
  }).catch((err) => {
    console.log(err);
  }).finally(async () => {
    await mongoose.disconnect();
    
  })
}
