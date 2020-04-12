const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')

router.get('/', (req,res,next) => {
    // res.status(200).json({
    //     message: 'Handling GET request to products page'
    // })
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        // console.log(docs),
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3005/products/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({error: err})
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
        res.status(201).json({
            message: 'Created product successfully',
            created: {
                name: result.name,
                price: result.price,
                _id: result._id,
                result: {
                    type: 'GET',
                    url: 'http://localhost:3005/products/' + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.send(500).json({error: err})
    })
})

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId
    // if(id === '1'){
    //     res.status(200).json({
    //         message: 'This is special ID',
    //         id: id
    //     })
    // } else{
    //     res.status(200).json({
    //         message: 'You passed an ID',
    //         id: id
    //     })
    // }
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc){
            res.status(200).json(doc)
        }else {
            res.status(404).json({message: 'No valid entry found'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

router.patch('/:productId', (req,res,next) => {
    const id = req.params.productId
    // res.status(200).json({
    //     message: 'Updated Product',
    // })
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id}, { $set: updateOps}).exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3005/products/' + id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
    // Product.update({ _id: id}, { $set: {
    //     name: req.body.newName,
    //     price: req.body.newPrice
    // }})
})

router.delete('/:productId', (req,res,next) => {
    const id = req.params.productId
    // res.status(200).json({
    //     message: 'Deleted Product',
    // })
    Product.remove({ _id: id})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

module.exports = router;