class Game {
  constructor() {
    this.background = new Image();
    this.background.src = "Images/background.jpg";

    this.isGameOn = true;


    //* Po
    this.po = new Po();

    //* Enemy
    this.enemies = [];

    //* Enemy 2
    this.enemies2 = [];

    //* Disparo izquierda
    this.projectileLeft = [];

    //* Disparo derecha
    this.projectileRight = [];
  }

  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  spawnEnemies() {
    setInterval(() => {
      const newEnemy = new Enemy();
      this.enemies.push(newEnemy);
      this.spawnEnemies();
    }, 3500);
  }

  spawnEnemies2() {
    setInterval(() => {
      const newEnemy = new Enemy2();
      this.enemies2.push(newEnemy);
      this.spawnEnemies2();
    }, 3500);
  }

  checkCollision = () => {
    // colisiones de los enemigos al tocar a po
    for (let i = 0; i < this.enemies.length; i++) {
      const eachEnemy = this.enemies[i];
      if (
        this.po.x < eachEnemy.x + eachEnemy.w &&
        this.po.x + this.po.w > eachEnemy.x &&
        this.po.y < eachEnemy.y + eachEnemy.h &&
        this.po.y + this.po.h > eachEnemy.y
      ) {
        console.log("colision");
        this.gameOver()
      }
    }
  };

  checkCollision2 = () => {
    for (let i = 0; i < this.enemies2.length; i++) {
      const eachEnemy = this.enemies2[i];
      if (
        this.po.x < eachEnemy.x + eachEnemy.w &&
        this.po.x + this.po.w > eachEnemy.x &&
        this.po.y < eachEnemy.y + eachEnemy.h &&
        this.po.y + this.po.h > eachEnemy.y
      ) {
        console.log("colision2");
        this.gameOver()
      }
    }
  };


  gameOver = () => {
    // 1. Detener el juego
    this.isGameOn = false;

    // 2. Ocultar el canvas
    canvas.style.display = "none"

    // 3. Final Screen
    gameoverScreenDOM.style.display = "flex"
  }



  shootingLeft = () => {
    let newShootingLeft = new ProjectileLeft(this.po.x, this.po.y);
    this.projectileLeft.push(newShootingLeft);
  };

  shootingRight = () => {
    let newShootingRight = new ProjectileRight(this.po.x, this.po.y);
    this.projectileRight.push(newShootingRight);
  };

  shootingLeftCollision = () => {
    for (let i = 0; i < this.projectileLeft.length; i++) {
        const eachProjectileLeft = this.projectileLeft[i];
        for (let j = 0; j < this.enemies.length; j++) {
          const eachEnemy = this.enemies[j];
          if (
            eachProjectileLeft.x < eachEnemy.x + eachEnemy.w &&
            eachProjectileLeft.x + eachProjectileLeft.w > eachEnemy.x &&
            eachProjectileLeft.y < eachEnemy.y + eachEnemy.h &&
            eachProjectileLeft.y + eachProjectileLeft.h > eachEnemy.y
          ) {
            // Eliminar el enemigo del array
            this.enemies.splice(j, 1);
            // Eliminar el proyectil del array
            this.projectileLeft.splice(i, 1);
            console.log("LeftColision")
          }
        }
      }
    };

  shootingRightCollision = () => {
    for (let i = 0; i < this.projectileRight.length; i++) {
        const eachProjectileRight = this.projectileRight[i];
        for (let j = 0; j < this.enemies2.length; j++) {
          const eachEnemy = this.enemies2[j];
          if (
            eachProjectileRight.x < eachEnemy.x + eachEnemy.w &&
            eachProjectileRight.x + eachProjectileRight.w > eachEnemy.x &&
            eachProjectileRight.y < eachEnemy.y + eachEnemy.h &&
            eachProjectileRight.y + eachProjectileRight.h > eachEnemy.y
          ) {
            // Eliminar el enemigo del array
            this.enemies2.splice(j, 1);
            // Eliminar el proyectil del array
            this.projectileRight.splice(i, 1);
            console.log("RightColision")
          }
        }
      }
    };


  gameLoop = () => {
    // console.log("Ejecutando recursion del juego")

    // 1. Limpieza del canvas
    this.clearCanvas();

    // 2. Acciones y movimientos de los elementos
    this.po.movement();
    this.enemies.forEach((eachEnemy) => {
      eachEnemy.move();
    });
    this.enemies2.forEach((eachEnemy) => {
      eachEnemy.move();
    });
    this.projectileLeft.forEach((eachProjectileLeft) => {
      eachProjectileLeft.shoot();
    });
    this.projectileRight.forEach((eachProjectileRight) => {
        eachProjectileRight.shoot();
      });

    // console.log("Spawn enemies")
    this.checkCollision();
    this.checkCollision2();
    this.shootingLeftCollision()
    this.shootingRightCollision()
    // 3. Dibujado de los elementos //! QUE ESTEN EN ORDEN
    this.drawBackground();
    this.po.draw();
    this.enemies.forEach((eachEnemy) => {
      eachEnemy.draw();
    });
    this.enemies2.forEach((eachEnemy) => {
      eachEnemy.draw();
    });
    this.projectileLeft.forEach((eachProjectileLeft) => {
      eachProjectileLeft.draw();
    });
    this.projectileRight.forEach((eachProjectileRight) => {
        eachProjectileRight.draw();
      });

    // 4. Recursion
    if (this.isGameOn === true) {
    requestAnimationFrame(this.gameLoop);
    }
  };
}

