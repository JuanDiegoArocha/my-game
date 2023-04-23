class Po {
  constructor() {
    this.img = new Image();
    this.img.src = "Images/PO.png"; // Normal
    this.x = 800;
    this.y = 600;
    this.w = 300;
    this.h = 300;

    this.speed = 10;
    this.direction = 1;
    this.crouch = false;
    this.crouchImg = new Image();
    this.crouchImg.src = "Images/po-down.png"; // Agachado
    this.leftAttack = false;
    this.leftAttackImg = new Image();
    this.leftAttackImg.src = "Images/po-punch.png"; // Golpe izquierdo
    this.rightAttack = false;
    this.rightAttackImg = new Image();
    this.rightAttackImg.src = "Images/po-punchsinfondo.png"; // Golpe derecho
    this.Attacking = false;
    this.AttackingTime = 0;
  }

  draw = () => {
    if (this.leftAttack) {
      ctx.drawImage(this.leftAttackImg, this.x, this.y, this.w, this.h);
      return; // Po no se puede mover mientras ataca
    } else if (this.rightAttack) {
      ctx.drawImage(this.rightAttackImg, this.x, this.y, this.w, this.h);
      return; // Po no se puede mover mientras ataca
    } else if (this.crouch) {
      ctx.drawImage(this.crouchImg, this.x, this.y + 100, this.w, this.h);
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
  };

  movement = () => {
    
    // Si Po no esta atacando, puede moverse
    if (!this.Attacking) {
      // Si presionas la flecha izquierda Po se mueve a la izquierda

      if (keys["ArrowLeft"]) {
        this.x -= this.speed;
        this.direction = -1;
      }

      // Si presionas la flecha derecha Po se mueve a la derecha
      else if (keys["ArrowRight"]) {
        this.x += this.speed;
        this.direction = 1;
      }
      // Si presionas la flecha de abajo, se agacha Po
      if (keys["ArrowDown"]) {
        this.crouch = true;
      } else {
        this.crouch = false;
      }

      // Si presionas la flecha izquierda y la tecla Space, haces el ataque hacia la izquierda
      if (keys["ArrowLeft"] && keys["Space"]) {
        this.leftAttack = true;
        this.Attacking = true; // Po esta lanzando el ataque
      } else {
        setTimeout(() => {
          this.leftAttack = false;
          this.Attacking = false; // Po ya no esta lanzando el ataque
        }, 1000); // Po debe esperar 1 segundo entre cada ataque
      }

      // Si presionas la flecha derecha y la tecla Space, haces el ataque hacia la derecha
      if (keys["ArrowRight"] && keys["Space"]) {
        this.rightAttack = true;
        this.Attacking = true; // Po esta lanzando el ataque
      } else {
        setTimeout(() => {
          this.rightAttack = false;
          this.Attacking = false; // Po ya no esta lanzando el ataque
        }, 1000); // Po debe esperar 1 segundo entre cada ataque
      }

      if (this.x > canvas.width - this.w) {
        this.x = canvas.width - this.w;
      } else if (this.x < 0) {
        this.x = 0;
      }
    } 
  };
}

