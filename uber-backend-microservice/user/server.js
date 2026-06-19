const app = require('./app')
const http = require('http')

const server = http.createServer(app);

server.listen(3001, () => {
    console.log(`\nUser server is running at port 3001`)
})