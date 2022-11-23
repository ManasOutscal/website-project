const mongoose = require('mongoose');
const productSchema= mongoose.Schema({
    Position:String,
    Company:String,
    Details:String,
    City_Formula:String,
    Position_Formula:String
});

module.exports= mongoose.model("Job",productSchema);