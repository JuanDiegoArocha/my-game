//* GLOBAL VARIABLES

const splashScreenDOM = document.querySelector("#splash-screen")
const gameoverScreenDOM = document.querySelector("#gameover-screen")
const startBtnDOM = document.querySelector("#start-btn")
const restartBtnDOM = document.querySelector("#restart-btn")
const canvas = document.querySelector("#my-canvas")

const ctx = canvas.getContext("2d")
const audio = document.querySelector("#my-audio")

audio.currentTime = 0 // debe reiniciar la musica al principio
audio.volume = 0.1 // esto indica el nivel de volumen ahora esta en 20%



let gameObj;

let keys = {};
let jumpPressed = false;









//* STATE MANAGEMENT FUNCTIONS


const startGame = () => {
    console.log("Iniciando juego")

    // 1. Cambiar las pantallas de juego
    splashScreenDOM.style.display = "none";
    canvas.style.display = "block";
    pauseBtn.style.display = "block";
    
    
    // 2. Crear los elementos del juego
    gameObj = new Game();

    console.log(gameObj)
    audio.play()
    gameObj.spawnEnemies();
    gameObj.spawnEnemies2();
    // gameObj.shootingLeft();
    // gameObj.shootingRight();
    // 3. Iniciar el bucle del juego
    gameObj.gameLoop()

}


const restartGame = () => {

    gameoverScreenDOM.style.display = "none";
    canvas.style.display = "block";
    gameObj = new Game()
    gameObj.spawnEnemies();
    gameObj.spawnEnemies2();
    gameObj.gameLoop()

}

















//* ADD EVENT LISTENERS

startBtnDOM.addEventListener("click", startGame)
restartBtnDOM.addEventListener("click", restartGame)
window.addEventListener("keydown", (event) => {
    keys[event.code] = true;
    if (event.code === "ArrowUp") {
        // gameObj.jumpAction();
        jumpPressed = true;
    } else if (event.code === "KeyA") {
       gameObj.shootingLeft() 
    } else if (event.code === "KeyD") { 
        gameObj.shootingRight()
    }
    
});
document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
    if (event.code === "ArrowUp") {
        jumpPressed = false;
    }
})








//* BONUS
const pauseBtn = document.querySelector("#pause-btn")
pauseBtn.addEventListener("click", () => {
    if (gameObj !== undefined && gameObj.isGameOn === true) {
        gameObj.isGameOn = false;
    } else {
        gameObj.isGameOn = true;
        gameObj.gameLoop()
    }
})
