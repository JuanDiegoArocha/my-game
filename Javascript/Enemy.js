class Enemy {

    constructor(){

        this.img = new Image()
        this.img.src = "Images/tai-lung.png"
        this.x = -400;
        this.y = 600
        this.w = 450
        this.h = 300
        this.speed = 1.2
        

    
    }





    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    // los tubos se mueven hacia el pollito 
    move = () => {
        this.x += this.speed
    }

  
}
