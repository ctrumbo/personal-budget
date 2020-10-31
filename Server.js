const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const dataModel = require("./modules/data_schema");
const app = express();
const port = 3000;

let url = 'mongodb://localhost:27017/chart_data'

const mongoDBClient = require('mongodb').MongoClient

app.use(cors());

app.get('/budget', (req, res) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        dataModel.find({})
                .then((data) => {
                    res.json(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
    })
    .catch((connectionError) =>{
        console.log(connectionError)
    })
});

app.post('/budget', (req, res) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                var dataStructure = {
                    title: req.body.title,
                    value: req.body.value,
                    color: req.body.color
                };
                dataModel.insertMany(dataStructure)
                    .then((data) => {
                        res.json(data);
                        mongoose.connection.close();
                    })
                    .catch((connectionError) => {
                        console.log(connectionError)
                    })
            })
            .catch((connectionError) => {
                console.log(connectionError);
            })
});

app.listen(port, () => {
    console.log('API Served at http://localhost:3000');
});