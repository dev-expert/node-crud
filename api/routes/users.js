const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling GET request to Users page',
        payload: [
            {
                id: 1,
                name: 'karan'
            },
            {
                id: 2,
                name: 'Varun'
            }
        ]
    })
})

router.post('/', (req,res,next) => {
    const user = {
        name: req.body.name,
        age: req.body.age
    }
    res.status(201).json({
        message: 'Handling POST request to Users page',
        created: user
    })
})

router.get('/:userId', (req,res,next) => {
    res.status(200).json({
        message: 'User detail',
        id: req.params.userId
    })
})

router.patch('/:userId', (req,res,next) => {
    res.status(200).json({
        message: 'User updated',
        id: req.params.userId
    })
})

router.delete('/:userId', (req,res,next) => {
    res.status(200).json({
        message: 'User deleted',
        id: req.params.userId
    })
})

module.exports = router;