//Client
const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const name = prompt("Enter your name to join");
var audio = new Audio('FreeChat_Notification.mp3');
socket.emit('new-user-joined', name)

//CONCATINATE
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

//MESSAGE SEND
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')
})
