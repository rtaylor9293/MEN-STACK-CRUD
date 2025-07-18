const express = require('express');
const router = express.Router();
const Car = require('../models/car.js');

module.exports = router;





router.get('/cars', async (req, res) => {
    const allCars = await Car.find()
    res.render('cars/index.ejs', { cars: allCars })
})

router.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs')
})


router.delete('/cars/:carId', async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
})


router.put('/cars/:carId', async (req, res) => {
    console.log(req.body)
    if (req.body.isGoodForKids === 'on') {
        req.body.isGoodForKids = true;
    } else {
        req.body.isGoodForKids = false;
    }
    await Car.findByIdAndUpdate(req.params.carId, req.body)
    res.redirect(`/cars/${req.params.carId}`)
})

router.post('/cars', async (req, res) => {
    console.log(req.body)
    if (req.body.isGoodForKids === 'on') {
        req.body.isGoodForKids = true;
    } else {
        req.body.isGoodForKids = false;
    }

    try {
        await Car.create(req.body)
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
        return;
    }
    res.redirect('/cars')
})


router.get('/cars/:carId/edit', async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/edit.ejs', { car: foundCar })
})


router.get('/cars/:carId', async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/show.ejs', { car: foundCar })
})