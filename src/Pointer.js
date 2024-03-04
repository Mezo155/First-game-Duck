class Pointer {
  constructor(container, color, game) {
    this.container = container;
    this.height = 70;
    this.width = 70;
    this.color = color;
    this.img = "url(./assets/img/Punto2.png)";
    this.lives = 3;

    this.element = document.createElement("div");
    this.element.style.background = this.img;
    this.element.style.position = "absolute";
    this.element.style.backgroundSize = "cover";
    

    this.setListenner();

    this.game = game;
  }
  draw() {
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";

    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";

    this.container.appendChild(this.element);
  }

  setListenner() {
    const leftSpacing = this.container.getBoundingClientRect().left;
    const topSpacing = this.container.getBoundingClientRect().top;
    this.container.addEventListener("mousemove", (e) => {
      const divHeight = this.container.offsetHeight;
      const floorLimit = 100;
      this.x = e.clientX - 35 - leftSpacing;
      this.y = e.clientY - 35 - topSpacing;
      if (this.y > divHeight - floorLimit) {
        this.y = divHeight - floorLimit;
      }
    });
    this.container.addEventListener("mousedown", (a) => {
        if(a.button === 0){
          this.game.checkImpacts({
            x: a.x - leftSpacing,
            y: a.y - topSpacing,
          });
        }
      });
  }

  update() {
    this.draw();
  }
}
