const sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
const sectionReiniciarJuego=document.getElementById('reiniciar')

const botonMascotaJugador = document.getElementById('boton-mascota')

let botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')

const spanMascotaJugador= document.getElementById('mascota-jugador')

const spanMascotaEnemigo= document.getElementById('mascota-enemigo')

let spanVidasEnemigo = document.getElementById('vidas-enemigo')
let spanVidasJugador = document.getElementById('vidas-jugador')

const seccionMensajes= document.getElementById('resultadoAtaque')

const ataqueDelJugador= document.getElementById('ataques-del-jugador')
const ataqueDelEnemigo= document.getElementById('ataques-del-enemigo')
const contenedorTarjetas= document.getElementById('contenedorTarjetas')
const contenedorAtaques= document.getElementById('contenedorAtaques')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos=[]
let opcionDeMokepones
let ataqueJugador=[]
let ataqueEnemigo=[]
let ataquesMokeponEnemigo
let ataquesMokepon
let botonFuego 
let botonAgua 
let botonTierra 
let mascotaJugador
let mascotaJugadorObjeto
let indexAtaqueJugador
let indexAtaqueEnemigo
let botones = []
let resultadoAtaque
let vidasEnemigo = 0
let vidasJugador = 0
let poderMokeponEnemigo
let poderMokeponJugador
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/arenamokepon.png'

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
let alturaQueBuscamos
let anchoDelMapa= window.innerWidth -100

alturaQueBuscamos= anchoDelMapa * 50/80

mapa.width=anchoDelMapa
mapa.height=alturaQueBuscamos

const anchoMaximoDelMapa = 300

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}




let lienzo = mapa.getContext("2d")
let velocidadX
let velocidadY

class Mokepon{
    constructor(nombre, foto, poder, fotoMapa, id= null){
        this.id=id
        this.nombre=nombre
        this.foto=foto
        this.poder=poder
        this.ataques=[]
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX=0
        this.velocidadY=0
    }

    pintar(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

//objetos
let hipodoge= new Mokepon('Hipodoge','./assets/char2.png',5, './assets/charmander.png' )
let capipepo= new Mokepon('Capipepo','./assets/squirtle2.png',5, './assets/squirtle.png')
let ratigueya= new Mokepon('Ratigueya','./assets/psyduck2.png',5, './assets/psyduck.png')
let picacu=new Mokepon('Picacu','./assets/pikachu2.png',5, './assets/pikachu.png')
let bolbasor=new Mokepon('Bolbasor','./assets/bolbasor2.png',5, './assets/bullbasaur.png')

//enemigos


//mokepones.push(hipodoge, capipepo, ratigueya, picacu, bolbasor)
//mokeponesEnemigos.push(hipodogeEnemigo, capipepoEnemigo, ratigueyaEnemigo, picacuEnemigo, bolbasorEnemigo)

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const PICACU_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

picacu.ataques.push(...PICACU_ATAQUES)

const BOLBASOR_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

bolbasor.ataques.push(...BOLBASOR_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya, picacu, bolbasor)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display='none'
    sectionReiniciarJuego.style.display='none'
    sectionVerMapa.style.display='none'

    mokepones.forEach((mokepon)=> {
        opcionDeMokepones =`
        <input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class = "tarjeta-mokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label> 
        `
        contenedorTarjetas.innerHTML+=opcionDeMokepones

        inputhipodoge = document.getElementById('Hipodoge')
        inputcapipepo = document.getElementById('Capipepo')
        inputratigueya = document.getElementById('Ratigueya')
        inputpicacu = document.getElementById('Picacu')
        inputbolbasor = document.getElementById('Bolbasor')
        })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
   
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.6:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display='none'
    
    let imagenDeCapipepo = new Image()
    imagenDeCapipepo.src = capipepo.foto
    lienzo.drawImage(
        imagenDeCapipepo,
        20,
        40,
        100,
        100
    )

    if(inputhipodoge.checked) {
        spanMascotaJugador.innerHTML = inputhipodoge.id
        mascotaJugador=inputhipodoge.id
        poderMokeponJugador=mokepones[0].poder
    }else if(inputcapipepo.checked){
        spanMascotaJugador.innerHTML = inputcapipepo.id
        mascotaJugador=inputcapipepo.id
        poderMokeponJugador=mokepones[1].poder
    }else if(inputratigueya.checked){
        spanMascotaJugador.innerHTML = inputratigueya.id
        mascotaJugador=inputratigueya.id
        poderMokeponJugador=mokepones[2].poder
    }else if(inputpicacu.checked){
        spanMascotaJugador.innerHTML = inputpicacu.id
        mascotaJugador=inputpicacu.id
        poderMokeponJugador=mokepones[3].poder
    }else if(inputbolbasor.checked){
        spanMascotaJugador.innerHTML = inputbolbasor.id
        mascotaJugador=inputbolbasor.id
        poderMokeponJugador=mokepones[4].poder
    }else{
        alert("Debes seleccionar una mascota")
        sectionSeleccionarAtaque.style.display='none'

        reiniciarJuego()
    }

    seleccionarMokepon(mascotaJugador)
   extraerAtaques(mascotaJugador)
   sectionVerMapa.style.display='flex'
    iniciarMapa()
    }

