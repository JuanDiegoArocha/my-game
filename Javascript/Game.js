class Game {

    constructor() {

        this.background = new Image()
        this.background.src = "Images/background.jpg";



        //* Po
        this.po = new Po()

        //* Enemy
        this.enemies = []


        //* Enemy 2
        this.enemies2 = []

        
        
    }











    drawBackground = () => {
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height)
    }

    clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }


    spawnEnemies() {
     
        setInterval(() => {
            const newEnemy = new Enemy();
            this.enemies.push(newEnemy);
            this.spawnEnemies();

        }, 3000)
        
    }  

    spawnEnemies2() {

        setInterval(() => {
        const newEnemy = new Enemy2();
        this.enemies2.push(newEnemy);
        this.spawnEnemies2()
    }, 3000)
}


    
    checkCollision = () => {
        // colisiones de los enemigos al tocar a po
        for (let i = 0; i < this.enemies.length; i++) {
            const eachEnemy = this.enemies[i]
            if (
                this.po.x < eachEnemy.x + eachEnemy.w &&
                this.po.x + this.po.w > eachEnemy.x &&
                this.po.y < eachEnemy.y + eachEnemy.h &&
                this.po.y + this.po.h > eachEnemy.y
            ) {
                console.log("colision")
            }
        }
    }

    checkCollision2 = () => {
        for (let i = 0; i < this.enemies2.length; i++) {
            const eachEnemy = this.enemies2[i]
            if ( 
                this.po.x < eachEnemy.x + eachEnemy.w &&
                this.po.x + this.po.w > eachEnemy.x &&
                this.po.y < eachEnemy.y + eachEnemy.h &&
                this.po.y + this.po.h > eachEnemy.y
            ){
                console.log("colision2")
            }
        }
    }

    gameLoop = () => {
        // console.log("Ejecutando recursion del juego")


        // 1. Limpieza del canvas
        this.clearCanvas()

        // 2. Acciones y movimientos de los elementos
        this.po.movement()
        this.enemies.forEach((eachEnemy) => {eachEnemy.move()})
        this.enemies2.forEach((eachEnemy) =>{eachEnemy.move()})
       

        // console.log("Spawn enemies") 
        this.checkCollision()
        this.checkCollision2()
        // 3. Dibujado de los elementos //! QUE ESTEN EN ORDEN
        this.drawBackground()
        this.po.draw()
        this.enemies.forEach((eachEnemy) => {eachEnemy.draw()})
        this.enemies2.forEach((eachEnemy) => {eachEnemy.draw()})


        // 4. Recursion
        requestAnimationFrame(this.gameLoop)

    }
}

