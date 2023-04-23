class Game {

    constructor() {

        this.background = new Image()
        this.background.src = "Images/background.jpg";



        //* Po
        this.po = new Po()

        //* Enemy
        this.enemy = new Enemy()

        //* Enemy 2
        this.enemy2 = new Enemy2()
    }











    drawBackground = () => {
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height)
    }







    gameLoop = () => {
        // console.log("Ejecutando recursion del juego")


        // 1. Limpieza del canvas
        

        // 2. Acciones y movimientos de los elementos
        this.po.movement()
        

        // 3. Dibujado de los elementos //! QUE ESTEN EN ORDEN
        this.drawBackground()
        this.po.draw()
        this.enemy.draw()
        this.enemy2.draw()


        // 4. Recursion
        requestAnimationFrame(this.gameLoop)

    }
}


