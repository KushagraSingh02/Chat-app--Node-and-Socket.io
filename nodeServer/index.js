//node server which will handle socket via connections 
//remember to do nmp init  and npm i socket.io

const { Socket } = require('socket.io');
// const cors = require('cors');

const io = require('socket.io')(8000);
// cors(); 
const users={};

//io.on is for listening to the connection at 8000 port 
io.on('connection', socket=>{

    //event when user joins 
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name); //if a new user joins it is communicated to other users

    });

    //event named receive for when someone send a message
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });


    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
        
    })

})