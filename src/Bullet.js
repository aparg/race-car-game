import Collider from "./Collider.js";

const BULLET_WIDTH = 20;
const BULLET_HEIGHT = 40;

export default class Bullet extends Collider {
  width = BULLET_WIDTH;
  height = BULLET_HEIGHT;

  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
