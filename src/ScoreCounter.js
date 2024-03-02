class ScoreCounter {
    constructor(container, score) {
        this.container = container;
        this.score = score;

        this.element = document.createElement("p");
        this.element.style.position = "absolute";
        this.element.style.color = "black";
        this.element.style.right = "20px";
        this.element.style.top = "5px";
        this.element.style.fontSize = "20px";
        this.element.style.fontWeight = "bold";
    }
    draw(){
        this.element.textContent = `Puntos ${this.score}`;
        this.container.appendChild(this.element);
    }
    update(){
        this.draw();
    }
}