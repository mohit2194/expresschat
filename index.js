var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(8080, function(){
    console.log('Server setup on 8080')
});


//Serve the browser some static pages
app.use(express.static('public'));

//Setup socket
var io = socket(server);

io.on('connection', function(socket){
    // console.log('Connection made', socket.id)

    socket.on('chat', function(data){
        io.sockets.emit('chat',data)
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing', data)
    })
})