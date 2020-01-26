const io = require("socket.io")(3000); //Init port.

const users = {}

io.on("connection", socket => { //Catch connection event.
    socket.on("new-user", name => { //Catch event new-user.
        users[socket.id] = name; //Set id equal to name.
        socket.broadcast.emit("user-connected", name); //Send user-connected event.
    });
    socket.on("send-chat-message", message => { //Catch event send-chat-message.
        socket.broadcast.emit("chat-message", { //Send message to other users on server
            message: message, //as an object. (message)
            name: users[socket.id] //(name)
        });
    });
    socket.on("disconnect", name => { //Catch disconnect event.
        socket.broadcast.emit("user-disconnected", users[socket.id]); //Send user-connected event.
        delete users[socket.id];
    });
});