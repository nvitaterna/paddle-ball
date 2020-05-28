import * as Phaser from 'phaser';
import type Player from './Player';
import type Bot from './Bot';

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  private speed!: number;

  private maxSpeedY!: number;

  private speedIncrement = 20;

  private initialPosition: { x: number, y: number };

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.initialPosition = { x, y };

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setBounce(1, 1);

    this.setCollideWorldBounds(true);

    this.setOrigin(0.5, 0.5);
  }

  init() {
    this.speed = 500;
    this.maxSpeedY = 200;

    this.setVelocityX(-this.speed);
    this.setVelocityY((Math.random() * 2 - 1) * this.maxSpeedY);
  }

  onPaddleCollision(paddle: Player | Bot) {
    this.speed += this.speedIncrement;
    this.maxSpeedY += this.speedIncrement;
    this.setVelocityY(this.getYVelocity(paddle));
    this.setVelocityX(this.body.velocity.x > 0 ? this.speed : -this.speed);
  }

  private getYVelocity(paddle: Player | Bot) {
    const ballRelativeToPlayer = this.getCenter().y - paddle.getCenter().y;
    return (ballRelativeToPlayer / (paddle.height / 2)) * this.maxSpeedY;
  }

  reset() {
    this.setVelocity(0, 0);
    // TODO: Ask if there is a better way to do this without needing a timer
    this.scene.time.addEvent({
      delay: 1,
      callback: () => {
        this.setPosition(this.initialPosition.x, this.initialPosition.y);
      },
      loop: false,
    });
  }
}
