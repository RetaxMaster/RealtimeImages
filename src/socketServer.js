module.exports = (server) => {
    const SocketIo = require("socket.io");
    const io = SocketIo(server);

    io.on("connect", (socket) => {
        console.log("Se ha conectado un nuevo usuario");

        socket.on("update-image", (name) => {
            socket.broadcast.emit("update-image", name);
        });

    });
}