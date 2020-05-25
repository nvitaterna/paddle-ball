import Paddle from '@/objects/paddle';
import Ball from './ball';

export default class Bot extends Paddle {
  constructor(scene: Phaser.Scene, x: number, y: number, key: string,
    private ball: Ball) {
    super(scene, x, y, key);
  }

  update() {
    this.setVelocityY(0);
    if (this.ball.y !== this.y) {
      const velocity = Math.min(Math.abs(this.ball.body.velocity.y), this.speed);
      if (this.ball.y > this.y) {
        this.setVelocityY(velocity);
      } else {
        this.setVelocityY(-velocity);
      }
    }
  }
}
