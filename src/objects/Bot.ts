import Paddle from '@/objects/Paddle';
import Ball from './Ball';

export default class Bot extends Paddle {
  offset!: number;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string,
    private ball: Ball) {
    super(scene, x, y, key);
    this.newOffset();
  }

  newOffset() {
    const offset = (this.height / 2) * (Math.random() * 0.75 + 0.25);
    this.offset = offset * (Math.random() > 0.5 ? 1 : -1);
  }

  update() {
    this.setVelocityY(0);
    if (this.ball.y !== (this.y + this.offset)) {
      const velocity = Math.min(Math.abs(this.ball.body.velocity.y), this.speed);
      if (this.ball.y > (this.y + this.offset)) {
        this.setVelocityY(velocity);
      } else {
        this.setVelocityY(-velocity);
      }
    }
  }
}
