class ProjeltileEnemy {


    constructor(enemiesX, enemiesY) {

        this.x = enemiesX
        this.y = enemiesY
        this.w = 50
        this.h = 50
        this.speed = 5;

        this.img = new Image()
        this.img.src = "Images/disparoizquierda.png"



}


    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }


    shoot = () => {
        this.x +=  this.speed;
    }
}