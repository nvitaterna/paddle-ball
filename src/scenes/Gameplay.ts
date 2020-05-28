import Countdown from '@/objects/Countdown';
import Player from '@/objects/Player';
import Ball from '@/objects/Ball';
import Bot from '@/objects/Bot';
import Line from '@/objects/Line';
import Score from '@/objects/Score';

const playerOffset = 150;
const goalOffset = playerOffset * 0.5;

export default class GameplayScene extends Phaser.Scene {
  player!: Player;

  bot!: Bot;

  ball!: Ball;

  playerScore!: Score;

  botScore!: Score;

  gameWon = false;

  gameOver = false;

  countdown!: Countdown;

  constructor() {
    super('gameplay');
  }

  create() {
    this.player = new Player(this, playerOffset, this.game.scale.height / 2, 'paddle');

    this.ball = new Ball(this, this.game.scale.width / 2, this.game.scale.height / 2, 'ball');

    this.bot = new Bot(this, this.game.scale.width - playerOffset, this.game.scale.height / 2, 'paddle', this.ball);

    this.physics.add.collider(this.player, this.ball, this.collidePaddleBall as ArcadePhysicsCallback, undefined, this);

    this.physics.add.collider(this.bot, this.ball, this.collidePaddleBall as ArcadePhysicsCallback, undefined, this);

    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;

    // eslint-disable-next-line no-new
    new Line(this, goalOffset);
    // eslint-disable-next-line no-new
    new Line(this, this.game.scale.width - goalOffset);
    // eslint-disable-next-line no-new
    new Line(this, this.game.scale.width / 2, 6);

    this.playerScore = new Score(this, this.game.scale.width / 4, this.game.scale.height / 24);
    this.botScore = new Score(this, this.game.scale.width - this.game.scale.width / 4, this.game.scale.height / 24);

    this.countdown = new Countdown(this, this.game.scale.width / 2, this.game.scale.height / 3, {
      fontFamily: '"Press Start 2P"',
      fontSize: `${(this.game.scale.height / 16).toString()}px`,
    }, () => {
      this.ball.init();
    });
  }

  update() {
    if (!this.gameOver) {
      this.player.update();
      this.bot.update();

      if (this.ball.getLeftCenter().x > this.game.scale.width - goalOffset) {
        this.onScore(true);
      } else if (this.ball.getRightCenter().x < goalOffset) {
        this.onScore(false);
      }
    } else {
      this.player.setVelocityY(0);
      this.bot.setVelocityY(0);
      this.ball.setVelocity(0, 0);
    }
  }

  onScore(playerScored: boolean) {
    if (playerScored) {
      this.playerScore.increment();
    } else {
      this.botScore.increment();
    }
    this.ball.setVelocity(0, 0);
    this.ball.reset();
    this.player.reset();
    this.bot.reset();
    this.countdown.startCountdown();
  }

  checkScore() {
    if (this.playerScore.score === 3) {
      this.gameWon = true;
      this.gameOver = true;
    } else if (this.botScore.score === 3) {
      this.gameWon = false;
      this.gameOver = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  collidePaddleBall(paddle: Player | Bot, ball: Ball) {
    if (paddle instanceof Bot) {
      paddle.newOffset();
    }
    ball.onPaddleCollision(paddle);
  }
}
