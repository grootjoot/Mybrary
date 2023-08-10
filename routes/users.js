const express = require('express')
const router = express.Router()
const User = require('../models/user')

// All Users Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.firstName != null && req.query.firstName !== '') {
        searchOptions.firstName = new RegExp(req.query.firstName, 'i')
    }
    try {
        const users = await User.find(searchOptions)
        res.render('users/index', {
            users: users, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', { user: new User()})
})

// Create User Route
router.post('/', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    try {
        const newUser = await user.save();
        //res.redirect(`users/${newUser.id}`)
        res.redirect('users');
    } catch (err) {
        res.render('users/new', {
            user: user,
            errorMessage: 'Error creating User'
        })
    }
})

module.exports = router;
