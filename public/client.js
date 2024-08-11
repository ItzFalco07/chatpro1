const messageArea = document.querySelector('.message__area');
const input = document.getElementById('input')
const socket = io();
let user;

do {
    user = prompt('Enter your Name');
} while (!user);

input.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
        e.target.value = '';
    }
})


function sendMessage(input) {
    let msg = {
        Name: user,
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
        <p>${msg.Message}</p>
        </div>
        `;

        messageArea.appendChild(messageElement);


    }


    // scrollToBottom();

}

//show message from other user / boadcast

socket.on('message', (msg) => {
    AppendMessage('incoming', msg);
    // scrollToBottom();
})



function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}