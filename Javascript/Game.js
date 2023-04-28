class Game {
  constructor() {
    this.background = new Image();
    this.background.src = "Images/background.jpg";

    this.isGameOn = true;

    //* Po
    this.po = new Po();

    //* Enemy
    this.enemies = [];
    this.enemyProjectile = [];
    this.enemyShooting = true;

    //* Enemy 2
    this.enemies2 = [];
    this.enemyProjectile2 = [];
    this.enemyShooting2 = true;

    //* Disparo izquierda
    this.projectileLeft = [];
    this.shootLeft = true;

    //* Disparo derecha
    this.projectileRight = [];
    this.shootRight = true;

    this.score = 0;
    
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
      this.enemyShoot(newEnemy)
      
    }, 2500);
  }

  spawnEnemies2() {
    setInterval(() => {
      const newEnemy = new Enemy2();
      this.enemies2.push(newEnemy);
      this.enemyShoot2(newEnemy)

    }, 2500);
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
        this.gameOver();
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
        this.gameOver();
      }
    }
  };

  gameOver = () => {
    // 1. Detener el juego
    this.isGameOn = false;

    // 2. Ocultar el canvas
    canvas.style.display = "none";

    // 3. Final Screen
    gameoverScreenDOM.style.display = "flex";
  };

  shootingLeft = () => {
    if (this.shootLeft) {
      let newShootingLeft = new ProjectileLeft(this.po.x, this.po.y);
      this.projectileLeft.push(newShootingLeft);
      this.shootLeft = false;
      setTimeout(() => {
        this.shootLeft = true;
      }, 2500);
    }
  };

  shootingRight = () => {
    if (this.shootRight) {
      let newShootingRight = new ProjectileRight(this.po.x, this.po.y);
      this.projectileRight.push(newShootingRight);
      this.shootRight = false;
      setTimeout(() => {
        this.shootRight = true;
      }, 2500);
    }
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
          console.log("LeftColision");

          // Score
          this.score += 1;
          this.drawScore()
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
          console.log("RightColision");

          // Score
          this.score += 1;
          this.drawScore()
        }
      }
    }
  };


  drawScore = () => {
    ctx.font = "100px Segoe UI"
    ctx.fillText(Math.floor(this.score), 900, 100)
  }


  enemyShoot = (enemy) => {
    const newEnemyProjectile = new ProjectileEnemy(enemy.x, enemy.y)
    this.enemyProjectile.push(newEnemyProjectile)
  }

  enemyShoot2 = (enemy2) => {
    const newEnemyProjectile2 = new ProjectileEnemy2(enemy2.x, enemy2.y)
    this.enemyProjectile2.push(newEnemyProjectile2)
  }

  checkEnemyProjectileCollision = () => {
    for (let i = 0; i < this.enemyProjectile.length; i++) {
      const eachProjectile = this.enemyProjectile[i];
      if (
        this.po.x < eachProjectile.x + eachProjectile.w &&
        this.po.x + this.po.w > eachProjectile.x &&
        this.po.y < eachProjectile.y + eachProjectile.h &&
        this.po.y + this.po.h > eachProjectile.y && 
        !this.po.crouch
      ) {
        console.log("enemyProjectileCollision");
        this.enemyProjectile.splice(i, 1)
        this.score -= 1;
        this.drawScore()
      }
    }
  };

  checkEnemyProjectileCollision2 = () => {
    for (let i = 0; i < this.enemyProjectile2.length; i++) {
      const eachProjectile2 = this.enemyProjectile2[i];
      if (
        this.po.x < eachProjectile2.x + eachProjectile2.w &&
        this.po.x + this.po.w > eachProjectile2.x &&
        this.po.y < eachProjectile2.y + eachProjectile2.h &&
        this.po.y + this.po.h > eachProjectile2.y && 
        !this.po.jump 
      ) {
        console.log("enemyProjectileCollision");
  
        this.enemyProjectile2.splice(i, 1)
        this.score -= 1;
        this.drawScore()
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
    this.enemyProjectile.forEach((eachEnemyProjectile) => {
      eachEnemyProjectile.shoot();
    })
    this.enemyProjectile2.forEach((eachEnemyProjectile2) => {
      eachEnemyProjectile2.shoot();
    })
    // this.po.jumpAction()

    

    // console.log("Spawn enemies")
    this.checkCollision();
    this.checkCollision2();
    this.shootingLeftCollision();
    this.shootingRightCollision();
    this.checkEnemyProjectileCollision();
    this.checkEnemyProjectileCollision2()
    // console.log(this.projectileRight.length, this.projectileLeft.length)
    // 3. Dibujado de los elementos //! QUE ESTEN EN ORDEN
    this.drawBackground();
    this.po.draw();
    this.enemies.forEach((eachEnemy) => {
      eachEnemy.draw();
    });
    this.enemyProjectile.forEach((eachEnemyProjectile) => {
      eachEnemyProjectile.draw();
    })
    this.enemies2.forEach((eachEnemy) => {
      eachEnemy.draw();
    });
    this.enemyProjectile2.forEach((eachEnemyProjectile2) => {
      eachEnemyProjectile2.draw();
    })
    this.projectileLeft.forEach((eachProjectileLeft) => {
      eachProjectileLeft.draw();
    });
    this.projectileRight.forEach((eachProjectileRight) => {
      eachProjectileRight.draw();
    });


    this.drawScore()
    // 4. Recursion
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}

//! setTimeout en los ataques , boleano que cambie de verdadero a falso
