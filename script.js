let palabraAleatoria

let time = 10

let score = 0


async function randomWords() {
    await getDatos()
    addToDOM(palabraAleatoria)
}

randomWords()

function addToDOM(palabra) {
    document.querySelector("#randomWord").innerHTML = palabra
}


document.querySelector("input").addEventListener("keydown", function (e) {
    let palabraIngresada = e.target.value
    if (palabraIngresada == palabraAleatoria) {
        time += 3
        e.target.value = ""
        randomWords();
        addToDOM(palabraAleatoria)
        updateScore()
    }
})

// MANEJA EL TIMER DEL JUEGO, SI LA PALABRA INGRESADA ES LA MISMA QUE LA RANDOM, EL JUEGO TE DA 3 SEGUNDOS EXTRAS 

let timeInterval = setInterval(actualizarTiempo, 1000)

let timeSpan = document.querySelector("#timeSpan")

function actualizarTiempo() {
    time--
    timeSpan.innerHTML = time

    if (time === 0) {
        clearInterval(timeInterval)
        gameOver()
    }
}

let scoreSpan = document.querySelector("#score")

function updateScore() {
    score++
    scoreSpan.innerHTML = score
}

function gameOver() {
    let child = `<div class="mx-auto">
    <h2 class="text-red-500">Perdiste</h2> 
    <p class="text-white">Tu puntaje es ${score}</p>
    <div class="flex justify-center">
      <button onclick="location.reload()" class="relative inline-flex items-center justify-center my-5 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg colors boton group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Volvé a empezar</span>
      </button>
    </div>
  </div>`
    document.getElementById('end-game-container').innerHTML = child
    document.getElementById('text').setAttribute('disabled', '')
}


let h2 = document.querySelector('h2')
let data

async function getDatos(){
    try{
    let urlApi = 'https://random-word-api.herokuapp.com/word'
    data = await fetch(urlApi)
    let res = await data.json()
    palabraAleatoria = res[0];
    console.log(res);
    }catch(error){
        console.log(error);
    }
} 
