class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      230,
      500,
      32,
      32,
      "./Sprites/Hamsters/Hamster_spritesheet_sinfondo.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.seeds = []; //
    this.explosions = [];
    this.score = 0;
    this.scoreElement = document.getElementById("score");
    this.lives = 1;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
    this.seedsUpgrade = 10 * 4 // usado para resetear (y modificar dificultades si se deseara)
    this.seedsRegeneration = this.seedsUpgrade
    this.catsUpgrade = 10 * 5 // usado para resetear (y modificar dificultades si se deseara)
    this.catsRegeneration = this.catsUpgrade
    this.scapes = 0
    this.escapedCatsElement = document.getElementById("escaped-cats");

    this.music = new Audio("./Sprites/Music/audio.mp3")
    this.music.loop = true
    this.music.volume = 0.5

    this.soundEffect_horrible = new Audio("./Sprites/Music/horrible.mp3")
    this.soundEffect_horrible.loop = false
    this.soundEffect_horrible.volume = 0.5

    this.soundEffect_bad = new Audio("./Sprites/Music/bad.mp3")
    this.soundEffect_bad.loop = false
    this.soundEffect_bad.volume = 0.5

    this.soundEffect_nice = new Audio("./Sprites/Music/nice.mp3")
    this.soundEffect_nice.loop = false
    this.soundEffect_nice.volume = 0.5

  }

  start() {
    // Set the height and width of the game screen
    this.music.play()
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the start screen
    this.startScreen.style.display = "none";
    // Show the game screen
    this.gameScreen.style.display = "block";

    // Executes the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency)
  }

  gameLoop() {

    this.update();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId)
    }
  }

  update() {
    this.player.move();

    let catObstacles = this.obstacles.filter(obj => obj.classes && obj.classes.includes("gato"));
    // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
      catObstacles[i] = this.obstacles[i]

      // If the player's car collides with an obstacle
      if (this.player.didCollide(obstacle)) {

        this.explosions.push(new Explosion(this.gameScreen, this.player.left - this.player.width / 2, this.player.top));

        this.player.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        i--;

      } // If the obstacle is off the screen (at the bottom)
      else if (obstacle.top > this.height) {

        this.scapes++;
        this.updateEscapedCats();
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }

    }

    for (let i = 0; i < this.seeds.length; i++) {
      const seed = this.seeds[i];
      seed.move();

      catObstacles = this.obstacles.filter(obj => obj.classes && obj.classes.includes("gato"));

      // Check if the seed collides with a "cat" object
      for (let j = 0; j < catObstacles.length; j++) {
        let cat = catObstacles[j];


        if (seed.didCollide(cat)) {

          // Explosion
          this.explosions.push(new Explosion(this.gameScreen, cat.left, cat.top));

          // Remove the seed
          seed.remove();
          this.seeds.splice(i, 1);
          i--;

          // Remove the cat (obstacle)
          let catIndex = this.obstacles.indexOf(cat);
          if (catIndex !== -1) {
            cat.element.remove();
            this.obstacles.splice(catIndex, 1);
          }

          this.updateScore()

          break;
        }
      }

      if (seed.top < -32) {
        seed.element.remove();
        this.seeds.splice(i, 1);
        i--;
      }

    }

    if (this.lives === 0) {
      setTimeout(() => {
          this.endGame();
      }, 500);
  }

    if (this.scapes === 5) {
      this.endGame();
    }

    if (this.obstacles.length < 10000) {
      if (this.catsRegeneration <= 0) {

        this.obstacles.push(new Obstacle(this.gameScreen));
        this.catsRegeneration = Math.max(this.catsUpgrade - this.score/10 * 2, 30) // Adjust difficulty until 30

      } else {
        this.catsRegeneration = this.catsRegeneration - 1
      }
    }

    if (this.seeds.length < 10000) {
      if (this.seedsRegeneration <= 0) {

        this.seeds.push(new Seeds(this.gameScreen, this.player.top, this.player.left));
        this.seedsRegeneration = Math.max(this.seedsUpgrade - this.score/100 * 1.2, 30)  // Adjust difficult until 30
      } else {
        this.seedsRegeneration = this.seedsRegeneration - 1
      }

    }

  }

  updateScore() {
    this.score += 1;
    this.scoreElement.textContent = `Score: ${this.score}`;
  }

  updateEscapedCats() {

    if (this.escapedCatsElement) {
      this.escapedCatsElement.textContent = `Escaped Cats: ${this.scapes}`;
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach(function (obstacle) {
      obstacle.element.remove();
    });

    this.gameIsOver = true;

    let finalScoreElement = document.getElementById("final-score");
    if (finalScoreElement) {
        finalScoreElement.textContent = `Score: ${this.score}`;
    }

    this.music.pause()
    this.music.currentTime = 0

    if(this.score <= 10) {

      this.soundEffect_horrible.play()

    }else if (this.score > 10 && this.score < 20) {

      this.soundEffect_bad.play()

    } else if(this.score > 100) {

      this.soundEffect_nice.play()
    }

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}
