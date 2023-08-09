if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const expressLayouts = require ('express-ejs-layouts')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(expressLayouts)
//app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const userRouter = require('./routes/users')
const indexRouter = require('./routes/index')

app.use('/', indexRouter)
app.use('/users', userRouter)


app.listen(process.env.PORT || 3000)
