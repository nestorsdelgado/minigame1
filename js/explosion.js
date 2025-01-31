class Explosion {
    constructor(gameScreen, left, top) {
        this.gameScreen = gameScreen;
        this.left = left-10;
        this.top = top+15;
        this.width = 44;
        this.height = 44;


        // Create the explosion element
        this.element = document.createElement("div");
        this.element.classList.add("explosion");

        this.sprite = document.createElement("img");
        this.sprite.src = "./Sprites/Humo/explosion2_sinfondo.png";

        this.sprite.classList.add("explosion_spritesheet", "pixelart", "initial_explosion"); // Clases CSS de animación
        
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;


        this.element.appendChild(this.sprite);
        this.gameScreen.appendChild(this.element);
    }

    remove() {
        this.element.remove();
    }
}