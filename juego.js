// =========================
// VARIABLES DEL JUEGO
// =========================

let animacionEnCurso = false;


// Botellas disponibles para gastar
let botellas = 0;


// Botellas conseguidas durante toda la partida
let botellasTotales = 0;


// Botellas por click
let botellasPorClick = 1;


// =========================
// MEJORA DE CLICK
// =========================

let precioMejoraClick = 21;


// =========================
// AUTOCLICKER NORMAL
// =========================

let autoclickers = 0;

let precioAutoclicker = 100;


// =========================
// AUTOCLICKERS ESPECIALES
// =========================

const preciosEspeciales = [
    2000,
    8000,
    16000,
    21000,
    30000,
    50000,
    81000
];


// Guardamos si cada uno ha sido comprado
let especialesComprados = [
    false,
    false,
    false,
    false,
    false,
    false,
    false
];


// Cada autoclicker especial da +100 por segundo
let produccionEspecial = 0;


// =========================
// POTENCIADOR
// =========================

const precioPotenciador = 50000;

let potenciadorActivo = false;

let tiempoPotenciador = 0;


// =========================
// ELEMENTOS
// =========================

const botella =
    document.getElementById("botellaAnimacion");

const personaje =
    document.getElementById("personaje");

const contadorBotellas =
    document.getElementById("contadorBotellas");

const contadorTotales =
    document.getElementById("contadorTotales");

const porClick =
    document.getElementById("porClick");

const contadorAutoclickers =
    document.getElementById("autoclickers");

const automatico =
    document.getElementById("automatico");

const botellero =
    document.getElementById("botellero");

const precioClick =
    document.getElementById("precioClick");

const precioAuto =
    document.getElementById("precioAutoclicker");

const botonClick =
    document.getElementById("botonMejoraClick");

const botonAuto =
    document.getElementById("botonAutoclicker");

const botonPotenciador =
    document.getElementById("botonPotenciador");

const potenciadorElemento =
    document.getElementById("potenciadorActivo");

const tiempoPotenciadorElemento =
    document.getElementById("tiempoPotenciador");

const especiales =
    document.getElementById("especiales");


// =========================
// CREAR AUTOCLICKERS ESPECIALES
// =========================

function crearEspeciales() {

    especiales.innerHTML = "";


    preciosEspeciales.forEach(
        (precio, indice) => {

            const boton =
                document.createElement("button");


            boton.className =
                "botonMejora especial";


            boton.id =
                "especial-" + indice;


            boton.innerHTML = `
                <span>
                    🚀 Especial +100/s
                </span>

                <small>
                    Precio: ${precio.toLocaleString("es-ES")}
                </small>
            `;


            boton.addEventListener(
                "click",
                () => comprarEspecial(indice)
            );


            especiales.appendChild(boton);

        }
    );

}


// =========================
// PRODUCCIÓN TOTAL
// =========================

function obtenerProduccionPorSegundo() {

    // Autoclickers normales:
    // +1 cada 5 segundos
    const produccionNormal =
        autoclickers / 5;


    // Especiales:
    // +100 por segundo cada uno
    const produccionTotalEspecial =
        produccionEspecial;


    return (
        produccionNormal +
        produccionTotalEspecial
    );
}


// =========================
// MULTIPLICADOR
// =========================

function obtenerMultiplicador() {

    if (potenciadorActivo) {
        return 3;
    }

    return 1;
}


// =========================
// ACTUALIZAR PANTALLA
// =========================

function actualizarPantalla() {

    contadorBotellas.textContent =
        Math.floor(botellas)
        .toLocaleString("es-ES");


    contadorTotales.textContent =
        Math.floor(botellasTotales)
        .toLocaleString("es-ES");


    porClick.textContent =
        "+" +
        Math.floor(
            botellasPorClick *
            obtenerMultiplicador()
        );


    contadorAutoclickers.textContent =
        autoclickers;


    const produccion =
        obtenerProduccionPorSegundo() *
        obtenerMultiplicador();


    automatico.textContent =
        "+" +
        Math.floor(produccion) +
        " /s";


    precioClick.textContent =
        precioMejoraClick
        .toLocaleString("es-ES");


    precioAuto.textContent =
        precioAutoclicker
        .toLocaleString("es-ES");


    actualizarBotellero();

    actualizarBotones();

}


// =========================
// SISTEMA DE BOTELLERO
// =========================

function actualizarBotellero() {

    let rango = "";


    if (botellasTotales < 100) {

        rango = "NOOB";

    } else if (botellasTotales < 1000) {

        rango = "MINI";

    } else if (botellasTotales < 10000) {

        rango = "PRO";

    } else if (botellasTotales < 100000) {

        rango = "HACKER";

    } else if (botellasTotales < 10000000) {

        rango = "GOD";

    } else {

        const nivel =
            Math.floor(
                botellasTotales /
                10000000
            );

        rango =
            "BOTELLERO " +
            nivel;
    }


    botellero.textContent =
        "🏆 " + rango;
}


// =========================
// ACTUALIZAR BOTONES
// =========================

