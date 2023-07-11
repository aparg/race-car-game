import Drawable from "./Drawable.js";

export default class LaneDivider extends Drawable {
  /**
   * @type {CanvasRenderingContext2D}
   */
  #ctx;

  constructor(ctx, x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.#ctx = ctx;
  }

  draw() {
    this.#ctx.fillRect(this.x, this.y, this.width, this.height);
    // console.log(this.#ctx)
  }
}
