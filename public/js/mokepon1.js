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

let lienzo = mapa.getContext("2d")
let velocidadX
let velocidadY

class Mokepon{
    constructor(nombre, foto, poder, fotoMapa, x=10, y=10){
        this.nombre=nombre
        this.foto=foto
        this.poder=poder
        this.ataques=[]
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
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
let hipodoge= new Mokepon('Hipodoge','./assets/char.png',3, './assets/char.png' )
let capipepo= new Mokepon('Capipepo','./assets/fuego.png',4, './assets/fuego.png')
let ratigueya= new Mokepon('Ratigueya','./assets/tierra.png',5, './assets/tierra.png')
let picacu=new Mokepon('Picacu','./assets/pikachu.png',5, './assets/pikachu.png')
let bolbasor=new Mokepon('Bolbasor','./assets/bullbasaur.png',4, './assets/bullbasaur.png')

//enemigos
let hipodogeEnemigo= new Mokepon('Hipodoge','./assets/char.png',3, './assets/char.png' ,100, 50)
let capipepoEnemigo= new Mokepon('Capipepo','./assets/fuego.png',4, './assets/fuego.png',400,50)
let ratigueyaEnemigo= new Mokepon('Ratigueya','./assets/tierra.png',5, './assets/tierra.png',200,20)
let picacuEnemigo=new Mokepon('Picacu','./assets/pikachu.png',5, './assets/pikachu.png',80,200)
let bolbasorEnemigo=new Mokepon('Bolbasor','./assets/bullbasaur.png',4, './assets/bullbasaur.png',300,120)

mokepones.push(hipodoge, capipepo, ratigueya, picacu, bolbasor)
mokeponesEnemigos.push(hipodogeEnemigo, capipepoEnemigo, ratigueyaEnemigo, picacuEnemigo, bolbasorEnemigo)


hipodoge.ataques.push(
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🌱', id:'boton-tierra'},
)

hipodogeEnemigo.ataques.push(
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🌱', id:'boton-tierra'},
)

capipepo.ataques.push(
    {nombre:'🌱', id:'boton-tierra'},
    {nombre:'🌱', id:'boton-tierra'},
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🔥', id:'boton-fuego'},    
)

capipepoEnemigo.ataques.push(
    {nombre:'🌱', id:'boton-tierra'},
    {nombre:'🌱', id:'boton-tierra'},
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🔥', id:'boton-fuego'},
    
)

ratigueya.ataques.push(
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🌱', id:'boton-tierra'},
)

ratigueyaEnemigo.ataques.push(
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🌱', id:'boton-tierra'},
)

picacu.ataques.push(
    {nombre:'💧', id:'boton-agua'},
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🌱', id:'boton-tierra'},
)

picacuEnemigo.ataques.push(
    {nombre:'💧', id:'boton-agua'},
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🔥', id:'boton-fuego'},
    {nombre:'🌱', id:'boton-tierra'},
)

bolbasor.ataques.push(
    {nombre:'🌱', id:'boton-agua'},
    {nombre:'🌱', id:'boton-tierra'},
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🔥', id:'boton-fuego'},
    )

bolbasorEnemigo.ataques.push(
    {nombre:'🌱', id:'boton-agua'},
    {nombre:'🌱', id:'boton-tierra'},
    {nombre:'💧', id:'boton-agua'},
    {nombre:'🔥', id:'boton-fuego'},
    )
    

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
   extraerAtaques(mascotaJugador)
   sectionVerMapa.style.display='flex'
    iniciarMapa()
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
            seleccionarAtaqueEnemigo()
        })
    })
}


