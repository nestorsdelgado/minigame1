class Obstacle {
  constructor(gameScreen) {

    this.gameScreen = gameScreen;
    this.left = 259;
    this.top = -100;

    this.random = Math.random(); // Used to set path of the cats

    // Crear el contenedor del sprite en el juego
    this.element = document.createElement("div");
    this.element.classList.add("cat"); // Aplica la clase CSS del sprite

    this.sprite = document.createElement("img");
    this.sprite.src = "./Sprites/Gatos/Gato caminando (sin fondo).png";

    this.sprite.classList.add("cat_spritesheet", "pixelart", "initial_cat"); // Clases CSS de animación

    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.scaleFactor = 1 // Factor inicial de pixel-size (para ajustar tamaño de los gatos en el CSS)
    this.increase = 0
    this.zaxis = 0

    // Agregar el sprite al contenedor
    this.element.appendChild(this.sprite);
    this.gameScreen.appendChild(this.element);
    this.classes = []
    this.classes.push("gato")

  }

  updatePosition() {
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {

    this.top += 1;

    this.increase = this.increase + 0.017
    this.zaxis +=1
    // Efecto de crecimiento en perspectiva
    this.scaleFactor = Math.min((this.increase), 20); // Establecido el máximo en 20 aunque no debería llegar a tal punto

    // Apply the CSS variable update
    this.element.style.setProperty("--pixel-size-cat", this.scaleFactor);
    this.element.style.setProperty("z-index", this.zaxis); // the cat in front is seen in front

    let lateralSpeed = 0.2;
    let randomLeft = Math.random() * 0.125 // small adjustment to improve performance
    if (this.top >= -70) {
      if (this.random < 0.33) {
        this.left -= lateralSpeed + randomLeft; // small adjustment to improve performance
      } else if (this.random > 0.66) {
        this.left += lateralSpeed;
      } 
    }

    this.updatePosition();
  }
}
