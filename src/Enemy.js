import Vehicle from "./Vehicle.js";

export default class Enemy extends Vehicle {
  /**
   * @param {number} width
   * @param {number} height
   */

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(width, height, x, y, ctx) {
    super("enemy", ctx);
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  draw() {
    super.draw(this.x, this.y);
  }
}
