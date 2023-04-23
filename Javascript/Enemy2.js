class Enemy2 {


    constructor() {

        this.img = new Image()
        this.img.src = "Images/Tai-lung-kick.png"
        this.x = 1500
        this.y = 600
        this.w = 450
        this.h = 300



    }


    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}



