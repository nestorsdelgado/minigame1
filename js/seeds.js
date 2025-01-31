class Seeds {
    constructor(gameScreen, top, left) {
        this.gameScreen = gameScreen;
        this.left = left + 12;
        this.top = top + 64;
        this.width = 8;
        this.height = 12;

        this.element = document.createElement("img");
        this.element.src = "./Sprites/Pipas/pipa_basica (sin fondo).png";

        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.classList.add("seed")

        // Agregar el sprite al contenedor
        this.gameScreen.appendChild(this.element);

    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    move() {
        this.top -= 1;  
        this.updatePosition();
    }


    didCollide(objectsArray) {

        if (!Array.isArray(objectsArray)) {
            objectsArray = [objectsArray];
        }

        let boundingBox = this.element.getBoundingClientRect();

        for (let obj of objectsArray) {
            if (!obj.element) continue;

            let objBox = obj.element.getBoundingClientRect();

            if (this.isColliding(boundingBox, objBox)) {
                return true;
            }
        }

        return false;
    }

    isColliding(obj1, obj2) {
        return obj1.left < obj2.left + obj2.width &&
            obj1.left + obj1.width > obj2.left &&
            obj1.top < obj2.top + obj2.height &&
            obj1.top + obj1.height > obj2.top;
    }

    remove() {
        this.element.remove();
    }

}
