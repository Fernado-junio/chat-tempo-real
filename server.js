const { Socket } = require('dgram');
const express = require('express')
const path = require('path')


const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html',require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req,res)=> {
    res.render('index.html')
})

let menssages = []

io.on('connection', socket =>{
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessage', menssages)

    socket.on('sendMessage', data =>{
        menssages.push(data)
        socket.broadcast.emit('receiveMessage', data)
    })
})


server.listen(80)