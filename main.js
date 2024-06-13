let banderas = ["bandera-argentina", "bandera-bolivia", "bandera-brasil", "bandera-chile",
    "bandera-paraguay", "bandera-peru", "bandera-uruguay", "bandera-venezuela"]
banderas.forEach((bandera) => {
    banderas.push(bandera)
})

//Aplicamos el barajado de Fisher-Yates
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

let numeroDeClicks = 0;
let banderasSeleccionadas = []
let cuadrosSeleccionados = []
let aciertos = 0;
let intentos = 0;

function manejarTurnoUsuario(e) {

    desactivarAccionUsuario()

    numeroDeClicks++;
    const banderaSeleccionada = e.target.name
    const cuadroSeleccionado = e.target.id

    banderasSeleccionadas.push(banderaSeleccionada)
    cuadrosSeleccionados.push(cuadroSeleccionado)

    rotarBandera(banderaSeleccionada, cuadroSeleccionado)

    //para que no se pueda acertar apretando en la misma bandera dos veces
    desactivarBanderasEnJuego(cuadrosSeleccionados)

    mostrarIntentos();

    if (numeroDeClicks % 2 === 0) {
        intentos++;
        if (banderasSeleccionadas[0] === banderasSeleccionadas[1]) {
            aciertos++;
            desactivarBanderasCorrectas(cuadrosSeleccionados);
            if (aciertos === 8) {
                ganar();
            }
        } else {
            cuadrosSeleccionados.forEach((cuadro) => {
                setTimeout(() => {
                    rotarBandera("img/back.jpg", cuadro)
                }, 700)
            })
        }
        cuadrosSeleccionados = []
        banderasSeleccionadas = []
    }
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

function desactivarBanderasCorrectas(cuadrosSeleccionados) {
    cuadrosSeleccionados.forEach((cuadro) => {
        document.querySelector("#col-" + cuadro).className = ""
    })
}

function desactivarBanderasEnJuego(cuadrosSeleccionados) {
    if (cuadrosSeleccionados.length <= 1) {
        cuadrosSeleccionados.forEach((cuadro) => {
            document.querySelector("#col-" + cuadro).className = ""
        })
    } else {
        cuadrosSeleccionados.forEach((cuadro) => {
            document.querySelector("#col-" + cuadro).className = "col"
        })
    }
}

function mostrarIntentos(){
    document.querySelector("#intentos").textContent = intentos
}

function ganar() {
    mostrarMenuPrincipal();
    esconderPantallaDeJuego();
    mostrarResultados();
    reiniciarResultados();
}

function mostrarMenuPrincipal() {
    document.querySelector("#menu-principal").removeAttribute("hidden")
}

function esconderPantallaDeJuego() {
    document.querySelector("#pantalla-de-juego").setAttribute("hidden", "")
}

function mostrarResultados() {
    document.querySelector("#intentos-finales").textContent = intentos;
    document.querySelector("#minutos-totales").textContent = minutos;
    document.querySelector("#segundos-totales").textContent = segundos;
    document.querySelector("#centesimas-totales").textContent = centesimasDeSegundo;

    document.querySelector("#resultados").removeAttribute("hidden")
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

function reiniciarCronometro() {
    centesimasDeSegundo = 0;
    segundos = 0;
    minutos = 0;
}

function detenerCronometro() {
    clearInterval(empezarCronometro)
}

function reiniciarResultados() {
    ponerBanderasBocaAbajo();
    numeroDeClicks = 0;
    banderasSeleccionadas = [];
    cuadrosSeleccionados = [];
    aciertos = 0;
    intentos = 0;
    detenerCronometro();
    reiniciarCronometro();
    desactivarAccionUsuarioPermanente();
}



function ponerBanderasBocaAbajo() {
    i = 1;
    banderas.forEach(() => {
        let cuadro = "cuadro-" + i;
        document.querySelector("#col-cuadro-" + i).className = "col"
        rotarBandera("img/back.jpg", cuadro)
        i++
    })
}

function desactivarAccionUsuarioPermanente(){
    document.querySelectorAll(".col").forEach(($cuadro)=>{
        $cuadro.onclick = {}
    })
}
