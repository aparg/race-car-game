import Vehicle from "./Vehicle.js";

export default class Enemy extends Vehicle {
  /**
   * @param {number} width
   * @param {number} height
   */

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(width, height, x, y, velocity, ctx) {
    super("enemy", ctx);
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.velocity = velocity
  }

  draw() {
    super.draw(this.x, this.y);
  }
}