function seleccionarMascotaEnemigo(enemigo){
    let mascotaAleatorio= aleatorio(mokepones.length-1,0)

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    //poderMokeponEnemigo=mokepones[enemigo].poder
    if(spanMascotaEnemigo.textContent==='Hipodoge'){
        poderMokeponEnemigo=mokeponesEnemigos[0].ataques.length
    }else if(spanMascotaEnemigo.textContent==='Capipepo'){
        poderMokeponEnemigo=mokeponesEnemigos[1].ataques.length
    }else if(spanMascotaEnemigo.textContent==='Ratigueya'){
        poderMokeponEnemigo=mokeponesEnemigos[2].ataques.length
    }else if(spanMascotaEnemigo.textContent==='Picacu'){
        poderMokeponEnemigo=mokeponesEnemigos[3].ataques.length
    }else if(spanMascotaEnemigo.textContent==='Bolbasor'){
        poderMokeponEnemigo=mokeponesEnemigos[4].ataques.length
    }
    secuenciaAtaque()
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    let n=Math.abs(poderMokeponEnemigo-poderMokeponJugador)
    console.log(n)
    
    let victoriasEnemigo
    let victoriasJugador
    let b=poderMokeponEnemigo-poderMokeponJugador

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(b<0){
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        }else if(ataqueJugador[index]=='FUEGO'&&ataqueEnemigo[index]=='AGUA'){
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            vidasEnemigo++
            victoriasEnemigo=vidasEnemigo++
            poderMokeponEnemigo--
            spanVidasEnemigo.innerHTML=victoriasEnemigo
        }else if(ataqueJugador[index]=='FUEGO'&&ataqueEnemigo[index]=='TIERRA'){
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            vidasJugador++
            victoriasJugador=vidasJugador+n
            poderMokeponJugador--
            spanVidasJugador.innerHTML=victoriasJugador
        }else if(ataqueJugador[index]=='AGUA'&&ataqueEnemigo[index]=='FUEGO'){
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            vidasJugador++
            victoriasJugador=vidasJugador+n
            poderMokeponJugador--
            spanVidasJugador.innerHTML=victoriasJugador
        }else if(ataqueJugador[index]=='AGUA'&&ataqueEnemigo[index]=='TIERRA'){
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            vidasEnemigo++
            victoriasEnemigo=vidasEnemigo++
            poderMokeponEnemigo--
            spanVidasEnemigo.innerHTML=victoriasEnemigo
        }else if(ataqueJugador[index]=='TIERRA'&&ataqueEnemigo[index]=='FUEGO'){
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            vidasEnemigo++
            victoriasEnemigo=vidasEnemigo++
            poderMokeponEnemigo--
            spanVidasEnemigo.innerHTML=victoriasEnemigo
        }else if(ataqueJugador[index]=='TIERRA'&&ataqueEnemigo[index]=='AGUA'){
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            vidasJugador++
            victoriasJugador=vidasJugador+n
            poderMokeponJugador--
            spanVidasJugador.innerHTML=victoriasJugador
        }
    }
