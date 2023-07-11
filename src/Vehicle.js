import Collider from "./Collider.js";
const enemyImg = new Image();
enemyImg.src = "./assets/enemycar.png";
const playerImg = new Image();
playerImg.src = "./assets/racecar.png";
const vehicleImage = {
  enemy: enemyImg,
  player: playerImg,
};

export default class Vehicle extends Collider {
  /**
   * @type {HTMLImageElement}
   */
  #image;

  velocity = 0;
  destroyed = false;

  /**
   * @param {string} imagePath
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(imagePath, ctx) {
    super(ctx);

    this.#image = vehicleImage[imagePath];
  }

  draw(x, y) {
    this.ctx.drawImage(this.#image, x, y, this.width, this.height);
  }
}
