import ballSprite from '@/assets/images/ball.png';
import paddleSprite from '@/assets/images/paddle.png';
import lineSprite from '@/assets/images/line.png';

import Player from '@/objects/player';
import Ball from '@/objects/ball';
import Bot from '@/objects/bot';

export default class GameplayScene extends Phaser.Scene {
  player!: Player;

  bot!: Bot;

  ball!: Ball;

  constructor() {
    super('gameplay');
  }

  preload() {
    this.load.image('ball', ballSprite);
    this.load.image('paddle', paddleSprite);
    this.load.image('line', lineSprite);
  }

  create() {
    this.player = new Player(this, 100, this.game.scale.height / 2, 'paddle');
    this.ball = new Ball(this, this.game.scale.width / 2, this.game.scale.height / 2, 'ball');
    this.bot = new Bot(this, this.game.scale.width - 100, this.game.scale.height / 2, 'paddle', this.ball);
    this.ball.setVelocityX(-this.ball.speed);
    this.physics.add.collider(this.player, this.ball, this.collideBallPlayer as ArcadePhysicsCallback, undefined, this);
    this.physics.add.collider(this.bot, this.ball, this.collideBallPlayer as ArcadePhysicsCallback, undefined, this);
  }

  update() {
    this.player.update();
    this.bot.update();
  }

  collideBallPlayer(paddle: Player | Bot, ball: Ball) {
    if (paddle instanceof Bot) {
      paddle.newOffset();
    }
    ball.speed += ball.speedIncrement;
    ball.maxSpeedY += ball.speedIncrement;
    ball.setVelocityY(this.getYVelocity(paddle.getCenter().y, ball.getCenter().y));
    ball.setVelocityX(ball.body.velocity.x > 0 ? ball.speed : -ball.speed);
  }

  getYVelocity(playerY: number, ballY: number) {
    const maxYVelocity = this.ball.maxSpeedY;
    const ballRelativeToPlayer = ballY - playerY;
    return (ballRelativeToPlayer / (this.player.height / 2)) * maxYVelocity;
  }
}
