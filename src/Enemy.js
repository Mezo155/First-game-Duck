class Enemy {
    constructor(container){
        this.container = container;
        this.height = 80;
        this.width = 80;
        this.color = "transparent";
        this.x = -this.width;
        this.vx = 5;
        this.y = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
        this.vy = 0;
        this.maxHeight = 355
        this.spriteImages = [
            "./assets/img/pato-volando-1.png",
            "./assets/img/pato-volando-2.png",
            "./assets/img/pato-volando-3.png"
        ];
        this.currentFrame = 0
        this.collisionSprite = "./assets/img/Die.png";
        this.element = document.createElement("div");
        this.start();
        
    }

    start(){
        this.intevalId = setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.spriteImages.length;
        }, 100);
    }

    draw(){
        this.element.style.height = this.height + "px";
        this.element.style.width = this.width + "px";
        this.element.style.background = this.color;

        this.element.style.position = "absolute";
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
        if (this.duckDie){
            this.element.style.backgroundImage = `url(./assets/img/Die.png)`;
        } else {
            this.element.style.backgroundImage = `url('${this.spriteImages[this.currentFrame]}')`;
    }
        
        this.element.style.backgroundSize = "cover";

        this.container.appendChild(this.element);
    } 
    move(){
        this.x += this.vx;
        this.y += this.vy;
        if (this.vy === 10 && this.y > this.maxHeight){
            this.element.style.display = "none";
            
        }
    }
    update(){
        this.move();
        this.draw();
        
        
    }
    isImpact(pointerkCoords) {
        return pointerkCoords.x < this.x + this.width &&
            pointerkCoords.x > this.x &&
            pointerkCoords.y < this.y + this.height &&
            pointerkCoords.y > this.y;
    }
    choque(){
        this.duckDie = true
    }
    
}