const messageArea = document.querySelector('.message__area');
const input = document.getElementById('input');
const send = document.getElementById('send');
const socket = io();
const sentmusic = new Audio('sent.mp3')
const arrivemusic = new Audio('arrive.mp3')
const connectedusers = document.querySelector('.users');
let user;
if (!localStorage.getItem('user')) {
    let user;
    do {
      user = prompt('enter your name');
    } while (!user); // Continue looping if user is empty
  
    localStorage.setItem('user', user);
  }

input.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        sentmusic.play();
        sendMessage(e.target.value);
        e.target.value = '';
        input.focus();
    }
})
send.addEventListener('click', function () {
    sentmusic.play();
    sendMessage(input.value);
    input.value = '';
    input.focus();
})

socket.on('updateCount', (count) => {
    console.log('working');
    connectedusers.innerHTML = `${count} Users Connected <i id="connected" class="ri-base-station-fill ri-xl"></i>`;
});
function sendMessage(input) {
    let msg = {
        Name: localStorage.getItem('user'),
        Message: input,
    }

    AppendMessage('outgoing', msg)
    // send to server
    socket.emit('message', msg);

}

function AppendMessage(type, msg) {
    if (msg.Message != '') {
        let messageElement = document.createElement('div');
        messageElement.innerHTML = `
        <div class="${type} message">
    <h4>${msg.Name}</h4>
    <p class='mes'>${msg.Message}</p>
</div>`;

        messageArea.appendChild(messageElement);


    }


    scrollToBottom();

}

//show message from other user / boadcast

socket.on('message', (msg) => {
    arrivemusic.play();
    AppendMessage('incoming', msg);
    scrollToBottom();
})



function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}