
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const car = require('./typeofcars/car.js');
const carfunctions = require('./functions/carsFunction.js');
console.log(car, carfunctions);

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
}

connect();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(methodOverride('_method'))

app.use(carfunctions);


app.get('/', (req, res) => {
    res.render('index.ejs')
})

