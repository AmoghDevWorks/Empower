const mongoose = require('mongoose');

const pregnancySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
   bloodGroup:{
    type:String
},
height:{
    type:Number,

},
weight:{
    type:Number,
},
 pregnancyweek:{
    type:Number,
 }

});
const pregnancy=mongoose.model('pregnancy', pregnancySchema);

module.exports = pregnancy;