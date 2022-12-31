


const url = "ws://localhost:8080"
const server = new WebSocket(url)
// server.binaryType = "arraybuffer"

const message = document.getElementById("messages")
const input = document.getElementById("message")
const button = document.getElementById("send")

button.disabled = true
button.addEventListener("click", sendMessage, false)

server.onopen = function () {
    console.log("server.onopen is called")
    button.disabled = false
}

server.onmessage = function(event) {
    console.log("server.onmessage event is called")
    const {data } = event
    generateMessageEntry(data, "Server")
}

function generateMessageEntry(text, type) { 
    console.log("Generate message entry function is invoked")
    const newMessage = document.createElement('div')
    newMessage.innerText = `${type} says: ${text}`
    message.appendChild(newMessage)
}

function sendMessage() {
    console.log("sendMessege function is invoked")
    const text = input.value
    generateMessageEntry(text, 'Client')
    server.send(text)
}