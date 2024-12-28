const mongoose = require('mongoose');

const pregnancySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
   bloodgroup:{
    type:String
},
hnw:[
{
    height:{
        type:Number,

    },
    weight:{
        type:Number,
    }
}


],
});
const Pregnancy=mongoose.model('pregnancy', pregnancySchema);

module.exports = Pregnancy;