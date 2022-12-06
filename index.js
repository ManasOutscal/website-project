const express = require('express');
require("./config");
const Product = require('./product');
let path = require("path");
const app = express();
let port = process.env.PORT || 5000;
let publicpath = path.join(__dirname, "public");
app.use(express.json());
app.use(express.static(publicpath));
app.set("view engine", "ejs")



app.get("/jobs/:job-jobs-in-:key", async (req, resp) => {
    let { limit = 10 } = req.query;
    let page = req.query.page ? Number(req.query.page) : 1;
    let jobtitle = req.params.job;
    let citytitle = req.params.key;
    let rawdata = await Product.find(
        {
            "$or": [
                {
                    Department_with_Gaming: { $regex: req.params.job, $options: "i" },
                    City_Remote: { $regex: req.params.key, $options: "i" }
                },
                {
                    Department_with_Gaming: { $regex: req.params.job, $options: "i" },
                    Company: { $regex: req.params.key, $options: "i" }
                }
            ]
        }
    );
    let data = await Product.find(
        {
            "$or": [
                {
                    Department_with_Gaming: { $regex: req.params.job, $options: "i" },
                    City_Remote: { $regex: req.params.key, $options: "i" }
                },
                {
                    Department_with_Gaming: { $regex: req.params.job, $options: "i" },
                    Company: { $regex: req.params.key, $options: "i" }
                }
            ]
        }
    ).limit(limit * 1).skip((page - 1) * limit);
    let data2 = await Product.find(
        {
            "$or": [
                { City_Remote: { $regex: req.params.key, $options: "i" } },
                { Company: { $regex: req.params.key, $options: "i" } }
            ]
        }
    ).limit(limit * 1).skip((page - 1) * limit);
    let data3 = await Product.find(
        {
            "$or": [
                { Job_title: { $regex: req.params.job, $options: "i" } }
            ]
        }
    ).limit(limit * 1).skip((page - 1) * limit);
    let datanumber = rawdata.length;
    let numberdata = (page - 1) * limit;
    let numberofPages = Math.ceil(datanumber / limit);
    resp.render("jobss", { data, jobtitle, citytitle, datanumber, data2, data3, numberofPages, page, limit, numberdata })
});

app.get("/jobs/jobs-in-:key", async (req, resp) => {
    let { limit = 10 } = req.query;
    let page = req.query.page ? Number(req.query.page) : 1;
    let jobtitle = "";
    let citytitle = req.params.key;
    let rawdata = await Product.find(
        {
            "$or": [
                // {Position:{$regex:req.params.position}},
                { Company: { $regex: req.params.key, $options: "i" } },
                { City_Remote: { $regex: req.params.key, $options: "i" } }
            ]
        }
    );
    let data = await Product.find(
        {
            "$or": [
                // {Position:{$regex:req.params.position}},
                { Company: { $regex: req.params.key, $options: "i" } },
                { City_Remote: { $regex: req.params.key, $options: "i" } }
            ]
        }
    ).limit(limit * 1).skip((page - 1) * limit);
    let data2 = await Product.find(
        {
            "$or": [
                // {Position:{$regex:req.params.position}},
                { Company: { $regex: req.params.key, $options: "i" } },
                { City_Remote: { $regex: req.params.key, $options: "i" } }
            ]
        }
    ).limit(limit * 1).skip((page - 1) * limit);
    let data3 = await Product.find(
        {
            "$or": [
                // {Position:{$regex:req.params.position}},
                { Company: { $regex: req.params.key, $options: "i" } },
                { City_Remote: { $regex: req.params.key, $options: "i" } }
            ]
        }
    ).limit(limit * 1).skip((page - 1) * limit);
    let datanumber = rawdata.length;
    let numberdata = (page - 1) * limit;
    let numberofPages = Math.ceil(datanumber / limit);
    resp.render("jobss", { data, jobtitle, citytitle, datanumber, data2, data3, numberofPages, page, limit, numberdata })

});




app.get("/jobs/page/:key", async (req, resp) => {
    let { page = 1, limit = 15 } = req.query;
    let data = await Product.find({ _id: req.params.key });
    let pobj = data[0];
    let data2 = await Product.find(
        {
            "$or": [
                // {Position:{$regex:req.params.position}},
                {
                    City_Remote: { $regex: pobj.City_Remote, $options: "i" }
                }
            ]
        }
    ).limit(limit * 1).skip((page - 1) * limit);
    let data3 = await Product.find(
        {
            "$or": [
                // {Position:{$regex:req.params.position}},
                {
                    Company: { $regex: pobj.Company, $options: "i" }
                }
            ]
        }
    ).limit(2 * 1).skip((page - 1) * 2);
    resp.render("japplication", { pobj, data2, data3 })

});

app.listen(port)