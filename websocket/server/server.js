const WebSocket = require("ws")
const express = require("express")
const path = require("path")


const app = express()
app.use('/', express.static(path.resolve(__dirname, "../client")))
const server = app.listen(8080)

const wss = new WebSocket.Server({
    server,
    verifyClient: (info) => {
        return true
    }
})


// const clients = []

// wss.on("connection", function(ws) {
//     clients.push(ws)
//     ws.on("message", function(data) {
//         clients.forEach(client => client.send(data.toString()))
//         // ws.send(data.toString())
//     })
// })



wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(data.toString())
            }
        })
    })
})