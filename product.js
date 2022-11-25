const mongoose = require('mongoose');
const productSchema= mongoose.Schema({
    Job_title:String,
    Logo_link:String,
    Company:String,
    Job_type:String,
    Department_1:String,
    Department_2:String,
    Job_Description:String,
    Senior_Junior:String,
    City_Remote:String,
    Department_with_Gaming:String
});

module.exports= mongoose.model("Job",productSchema);