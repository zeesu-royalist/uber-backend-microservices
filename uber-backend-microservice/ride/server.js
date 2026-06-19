const app = require('./app')
const http = require('http')

const server = http.createServer(app);

server.listen(3003, () => {
    console.log(`\nRide server is running at port 3003`)
})