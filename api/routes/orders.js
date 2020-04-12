const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

router.get('/', (req,res,next) => {
    // res.status(200).json({
    //     message: 'Handling GET request to Orders page'
    // })
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc.id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3005/orders/' + doc._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req,res,next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save()
    })
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Order created',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3005/orders/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
    // res.status(201).json({
    //     message: 'Handling POST request to Orders page',
    //     created: order
    // })
})

router.get('/:orderId', (req,res,next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3005/orders'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
    // res.status(200).json({
    //     message: 'Product details',
    //     id: req.params.orderId
    // })
})

router.delete('/:orderId', (req,res,next) => {
    Order.remove({ _id: req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3005/orders',
                body: {
                    productId: 'ID',
                    quantiy: 'Number'
                }
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
    // res.status(200).json({
    //     message: 'Order deleted',
    //     id: req.params.orderId
    // })
})

module.exports = router;