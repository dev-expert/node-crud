const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling GET request to Orders page'
    })
})

router.post('/', (req,res,next) => {
    const order = {
        amount: req.body.amount,
    }
    res.status(201).json({
        message: 'Handling POST request to Orders page',
        created: order
    })
})

router.get('/:orderId', (req,res,next) => {
    res.status(200).json({
        message: 'Product details',
        id: req.params.orderId
    })
})

router.delete('/:orderId', (req,res,next) => {
    res.status(200).json({
        message: 'Order deleted',
        id: req.params.orderId
    })
})

module.exports = router;