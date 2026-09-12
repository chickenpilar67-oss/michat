const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// Servir nuestra página
app.use(express.static(__dirname));


// Contador de usuarios
let usuariosConectados = 0;


// Cuando alguien se conecta
io.on("connection", (socket) => {

    usuariosConectados++;

    console.log("Un usuario se ha conectado");
    console.log("Usuarios conectados:", usuariosConectados);


    // Avisar a todos cuántas personas hay
    io.emit("usuarios", usuariosConectados);


    // Recibir un mensaje
    socket.on("mensaje", (datos) => {

        const mensaje = {

            nombre: datos.nombre,

            texto: datos.texto,

            hora: new Date().toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit"
            })

        };


        // Enviar el mensaje a todos
        io.emit("mensaje", mensaje);

    });


    // Cuando alguien se desconecta
    socket.on("disconnect", () => {

        usuariosConectados--;

        console.log("Un usuario se ha desconectado");
        console.log("Usuarios conectados:", usuariosConectados);


        // Actualizar contador
        io.emit("usuarios", usuariosConectados);

    });

});


// Puerto para Render o para nuestro ordenador
const PORT = process.env.PORT || 3000;


// Iniciar servidor
server.listen(PORT, "0.0.0.0", () => {

    console.log(`🚀 Servidor iniciado en el puerto ${PORT}`);

});
