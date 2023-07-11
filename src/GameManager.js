import Enemy from "./Enemy.js";
import LaneDivider from "./LaneDivider.js";
import Player from "./Player.js";
const bulletCollisionSound = new Audio("./assets/gun.mp3");
const carsCrash = new Audio("./assets/crash.wav");

export default class GameManager {
  gameOver = false;

  /**
   * @type {{
   *  ENEMY_CAR_WIDTH: number,
   *  ENEMY_CAR_HEIGHT: number,
   *  PLAYER_CAR_WIDTH: number,
   *  PLAYER_CAR_HEIGHT: number
   * }}
   */
  #opts = {
    ENEMY_CAR_WIDTH: 80,
    ENEMY_CAR_HEIGHT: 160,
    PLAYER_CAR_WIDTH: 80,
    PLAYER_CAR_HEIGHT: 160,
    LANE_WIDTH: 20,
    LANE_HEIGHT: 50,
    LANE_POS_Y: 20,
  };

  /**
   * HTML Canvas Element for Game
   * @type {HTMLCanvasElement}
   */
  #canvas;

  /**
   * Canvas Rendering Context
   * @type {CanvasRenderingContext2D}
   */
  #ctx;

  /**
   * @type {number[]}
   */
  #laneXPositions = [200, 410];
  /**
   * @type {LaneDivider[]}
   */
  #laneDividers = [];

  /**
   * Array of Enemy Cars spawned
   * @type {Enemy[]}
   */
  #enemyCars = [];

  /**
   * @type {Player}
   */
  #player;

  /**
   * @type {number}
   */
  #lives = 3;

  /**
   * @type {number}
   */
  #score = 0;

  #scoreInterval;
  #spawnerInterval;

  #onlifechange = (life) => {};

  #onscorechange = (score) => {};

  #ongameover = (score) => {};

  #dividers = [];

  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas, opts = undefined) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
    if (opts) this.#opts = opts;
  }

  #drawTrack() {
    this.#ctx.beginPath();
    this.#ctx.fillStyle = "#3f3f3f";
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#ctx.beginPath();
    this.#ctx.fillStyle = "rgba(255 ,255 ,255 ,1)";
    //draw lane dividers
    // this.#ctx.fillRect(200, 0, 10, 50);
    // this.#ctx.fillRect(410, 0, 10, 50);
  }

  #initLaneDivider() {
    for (let laneX of this.#laneXPositions) {
      console.log(laneX);
      let laneY = this.#opts.LANE_POS_Y;
      while (laneY <= window.innerHeight) {
        console.log(laneX);
        this.#laneDividers.push(
          new LaneDivider(
            this.#ctx,
            laneX,
            laneY,
            this.#opts.LANE_WIDTH,
            this.#opts.LANE_HEIGHT
          )
        );
        laneY += 100;
      }
    }
    console.log(this.#laneDividers);
  }

  start() {
    console.log("CALLED START");
    this.#initLaneDivider();
    this.#initPlayer();
    this.#initEnemySpawner();
    this.initScore();
    this.drawFrame();
  }

  #initPlayer() {
    this.#player = new Player(
      this.#opts.PLAYER_CAR_WIDTH,
      this.#opts.PLAYER_CAR_HEIGHT,
      260,
      this.#canvas.height - 200,
      this.#ctx
    );

    window.addEventListener(
      "keypress",
      this.#player.onKeyPress.bind(this.#player)
    );
    this.#player.draw();
  }

  #initEnemySpawner() {
    this.#spawnerInterval = setInterval(() => {
      if (this.#enemyCars.length < 5)
        this.#enemyCars.push(
          new Enemy(
            this.#opts.ENEMY_CAR_WIDTH,
            this.#opts.ENEMY_CAR_HEIGHT,
            (() => {
              this.safeLanes = [60, 260, 480].filter((lane) => {
                return this.#enemyCars.every((car) => car.x != lane);
              });
              return this.safeLanes[
                Math.floor((Math.random() * 1000) % this.safeLanes.length)
              ];
            })(),
            Math.floor(Math.random() * -this.#opts.ENEMY_CAR_HEIGHT),
            this.#ctx
          )
        );
    }, 1000);
  }

  safeLanes = [];

  initScore() {
    this.#scoreInterval = setInterval(() => {
      this.#score++;
      this.#onscorechange(this.#score);
    }, 100);
  }

  drawFrame() {
    if (!this.gameOver) requestAnimationFrame(this.drawFrame.bind(this));
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.fillStyle = "#000";

    //Draw track
    this.#drawTrack();

    //Draw lane dividers and move them
    this.#laneDividers.forEach((divider) => {
      divider.draw();
      divider.y += 6;
      if (divider.y >= window.innerHeight) divider.y = 0;
    });

    // Draw Player
    this.#player.draw();

    // Draw enemies
    this.#enemyCars.forEach(async (car, idx) => {
      car.y += 5;
      car.draw();
      if (car.y > window.innerHeight) {
        this.#enemyCars.splice(idx, 1);
      }
      if (car.checkCollisionWith(this.#player)) {
        carsCrash.play();
        this.#enemyCars.splice(idx, 1);
        this.#lives--;

        // execute event
        await this.#onlifechange(this.#lives);

        if (this.#lives < 1) {
          this.gameOver = true;
          clearInterval(this.#scoreInterval);
          clearInterval(this.#spawnerInterval);
          this.#ongameover(this.#score);
        }
      }
    });

    // Draw Bullets
    this.#player.bullets.forEach((bullet, bullet_idx) => {
      bullet.y -= 10;
      bullet.draw();
      if (bullet.y < 0) this.#player.bullets.splice(bullet_idx, 1);

      this.#enemyCars.forEach((enemy, enemy_idx) => {
        if (enemy.checkCollisionWith(bullet)) {
          bulletCollisionSound.play();
          this.#player.bullets.splice(bullet_idx, 1);
          this.#enemyCars.splice(enemy_idx, 1);
        }
      });
    });
  }

  getPlayer() {
    return this.#player;
  }

  getEnemies() {
    return this.#enemyCars;
  }

  getFlyingBullets() {
    return this.#player.bullets;
  }

  setOnLifeChange(callback) {
    this.#onlifechange = callback;
  }

  setOnScoreChange(callback) {
    this.#onscorechange = callback;
  }

  setOnGameOver(callback) {
    this.#ongameover = callback;
  }
}
