import Drawable from "./Drawable.js";

export default class Collider extends Drawable {
  x = 0;
  y = 0;
  height;
  width;

  collided = false;

  getBoundX() {
    return this.x + this.width;
  }

  getBoundY() {
    return this.y + this.height;
  }

  /**
   *
   * @param {Collider} collidable
   * @returns {boolean}
   */
  checkCollisionWith(collidable) {
    return (
      this.x < collidable.getBoundX() &&
      this.getBoundX() > collidable.x &&
      this.y < collidable.getBoundY() &&
      this.getBoundY() > collidable.y
    );
  }
}
