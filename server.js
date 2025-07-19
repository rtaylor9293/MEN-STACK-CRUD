/*------------------------------- Starter Code -------------------------------*/
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Car = require('./models/car');
const carController = require('./controllers/carController.js');


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
}

connect();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(methodOverride('_method'))

app.use(carController);


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () => {
    console.log('sanity check')
})