    function seleccionarMokepon(mascotaJugador) {
        fetch(`http://192.168.1.6:8080/mokepon/${jugadorId}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mokepon: mascotaJugador
            })
        })
    }
function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
     mostrarAtaques(ataques)
    
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque Bataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones=document.querySelectorAll('.Bataque')
   
    console.log(botones)

 }

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58' 
                boton.disabled =true  
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled =true  
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled =true  
            }

            if(ataqueJugador.length===5){
                enviarAtaques()
            }
            
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.6:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
          })
    })
    //console.log(ataques)
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.6:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
        //console.log(ataqueEnemigo)
}



function seleccionarMascotaEnemigo(enemigo){
    let mascotaAleatorio= aleatorio(mokepones.length-1,0)

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    //poderMokeponEnemigo=mokepones[enemigo].poder
      secuenciaAtaque()
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
           // console.log(ataqueJugador)
            //console.log(ataqueJugador)
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        }else if(ataqueJugador[index]=='FUEGO'&&ataqueEnemigo[index]=='AGUA'){
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            vidasEnemigo++
            spanVidasEnemigo.innerHTML=vidasEnemigo
        }else if(ataqueJugador[index]=='FUEGO'&&ataqueEnemigo[index]=='TIERRA'){
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            vidasJugador++
            spanVidasJugador.innerHTML=vidasJugador
        }else if(ataqueJugador[index]=='AGUA'&&ataqueEnemigo[index]=='FUEGO'){
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            vidasJugador++
            spanVidasJugador.innerHTML=vidasJugador
        }else if(ataqueJugador[index]=='AGUA'&&ataqueEnemigo[index]=='TIERRA'){
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            vidasEnemigo++
            spanVidasEnemigo.innerHTML=vidasEnemigo
        }else if(ataqueJugador[index]=='TIERRA'&&ataqueEnemigo[index]=='FUEGO'){
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            vidasEnemigo++
            spanVidasEnemigo.innerHTML=vidasEnemigo
        }else if(ataqueJugador[index]=='TIERRA'&&ataqueEnemigo[index]=='AGUA'){
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            vidasJugador++
            spanVidasJugador.innerHTML=vidasJugador
        }
    }
      revisarVidas()
}

function crearMensajeFinal(resultadoFinal){
    
    seccionMensajes.innerHTML = resultadoFinal

    sectionReiniciarJuego.style.display='flex'
}

function crearMensaje(resultadoAtaque){
    
    let nuevoAtaqueJugador= document.createElement('p')
    let nuevoAtaqueEnemigo= document.createElement('p')

    seccionMensajes.innerHTML=resultadoAtaque
    nuevoAtaqueJugador.innerHTML=indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML=indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function reiniciarJuego(){
    location.reload()
}

function revisarVidas(){
//aumentarVidas()

    if(vidasEnemigo==vidasJugador){
        crearMensajeFinal("EMPATE")
    }else if(vidasJugador>vidasEnemigo){
        crearMensajeFinal("GANASTE, ERES UN CRACK")
       }else if(vidasJugador<vidasEnemigo){
        crearMensajeFinal("PERDISTE, ERES UN INEPTO")
       }
}

function seleccionarAtaqueEnemigo(){
    let ataqueAleatorio= aleatorio(0,ataquesMokeponEnemigo.length -1)
    let ataqueEnemigoMokepon= ataquesMokeponEnemigo[ataqueAleatorio].nombre
    console.log(ataqueEnemigoMokepon)

    if (ataqueEnemigoMokepon==='🔥') {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueEnemigoMokepon==='💧') {
        ataqueEnemigo.push('AGUA')
    } else if(ataqueEnemigoMokepon==='🌱'){
        ataqueEnemigo.push('TIERRA')
    }
    //console.log(ataqueEnemigo)
   iniciarPelea()  
}

function iniciarPelea(){
//let a=Math.min(poderMokeponEnemigo,poderMokeponJugador)


if(ataqueJugador.length===5){
    
   combate()
}
}

//function aumentarVidas(){
  //  let n=Math.abs(poderMokeponEnemigo-poderMokeponJugador)
    //let b=poderMokeponEnemigo-poderMokeponJugador
    //console.log(n,b)
    //if(b>0){
      //  vidasEnemigo=vidasEnemigo+n
        //}else if(b<0){
        //vidasJugador=vidasJugador+n
       // } 
//}

function pintarCanvas() {
    mascotaJugadorObjeto.x=mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y=mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)//limpiar canvas
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
   mascotaJugadorObjeto.pintar()

   enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
  

   mokeponesEnemigos.forEach(function (mokepon)
   {
       if(mokepon != undefined){
           mokepon.pintar()
           revisarColision(mokepon)
       }
   })
}

function enviarPosicion(x, y){
    fetch(`http://192.168.1.6:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x:x,
            y:y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ enemigos }) {
                console.log(enemigos)



                mokeponesEnemigos = enemigos.map(function (enemigo)
                {
                    let mokeponEnemigo = null
                    if(enemigo.mokepon != undefined)
                    {
                        const mokeponNombre = enemigo.mokepon.nombre 
                        switch (mokeponNombre)
                        {
                        case "Hipodoge":
                            mokeponEnemigo = new Mokepon('Hipodoge','./assets/char2.png',5, './assets/charmander.png', enemigo.id)
                                break
                            case "Capipepo":
                                mokeponEnemigo = new Mokepon('Capipepo','./assets/squirtle2.png',5, './assets/squirtle.png',enemigo.id)
                                break
                            case "Ratigueya":
                                mokeponEnemigo = new Mokepon('Ratigueya','./assets/psyduck2.png',5, './assets/psyduck.png',enemigo.id)
                                break
                            case "Picacu":
                                mokeponEnemigo = new Mokepon('Picacu','./assets/pikachu2.png',5, './assets/pikachu.png',enemigo.id)
                                break
                            case "Bolbasor":
                                mokeponEnemigo = new Mokepon('Bolbasor','./assets/bolbasor2.png',5, './assets/bullbasaur.png', enemigo.id)
                                break
                            default:
                                break
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                    }
                        return mokeponEnemigo
                })

            })

        }

})
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY=5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY=-5
}

function moverDerecha() {
   mascotaJugadorObjeto.velocidadX=5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX=-5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX=0
    mascotaJugadorObjeto.velocidadY=0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
       
mascotaJugadorObjeto=obtenerObjetoMascota(mascotaJugador)
console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    //necesitamos recibir al enemigo como parametro porque hay que identificar el enemigo con el cual se va a colisionar
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');
    enemigoId=enemigo.id

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
