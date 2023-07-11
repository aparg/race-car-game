import Bullet from "./Bullet.js";
import Vehicle from "./Vehicle.js";

export default class Player extends Vehicle {
  /**
   * @type {Bullet[]}
   */
  bullets = [];

  /**
   * @type {boolean}
   */
  isCoolDown = false;

  cooldown;
  /**
   * @param {number} width
   * @param {number} height
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(width, height, x, y, ctx) {
    super("player", ctx);
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  draw() {
    super.draw(this.x, this.y);
  }

  /**
   *
   * @param {"forward" | "left" | "backward" | "right"} location
   */
  moveCar(location) {
    switch (location) {
      case "forward":
        this.y -= 200;
        break;
      case "left":
        this.x = this.moveLane(location);
        break;
      case "backward":
        this.y += 200;
        break;
      case "right":
        this.x = this.moveLane(location);
        break;
    }
  }

  /**
   *
   * @param {"left" | "right"} direction
   * @returns
   */
  moveLane(direction) {
    switch (this.x) {
      case 60:
        return direction == "left" ? 60 : 260;

      case 260:
        return direction == "left" ? 60 : 480;

      case 480:
        return direction == "left" ? 260 : 480;
    }
  }

  fireBullet() {
    if (this.isCoolDown == false) {
      this.isCoolDown = true;
      const bullet = new Bullet(this.ctx);
      bullet.x = this.x + this.width / 2 - bullet.width / 2;
      bullet.y = this.y - 40;
      this.bullets.push(bullet);
      this.cooldown = setTimeout(() => {
        this.isCoolDown = false;
      }, 3000);
    } else {
      const noBulletSound = new Audio("./assets/no-bullet.mp3");
      noBulletSound.play();
    }

    // if (this.isCoolDown) clearTimeout(this.cooldown);
  }

  onKeyPress(event) {
    switch (event.code) {
      case "KeyW":
        this.moveCar("forward");
        break;
      case "KeyA":
        this.moveCar("left");
        break;
      case "KeyS":
        this.moveCar("backward");
        break;
      case "KeyD":
        this.moveCar("right");
        break;
      case "Space":
        this.fireBullet();
        break;
    }
  }
}
