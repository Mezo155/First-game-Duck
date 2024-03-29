window.addEventListener("load", () => {
    const container = document.querySelector(".board-container");
    const game = new Game(container);
    const buttonStart = document.querySelector("#start-button");
    const startContainer = document.querySelector(".start-container");
    buttonStart.addEventListener("click", () => {
        setTimeout(() => {
            startContainer.remove();
            game.start();
        }, 3000);
        
        game.startSound();
    });

});

