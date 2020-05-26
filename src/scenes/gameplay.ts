import Countdown from '@/objects/countdown';
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

  create() {
    // eslint-disable-next-line no-new
    const countDown = new Countdown(this, this.game.scale.width / 2, this.game.scale.height / 2, {
      fontFamily: '"Press Start 2P"',

      fontSize: `${(this.game.scale.height / 16).toString()}px`,
    }, () => {
      this.player = new Player(this, 100, this.game.scale.height / 2, 'paddle');
      this.ball = new Ball(this, this.game.scale.width / 2, this.game.scale.height / 2, 'ball');
      this.bot = new Bot(this, this.game.scale.width - 100, this.game.scale.height / 2, 'paddle', this.ball);
      this.ball.setVelocityX(-this.ball.speed);
      this.ball.setVelocityY((Math.random() * 2 - 1) * this.ball.maxSpeedY);
      this.physics.add.collider(this.player, this.ball, this.collideBallPlayer as ArcadePhysicsCallback, undefined, this);
      this.physics.add.collider(this.bot, this.ball, this.collideBallPlayer as ArcadePhysicsCallback, undefined, this);
    });

    this.add.existing(countDown);
  }

  update() {
    if (this.player) {
      this.player.update();
    }
    if (this.bot) {
      this.bot.update();
    }
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
