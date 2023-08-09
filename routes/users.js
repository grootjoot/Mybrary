const express = require('express')
const router = express.Router()

router.use(logger)

router.get('/', (req, res) => {
    console.log(req.query.name)
    res.send('Users List')
})

router.get('/new', (req, res) => {
    res.render('users/new', {firstName: 'Test'})
})

router.post('/', (req, res) => {
    const isValid = true
    if (isValid) {
        users.push({ firstname: req.body.firstName })
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log('Error')
        res.render('users/new', { firstName: req.body.firstName})
    }

    res.send('Hi')
})


// Make sure DYNAMIC ROUTES are at bottom of page
// Can attach multiple requests to urls with router
router
    .route('/:id')
    .get((req, res) => {
        //console.log(req.user)
        res.send(`Get user with ID ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update user with ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete user with ID ${req.params.id}`)
    })  


// Creates middleware (code that runs before routes), in this case 
// takes users array and relates each to the id 

const users = [{ name: 'Graesyn'}, { name: 'Tasia' }]
/*router.param('id', (req, res, next, id) => {
    req.user = users[id]
    next()
})*/

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

module.exports = router