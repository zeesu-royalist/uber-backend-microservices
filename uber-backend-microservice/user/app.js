const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const connect = require('./db/db')
connect();
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const RabbitMQ = require('./service/rabbit')
RabbitMQ.connectRabbit();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use('/', userRoutes)



module.exports = app;