function actualizarBotones() {

    botonClick.disabled =
        botellas < precioMejoraClick;


    botonAuto.disabled =
        botellas < precioAutoclicker;


    botonPotenciador.disabled =
        botellas < precioPotenciador ||
        potenciadorActivo;


    preciosEspeciales.forEach(
        (precio, indice) => {

            const boton =
                document.getElementById(
                    "especial-" + indice
                );


            if (!boton) {
                return;
            }


            if (especialesComprados[indice]) {

                boton.disabled = true;

                boton.classList.add(
                    "comprado"
                );

            } else {

                boton.disabled =
                    botellas < precio;

            }

        }
    );

}


// =========================
// COMPRAR MEJORA DE CLICK
// =========================

function comprarMejoraClick() {

    if (
        botellas <
        precioMejoraClick
    ) {
        return;
    }


    botellas -=
        precioMejoraClick;


    botellasPorClick += 1;


    // El precio aumenta +7
    precioMejoraClick += 7;


    actualizarPantalla();
}


// =========================
// COMPRAR AUTOCLICKER
// =========================

function comprarAutoclicker() {

    if (
        botellas <
        precioAutoclicker
    ) {
        return;
    }


    botellas -=
        precioAutoclicker;


    autoclickers += 1;


    // El precio aumenta +200
    precioAutoclicker += 200;


    actualizarPantalla();
}


// =========================
// COMPRAR AUTOCLICKER ESPECIAL
// =========================

function comprarEspecial(indice) {

    // Ya comprado
    if (
        especialesComprados[indice]
    ) {
        return;
    }


    const precio =
        preciosEspeciales[indice];


    // No hay suficientes botellas
    if (
        botellas < precio
    ) {
        return;
    }


    // Pagar
    botellas -= precio;


    // Marcar comprado
    especialesComprados[indice] =
        true;


    // +100 botellas por segundo
    produccionEspecial += 100;


    actualizarPantalla();
}


// =========================
// COMPRAR POTENCIADOR
// =========================

function comprarPotenciador() {

    // Ya está activo
    if (potenciadorActivo) {
        return;
    }


    // No hay suficientes botellas
    if (
        botellas <
        precioPotenciador
    ) {
        return;
    }


    // Pagar
    botellas -=
        precioPotenciador;


    // Activar inmediatamente
    potenciadorActivo =
        true;


    tiempoPotenciador =
        30;


    potenciadorElemento.style.display =
        "block";


    actualizarPantalla();


    // Cuenta atrás
    const intervalo =
        setInterval(() => {

            tiempoPotenciador--;


            tiempoPotenciadorElemento.textContent =
                tiempoPotenciador;


            if (
                tiempoPotenciador <= 0
            ) {

                clearInterval(intervalo);


                potenciadorActivo =
                    false;


                potenciadorElemento.style.display =
                    "none";


                actualizarPantalla();

            }

        }, 1000);

}


// =========================
// CLIC EN BOTELLA
// =========================

botella.addEventListener(
    "click",
    iniciarAnimacion
);


// =========================
// ANIMACIÓN
// =========================

function iniciarAnimacion() {

    if (animacionEnCurso) {
        return;
    }


    animacionEnCurso = true;


    botella.style.pointerEvents =
        "none";


    // Limpiar
    botella.classList.remove(
        "entrandoDerecha",
        "girando",
        "lanzando",
        "giroUnoGrado",
        "apareciendo"
    );


    personaje.classList.remove(
        "subiendo"
    );


    // =========================
    // ENTRADA
    // =========================

    botella.classList.add(
        "entrandoDerecha"
    );


    // =========================
    // PERSONAJE
    // =========================

    personaje.classList.add(
        "subiendo"
    );


    // =========================
    // LLEGA AL CENTRO
    // =========================

    setTimeout(() => {

        botella.classList.remove(
            "entrandoDerecha"
        );


        botella.src =
            "botella-agua.png";


        botella.classList.add(
            "giroUnoGrado"
        );

    }, 800);


    // =========================
    // ESPERA DEL AGUA
    // =========================

    setTimeout(() => {

        // Esperamos 3 segundos

    }, 3800);


    // =========================
    // LANZAMIENTO
    // =========================

    setTimeout(() => {

        botella.classList.remove(
            "giroUnoGrado"
        );


        botella.src =
            "botella.png";


        botella.classList.add(
            "lanzando"
        );

    }, 3800);


    // =========================
    // SUMAR BOTELLAS
    // =========================

    setTimeout(() => {

        botella.style.opacity =
            "0";


        personaje.classList.remove(
            "subiendo"
        );


        const cantidad =
            botellasPorClick *
            obtenerMultiplicador();


        botellas +=
            cantidad;


        botellasTotales +=
            cantidad;


        actualizarPantalla();

    }, 4600);


    // =========================
    // SIGUIENTE BOTELLA
    // =========================

    setTimeout(() => {

        botella.classList.remove(
            "lanzando",
            "entrandoDerecha",
            "giroUnoGrado"
        );


        botella.src =
            "botella.png";


        botella.style.opacity =
            "1";


        botella.style.pointerEvents =
            "auto";


        animacionEnCurso =
            false;


    }, 4900);

}


// =========================
// PRODUCCIÓN AUTOMÁTICA
// =========================

// Se ejecuta cada segundo

setInterval(() => {

    const produccion =
        obtenerProduccionPorSegundo() *
        obtenerMultiplicador();


    if (produccion > 0) {

        botellas +=
            produccion;


        botellasTotales +=
            produccion;


        actualizarPantalla();

    }

}, 1000);


// =========================
// INICIO
// =========================

crearEspeciales();

actualizarPantalla();