class ProjectileLeft {

    constructor(PoX, PoY) {

        this.x = PoX
        this.y = PoY
        this.w = 50
        this.h = 50
        this.speed = 2;
        // this.direction = direction
        this.img = new Image()
        this.img.src = "Images/dumbling.png"

    }




    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }


    shoot = () => {
        this.x -=  this.speed;
    }

}