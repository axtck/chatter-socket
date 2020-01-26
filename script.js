const socket = io("http://localhost:3000") //Port initialized in server.js.

const messageContainer = document.getElementById("message-container"); //Elements.
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("new-user", name) //Send name to server.

socket.on("chat-message", data => { //Catch chat-message event.
    appendMessage(data.name + ": " + data.message); //Call appendMessage(with data).
});

socket.on("user-connected", name => { //Catch user-connected event.
    appendMessage(name + " connected."); //Call appendMessage(with data).
});

socket.on("user-disconnected", name => { //Catch user-connected event.
    appendMessage(name + " disconnected."); //Call appendMessage(with data).
});

messageForm.addEventListener("submit", e => { //When submitting in form.
    e.preventDefault(); //Stop page from refreshing.
    const message = messageInput.value; //Get value from input.
    appendMessage("You: " + message); //Display messages that you sent.
    socket.emit("send-chat-message", message); //Send to server (send-chat-message event).
    messageInput.value = ""; //Clean input value when sending.
});

function appendMessage(message) {
    const messageElement = document.createElement("div"); //Create element.
    messageElement.innerText = message; //Message.
    messageContainer.append(messageElement); //Append div.
}