else if(b>0){
    if(ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponente(index, index)
        crearMensaje("EMPATE")
    }else if(ataqueJugador[index]=='FUEGO'&&ataqueEnemigo[index]=='AGUA'){
        indexAmbosOponente(index, index)
        crearMensaje("PERDISTE")
        vidasEnemigo++
        victoriasEnemigo=vidasEnemigo+n
        poderMokeponEnemigo--
        spanVidasEnemigo.innerHTML=victoriasEnemigo
    }else if(ataqueJugador[index]=='FUEGO'&&ataqueEnemigo[index]=='TIERRA'){
        indexAmbosOponente(index, index)
        crearMensaje("GANASTE")
        vidasJugador++
        victoriasJugador=vidasJugador++
        poderMokeponJugador--
        spanVidasJugador.innerHTML=victoriasJugador
    }else if(ataqueJugador[index]=='AGUA'&&ataqueEnemigo[index]=='FUEGO'){
        indexAmbosOponente(index, index)
        crearMensaje("GANASTE")
        vidasJugador++
        victoriasJugador=vidasJugador++
        poderMokeponJugador--
        spanVidasJugador.innerHTML=victoriasJugador
    }else if(ataqueJugador[index]=='AGUA'&&ataqueEnemigo[index]=='TIERRA'){
        indexAmbosOponente(index, index)
        crearMensaje("PERDISTE")
        vidasEnemigo++
        victoriasEnemigo=vidasEnemigo+n
        poderMokeponEnemigo--
        spanVidasEnemigo.innerHTML=victoriasEnemigo
    }else if(ataqueJugador[index]=='TIERRA'&&ataqueEnemigo[index]=='FUEGO'){
        indexAmbosOponente(index, index)
        crearMensaje("PERDISTE")
        vidasEnemigo++
        victoriasEnemigo=vidasEnemigo+n
        poderMokeponEnemigo--
        spanVidasEnemigo.innerHTML=victoriasEnemigo
    }else if(ataqueJugador[index]=='TIERRA'&&ataqueEnemigo[index]=='AGUA'){
        indexAmbosOponente(index, index)
        crearMensaje("GANASTE")
        vidasJugador++
        victoriasJugador=vidasJugador++
        poderMokeponJugador--
        spanVidasJugador.innerHTML=victoriasJugador
    }
}
else{
    if(ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponente(index, index)
        crearMensaje("EMPATE")
    }else if(ataqueJugador[index]=='FUEGO'&&ataqueEnemigo[index]=='AGUA'){
        indexAmbosOponente(index, index)
        crearMensaje("PERDISTE")
        vidasEnemigo++
        victoriasEnemigo=vidasEnemigo++
        poderMokeponEnemigo--
        spanVidasEnemigo.innerHTML=victoriasEnemigo
    }else if(ataqueJugador[index]=='FUEGO'&&ataqueEnemigo[index]=='TIERRA'){
        indexAmbosOponente(index, index)
        crearMensaje("GANASTE")
        vidasJugador++
        victoriasJugador=vidasJugador
        poderMokeponJugador--
        spanVidasJugador.innerHTML=victoriasJugador
    }else if(ataqueJugador[index]=='AGUA'&&ataqueEnemigo[index]=='FUEGO'){
        indexAmbosOponente(index, index)
        crearMensaje("GANASTE")
        vidasJugador++
        victoriasJugador=vidasJugador++
        poderMokeponJugador--
        spanVidasJugador.innerHTML=victoriasJugador
    }else if(ataqueJugador[index]=='AGUA'&&ataqueEnemigo[index]=='TIERRA'){
        indexAmbosOponente(index, index)
        crearMensaje("PERDISTE")
        vidasEnemigo++
        victoriasEnemigo=vidasEnemigo++
        poderMokeponEnemigo--
        spanVidasEnemigo.innerHTML=victoriasEnemigo
    }else if(ataqueJugador[index]=='TIERRA'&&ataqueEnemigo[index]=='FUEGO'){
        indexAmbosOponente(index, index)
        crearMensaje("PERDISTE")
        vidasEnemigo++
        victoriasEnemigo=vidasEnemigo++
        poderMokeponEnemigo--
        spanVidasEnemigo.innerHTML=victoriasEnemigo
    }else if(ataqueJugador[index]=='TIERRA'&&ataqueEnemigo[index]=='AGUA'){
        indexAmbosOponente(index, index)
        crearMensaje("GANASTE")
        vidasJugador++
        victoriasJugador=vidasJugador++
        poderMokeponJugador--
        spanVidasJugador.innerHTML=victoriasJugador
    }

}}
console.log(victoriasEnemigo, victoriasJugador)
    console.log(vidasEnemigo, vidasJugador)
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
aumentarVidas()

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
let a=Math.min(poderMokeponEnemigo,poderMokeponJugador)


if(ataqueJugador.length===a){
    
   combate()
}
}

function aumentarVidas(){
    let n=Math.abs(poderMokeponEnemigo-poderMokeponJugador)
    let b=poderMokeponEnemigo-poderMokeponJugador
   
    if(b>0){
        vidasEnemigo=vidasEnemigo+n
        }else if(b<0){
        vidasJugador=vidasJugador+n
        } 
}

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
   capipepoEnemigo.pintar()
   bolbasorEnemigo.pintar()
   hipodogeEnemigo.pintar()
   picacuEnemigo.pintar()
   ratigueyaEnemigo.pintar()

   if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
    revisarColision(picacuEnemigo)
    revisarColision(bolbasorEnemigo)
}
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
    mapa.width=500
    mapa.height=350
    
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
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)