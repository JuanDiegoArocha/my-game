class Projectile {

    constructor() {

        this.x = 800
        this.y = 100
        this.w = 50
        this.h = 50
        this.speed = 1;
        // this.direction = direction
        this.img = new Image()
        this.img.src = "Images/dumbling.png"

    }




    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }


    shoot = () => {
        this.x += this.direction + this.speed;
    }

}