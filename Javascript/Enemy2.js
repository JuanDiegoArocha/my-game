class Enemy2 {


    constructor() {

        this.img = new Image()
        this.img.src = "Images/Tai-lung-kick.png"
        this.x = 1800
        this.y = 600
        this.w = 450
        this.h = 300
        this.speed = 1.2



    }


    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    move = () => {
        this.x -= this.speed
    }
}



