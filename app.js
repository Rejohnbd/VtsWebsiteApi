
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Define App
const app = express()

// Define Database
mongoose.connect(process.env.DB_URL, { useCreateIndex: true, useNewUrlParser: true }, err => {
        if(!err){
            console.log('MongoDB Connect Successfully')
        }else{
            console.log('Error in DB Connection: ', err)
        }
    }
)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World with Express'));

// Defice app.js to index.js
module.exports = app;