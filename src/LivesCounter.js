class LivesCounter {
    constructor(container, lives) {
        this.container = container;
        this.lives = lives;

        this.element = document.createElement("p");
        this.element.style.position = "absolute";
        this.element.style.color = "red";
        this.element.style.left = "20px";
        this.element.style.top = "5px";
        this.element.style.fontSize = "20px";
        this.element.style.fontWeight = "bold";

    }
    draw(){
        this.element.textContent = `Lifes ${this.lives}`;
        this.container.appendChild(this.element);
    }
    update(){
        this.draw();
    }
}