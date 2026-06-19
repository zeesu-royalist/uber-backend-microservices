const express = require('express')
const expressProxy = require('express-http-proxy')

const app = express()

app.use('/user', expressProxy('http://localhost:3001'))
app.use('/captain', expressProxy('http://localhost:3002'))
app.use('/ride', expressProxy('http://localhost:3003'))

app.listen(3000, () => {
    console.log("\nGateway Server is running at Port 3000")
})

// npm install amqplib : package for connecting severs.
// cloudAMQP : website for communicate between multiple servers.