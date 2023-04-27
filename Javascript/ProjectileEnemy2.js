class ProjectileEnemy2 {

    constructor(enemies2X, enemies2Y) {
    
    this.x = enemies2X + 100
    this.y = enemies2Y + 250
    this.w = 50
    this.h = 50
    this.speed = 5;

    this.img = new Image()
    this.img.src = "Images/disparo.png"


}

draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
}


shoot = () => {
    this.x -=  this.speed;
}

}