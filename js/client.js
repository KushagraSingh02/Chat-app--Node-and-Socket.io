//we will be calling the custom built events in sockets in client side now
const socket = io('http://localhost:8000');



const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')


//adding audio
var audio = new Audio ('ting.mp3');

const append =(message,position)=>{

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    
    if(position== 'left')
        audio.play();
}

//we have to add an eventlistener to the form so that we know what happens when we submit the form
form.addEventListener('submit',(e)=>{

    e.preventDefault();
    const message = messageInput.value;
    append(`You ${message}`,'right');//this will append message for us
    socket.emit('send',message);//this will help appen for all other people connected
    messageInput.value = '';


})
const name1 = prompt('enter your name to join ');
socket.emit('new-user-joined',name1)

socket.on('user-joined',data=>{
    append(`${name1} joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})

//listen to leave event when disconnect is fired
socket.on('left',data=>{
    append(`${data.name} left the chat`,'left')
})
