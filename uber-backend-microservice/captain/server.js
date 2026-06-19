const app = require('./app')
const http = require('http')

const server = http.createServer(app);

server.listen(3002, () => {
    console.log(`\nCaptain server is running at port 3002`)
})