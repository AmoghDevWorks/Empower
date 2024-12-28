const mongoose = require('mongoose');

const pregnancySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
   bloodgroup:{
    type:String
},
height:{
    type:Number,

},
weight:{
    type:Number,
},
 pregnancyWeek:{
    type:Number,
 }

});
const Pregnancy=mongoose.model('pregnancy', pregnancySchema);

module.exports = Pregnancy;