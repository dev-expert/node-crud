const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling GET request to products page'
    })
})

router.post('/', (req,res,next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // }
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
    res.status(201).json({
        message: 'Handling POST request to products page',
        created: product
    })
})

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId
    if(id === '1'){
        res.status(200).json({
            message: 'This is special ID',
            id: id
        })
    } else{
        res.status(200).json({
            message: 'You passed an ID',
            id: id
        })
    }
})

router.patch('/:productId', (req,res,next) => {
    res.status(200).json({
        message: 'Updated Product',
    })
})

router.delete('/:productId', (req,res,next) => {
    res.status(200).json({
        message: 'Deleted Product',
    })
})

module.exports = router;