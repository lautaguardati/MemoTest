
let banderas = ["bandera-argentina", "bandera-bolivia", "bandera-brasil", "bandera-chile",
    "bandera-paraguay", "bandera-peru", "bandera-uruguay", "bandera-venezuela"]

banderas.forEach((bandera) => {
    banderas.push(bandera)
})


//Aplicamos el barajado de Fisher-Yates
function barajar(banderas) {
function barajar() {
    let m = banderas.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--)

        t = banderas[m];
        banderas[m] = banderas[i];
        banderas[i] = t
    }
    colocarBanderas()
}

function colocarBanderas() {
    i = 1;
    banderas.forEach((bandera) => {
        document.querySelector("#cuadro-" + i).setAttribute("name", "img/" + bandera + ".jpg")
        i++;
    })
}

document.querySelector("#boton-empezar-juego").onclick = comenzarJuego;
let empezarCronometro;
function comenzarJuego() {
    barajar();
    esconderMenuPrincipal();
    mostrarPantallaDeJuego();
    activarAccionUsuario();
    empezarCronometro = setInterval(agregarMS, 10)
}

function esconderMenuPrincipal() {
    document.querySelector("#menu-principal").setAttribute("hidden", "")
}

function mostrarPantallaDeJuego() {
    document.querySelector("#pantalla-de-juego").removeAttribute("hidden")
}


function activarAccionUsuario() {
    document.querySelectorAll(".col").forEach(($cuadro) => {
        $cuadro.onclick = manejarTurnoUsuario;
    })
}

function manejarTurnoUsuario(e) {

    desactivarAccionUsuario()

    numeroDeClicks++;
    const banderaSeleccionada = e.target.name
    const cuadroSeleccionado = e.target.id

}

function rotarBandera(bandera, cuadro) {
    const $cuadro = document.querySelector("#" + cuadro)
    $cuadro.style.rotate = "y 180deg"
    $cuadro.style.transition = "0.5s linear"
    setTimeout(() => {
        $cuadro.style.rotate = "y 0deg"
        $cuadro.src = bandera
    }, 225)
}

//Desactiva la accion del usuario temporalmente
function desactivarAccionUsuario() {
    document.querySelectorAll(".col").forEach(($cuadro) => {
        $cuadro.onclick = {};
    })
    setTimeout(() => {
        activarAccionUsuario()
    }, 500)
}


let centesimasDeSegundo = 0;
let segundos = 0;
let minutos = 0;

function agregarMS() {
    centesimasDeSegundo++;

    if (centesimasDeSegundo === 100) {
        centesimasDeSegundo = 0;
        segundos++;
    }
    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }
    mostrarCronometro();
}

function mostrarCronometro(){
    document.querySelector("#minutos").textContent = minutos;
    document.querySelector("#segundos").textContent = segundos;
    document.querySelector("#centesimas").textContent = centesimasDeSegundo;
}

