const express = require('express');
require("./config");
const Product = require('./product');
let path = require("path");
const app = express();
let port = process.env.PORT || 5000;
let publicpath = path.join(__dirname,"public");
app.use(express.json());
app.use(express.static(publicpath));
app.set("view engine","ejs")


app.get("/jobs", async (req, resp) => {
    let data = await Product.find({});
    // let rdata = data.reduce((final,current)=>{
    //     let obj = final.find((item) => item.City_Formula === current.City_Formula);

    //     if (obj){
    //         return final;
    //     }
    //     return final.concat([current])

    // },[]);
    let ddata = data.reduce((final,current)=>{
        let obj = final.find((item) => item.City_Formula === current.City_Formula);

        if (obj){
            return final;
        }
        return final.concat([current])

    },[]);
    resp.render("jobss",{data,ddata})
});

app.get("/jobs/cities/:key",async (req,resp)=>{
    let { page = 1,limit = 10} =req.query;
    let data = await Product.find(
        {
            "$or":[
                // {Position:{$regex:req.params.position}},
                {City_Formula:{$regex:req.params.key}}
            ]
        }
    ).limit(limit*1).skip((page - 1) * limit);
    resp.render("jobss",{data})

});
app.get("/jobs/companies/:key",async (req,resp)=>{
    let { page = 1,limit = 10} =req.query;
    let data = await Product.find(
        {
            "$or":[
                // {Position:{$regex:req.params.position}},
                {Company:{$regex:req.params.key}}
            ]
        }
    ).limit(limit*1).skip((page - 1) * limit);
    resp.render("jobss",{data})

});


app.listen(port)