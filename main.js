
let banderas = ["bandera-argentina", "bandera-bolivia", "bandera-brasil", "bandera-chile",
    "bandera-paraguay", "bandera-peru", "bandera-uruguay", "bandera-venezuela"]

banderas.forEach((bandera) => {
    banderas.push(bandera)
})


//Aplicamos el barajado de Fisher-Yates
function barajar(banderas) {
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


function rotarBandera(bandera, cuadro) {
    const $cuadro = document.querySelector("#" + cuadro)
    $cuadro.style.rotate = "y 180deg"
    $cuadro.style.transition = "0.5s linear"
    setTimeout(() => {
        $cuadro.style.rotate = "y 0deg"
        $cuadro.src = bandera
    }, 225)
}

