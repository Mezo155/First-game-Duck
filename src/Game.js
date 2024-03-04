class Game {
    constructor(container) {
        this.container = container;
        this.pointer = new Pointer(this.container, "black", this);
        this.enemies = []
        this.enemies.push(new Enemy(this.container));
        this.tickEnemy = 0
        this.thickEnemyFrecuency = 50;
        this.isOver = false
        this.liveCounter = new LivesCounter(this.container, this.pointer.lives);
        this.paused = false;
        this.handlePause = this.handlePause.bind(this);
        this.continue = this.continue.bind(this);
        this.gameStarted = false
        this.score = 0;
        this.scoreCounter = new ScoreCounter(this.container, this.score);
        
        this.timeElement = document.createElement("div");
        this.timeElement.classList.add("time-counter");
        this.container.appendChild(this.timeElement);
        this.timeLeft = 60;
        
        
        
        document.addEventListener("keydown", this.handlePause.bind(this));
    }

    start(){
        if (!this.gameStarted){
            this.gameStarted = true;
        }
        
        const endTime = Date.now() + this.timeLeft * 1000;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const timeLeft = Math.max(0, Math.ceil((endTime - currentTime) / 1000));
            this.timeLeft = timeLeft;
            this.updateTime(timeLeft);
            
            
        if(timeLeft === 0){
            this.isOver = true;
                window.clearInterval(this.intervalId);
                this.gameOver();
                this.container.style.cursor = "pointer";
                this.gameOverSound();
                
        } else {
            this.tickEnemy++
        
            this.enemies.forEach((enemy) => {
                if (timeLeft <= 50 && timeLeft > 40) {
                    enemy.vx = 7.5;
                
                } else if (timeLeft <= 40 && timeLeft > 30) {
                    enemy.vx = 10;
            
                } else if (timeLeft <= 30 && timeLeft > 20){
                    enemy.vx = 12.5;
                } else if (timeLeft <= 20){
                    enemy.vx = 15;
                } else {
                    enemy.vx = 5;
                }
                    
                
                    
                
                if (enemy.vy > 0) {
                    enemy.vx = 0;
                }
                
            });

            if (this.tickEnemy % this.thickEnemyFrecuency === 0){
                this.enemies.push(new Enemy(this.container));
            }
            
            this.update();
            this.cleanup();
            }
        }, 1000 / 36);
        
        
    }
    

    
    updateTime(seconds) {
        this.timeElement.textContent = `Ends in: ${seconds} S`;
    }
    cleanup() {
        
        const filteredEnemies = this.enemies.filter((enemy) =>{
            return enemy.x < this.container.offsetWidth && enemy.y < this.container.offsetHeight; 
        })
        this.enemies = filteredEnemies
        
    }

    update (){
        this.pointer.update()
        this.enemies.forEach((enemy) => {
        enemy.update();
        });
        this.liveCounter.update()
        this.scoreCounter.update()

    }
    gameOver(){
        const gameOverContainer = document.createElement("div");
        gameOverContainer.classList.add("game-over-container");
        const gameOverImg = document.createElement("img");
        gameOverImg.src = "./assets/img/gameOver.png";

        const restartButton = document.createElement("button");
        restartButton.classList.add("button");
        restartButton.textContent = "Restart";

        restartButton.addEventListener("click", () => {
            this.restartSound();
            setTimeout(() => {
                location.reload();
            }, 1000);
            });

        gameOverContainer.appendChild(restartButton);
        gameOverContainer.appendChild(gameOverImg);
        this.container.appendChild(gameOverContainer);
    }
    
    checkImpacts(pointerCoords) {
        if (!this.isOver && this.gameStarted) {
            const collisionEnemy = this.enemies.find(enemy => enemy.isImpact(pointerCoords));
            if (collisionEnemy) {
                this.collisionSound();
                collisionEnemy.vy = 10;
                this.playFallSound();
                
                collisionEnemy.vx = 0;
                collisionEnemy.choque();
                this.score++;
                this.scoreCounter.score = this.score;
            
            } else if (this.liveCounter.lives > 0){
                this.liveCounter.lives--
                this.Failed();
            } else {
                this.isOver = true;
                window.clearInterval(this.intervalId);
                this.gameOver();
                this.container.style.cursor = "pointer";
                this.gameOverSound();
                
            }
    
        }
    
    }
    playFallSound(){
        const playFallSound = document.getElementById("playFallSound")
        if(playFallSound){
            playFallSound.currentTime = 0;
            playFallSound.play();

            setTimeout(() => {
                playFallSound.pause();
                playFallSound.currentTime = 0;
            }, 600);
        }
    }
    restartSound(){
        const restartSound = document.getElementById("restartSound")
        if(restartSound){
            restartSound.currentTime = 0;
            restartSound.play();
        }
    }
    gameOverSound(){
        const gameOverSound = document.getElementById("gameOverSound")
        if(gameOverSound){
            gameOverSound.currentTime = 0;
            gameOverSound.play();
        }
    }
    Failed(){
        const Failed = document.getElementById("Failed")
        if(Failed){
            Failed.currentTime = 0;
            Failed.play();
        }
    }
    startSound() {
        const startSound = document.getElementById("startSound");
        if (startSound) {
            startSound.currentTime = 0;
            startSound.play();
        }
    }
    collisionSound(){
        const collisionSound = document.getElementById("collisionSound");
        if (collisionSound) {
            collisionSound.currentTime = 0;
            collisionSound.play();
    }
}

    playPauseSound(){
        const pauseSound = document.getElementById("pauseSound");
        if(pauseSound){
            pauseSound.currentTime = 0;
            pauseSound.play()
        }
    }
    handlePause(event){
        if (event.key === "p" || event.key === "P"){
            this.paused = !this.paused;
        } 
        if (this.paused){
            clearInterval(this.intervalId)
        } else {
            this.start()
        }
    this.playPauseSound();
    }
    pause(){
        clearInterval(this.intervalId);
        this.enemies.forEach((enemy) => {
            enemy.pause();
        
    });
    this.timeLeft.pause();
}
    continue(){
        const remainingTime = this.timeLeft; 
    const endTime = Date.now() + remainingTime * 1000;
        this.intervalId = setInterval(() => {
        
            this.tickEnemy++
        
            
            if (this.tickEnemy % this.thickEnemyFrecuency === 0){
                this.enemies.push(new Enemy(this.container));
            }
            this.update()
            this.cleanup()
        }, 1000 / 36)
        this.enemies.forEach((enemy) => {
            enemy.continue();
        
    }); 
    this.timeLeft.continue();
    }


} 
