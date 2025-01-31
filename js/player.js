class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;

    // Crear el contenedor del sprite en el juego
    this.element = document.createElement("div");
    this.element.classList.add("Hamster"); // Aplica la clase CSS del sprite

    this.sprite = document.createElement("img");
    this.sprite.src = imgSrc;

    this.sprite.classList.add("Hamster_spritesheet", "pixelart", "initial"); // Clases CSS de animación

    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    // Agregar el sprite al contenedor
    this.element.appendChild(this.sprite);
    this.gameScreen.appendChild(this.element);
  }

  move() {

    this.left += this.directionX*1.75; // Hamster velocity

    if (this.left < 10) {
      this.left = 10;
    }
    if (this.top < 10) {
      this.top = 10;
    }
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    this.updatePosition();
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right - obstacleRect.width * 0.2 &&
      playerRect.right > obstacleRect.left + obstacleRect.width * 0.2 &&
      playerRect.top < obstacleRect.bottom - obstacleRect.height * 0.2 &&
      playerRect.bottom > obstacleRect.top
    ) {

      return true;
    } else {
      return false;
    }
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

}
