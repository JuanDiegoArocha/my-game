//* GLOBAL VARIABLES

const splashScreenDOM = document.querySelector("#splash-screen")
const gameoverScreenDOM = document.querySelector("#gameover-screem")
const startBtnDOM = document.querySelector("#start-btn")
const restartBtnDOM = document.querySelector("#restart-btn")
const canvas = document.querySelector("#my-canvas")

const ctx = canvas.getContext("2d")




let gameObj;

let keys = {};
let spacePressed = false;









//* STATE MANAGEMENT FUNCTIONS


const startGame = () => {
    console.log("Iniciando juego")

    // 1. Cambiar las pantallas de juego
    splashScreenDOM.style.display = "none";
    canvas.style.display = "block";


    // 2. Crear los elementos del juego
    gameObj = new Game();
    console.log(gameObj)


    // 3. Iniciar el bucle del juego
    gameObj.gameLoop()
    



}


const restartGame = () => {

    gameoverScreenDOM.style.display = "none";
    canvas.style.display = "block";
    gameObj = new Game()
    gameObj.gameLoop()

}

















//* ADD EVENT LISTENERS

startBtnDOM.addEventListener("click", startGame)
restartBtnDOM.addEventListener("click", restartGame)
window.addEventListener("keydown", (event) => {
    keys[event.code] = true;
    if (event.code === "Space") {
        spacePressed = true;
    }
});
document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
    if (event.code === "Space") {
        spacePressed = false;
    }
})







//* BONUS