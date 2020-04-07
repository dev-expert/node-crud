const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling GET request to products page'
    })
})

router.post('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling POST request to products page'
    })
})

module.exports = router;