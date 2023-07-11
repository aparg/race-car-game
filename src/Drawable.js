export default class Drawable {
  x = 0;
  y = 0;
  height = 0;
  width = 0;

  /**
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw() {
    throw "Not Implemented.";
  }
}
