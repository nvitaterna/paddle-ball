import Countdown from '@/objects/Countdown';
import Player from '@/objects/Player';
import Ball from '@/objects/Ball';
import Bot from '@/objects/Bot';
import Score from '@/objects/Score';
import makeLine from '@/utils/makeLine';

const playerOffset = 150;
const goalOffset = playerOffset * 0.5;

export default class GameplayScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  player!: Player;

  bot!: Bot;

  ball!: Ball;

  playerScore!: Score;

  botScore!: Score;

  gameWon = false;

  gameOver = false;

  countdown!: Countdown;

  winningScore = 3;

  gameOverShown = false;

  constructor() {
    super('gameplay');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = new Player(this, playerOffset, this.game.scale.height / 2, 'paddle', this.cursors);

    this.ball = new Ball(this, this.game.scale.width / 2, this.game.scale.height / 2, 'ball');

    this.bot = new Bot(this, this.game.scale.width - playerOffset, this.game.scale.height / 2, 'paddle', this.ball);

    this.physics.add.collider(this.player, this.ball, this.collidePaddleBall as ArcadePhysicsCallback, undefined, this);

    this.physics.add.collider(this.bot, this.ball, this.collidePaddleBall as ArcadePhysicsCallback, undefined, this);

    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;

    makeLine(this, goalOffset);
    makeLine(this, this.game.scale.width - goalOffset);
    makeLine(this, this.game.scale.width / 2, 6);

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
    this.player.update();
    this.bot.update();

    if (this.ball.getLeftCenter().x > this.game.scale.width - goalOffset) {
      this.onScore(true);
    } else if (this.ball.getRightCenter().x < goalOffset) {
      this.onScore(false);
    }
  }

  onScore(playerScored: boolean) {
    if (playerScored) {
      this.playerScore.increment();
    } else {
      this.botScore.increment();
    }
    this.ball.reset();
    this.player.reset();
    this.bot.reset();

    if (this.playerScore.score === this.winningScore) {
      this.scene.start('gameover', {
        won: true,
        score: `${this.playerScore.score}-${this.botScore.score}`,
      });
    } else if (this.botScore.score === this.winningScore) {
      this.scene.start('gameover', {
        won: false,
        score: `${this.botScore.score}-${this.playerScore.score}`,
      });
    } else {
      this.countdown.startCountdown();
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
