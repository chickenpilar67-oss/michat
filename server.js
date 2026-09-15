const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// =========================
// SERVIR LA PÁGINA
// =========================

app.use(express.static(__dirname));


// =========================
// USUARIOS CONECTADOS
// =========================

let usuariosConectados = 0;


// =========================
// COMPROBAR RANGO
// =========================

function normalizarRango(rango) {

    const valor =
        String(rango || "NOOB").trim();


    // Rangos normales

    if (
        valor === "NOOB" ||
        valor === "MINI" ||
        valor === "PRO" ||
        valor === "HACKER" ||
        valor === "GOD"
    ) {

        return valor;

    }


    // Rangos BOTELLERO

    if (
        /^BOTELLERO [1-9]\d*$/.test(valor)
    ) {

        return valor;

    }


    // Si alguien intenta mandar
    // un rango que no existe

    return "NOOB";
}


// =========================
// CONEXIÓN DE USUARIO
// =========================

io.on("connection", (socket) => {

    usuariosConectados++;


    console.log(
        "Un usuario se ha conectado"
    );


    console.log(
        "Usuarios conectados:",
        usuariosConectados
    );


    // Actualizar contador
    // para todos

    io.emit(
        "usuarios",
        usuariosConectados
    );


    // =========================
    // RECIBIR MENSAJE
    // =========================

    socket.on(
        "mensaje",
        (datos) => {

            const mensaje = {

                nombre:
                    String(
                        datos.nombre || "Usuario"
                    ).trim(),

                texto:
                    String(
                        datos.texto || ""
                    ),

                rango:
                    normalizarRango(
                        datos.rango
                    ),

                hora:
                    new Date().toLocaleTimeString(
                        "es-ES",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    )

            };


            // Enviar el mensaje
            // a todos los usuarios

            io.emit(
                "mensaje",
                mensaje
            );

        }
    );


    // =========================
    // DESCONECTAR USUARIO
    // =========================

    socket.on(
        "disconnect",
        () => {

            usuariosConectados--;


            console.log(
                "Un usuario se ha desconectado"
            );


            console.log(
                "Usuarios conectados:",
                usuariosConectados
            );


            io.emit(
                "usuarios",
                usuariosConectados
            );

        }
    );

});


// =========================
// PUERTO
// =========================

const PORT =
    process.env.PORT || 3000;


// =========================
// INICIAR SERVIDOR
// =========================

server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `🚀 Servidor iniciado en el puerto ${PORT}`
        );

    }
);
