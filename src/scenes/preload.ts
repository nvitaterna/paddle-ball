import ballSprite from '@/assets/images/ball.png';
import paddleSprite from '@/assets/images/paddle.png';
import lineSprite from '@/assets/images/line.png';

export default class PreloadScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  logo!: Phaser.GameObjects.Image;

  constructor() {
    super('preloadScene');
  }

  preload() {
    this.load.image('ball', ballSprite);
    this.load.image('paddle', paddleSprite);
    this.load.image('line', lineSprite);

    // this.load.on('progress', this.onLoadProgress, this);
    // this.load.on('filecomplete', this.onLoadFile, this);
  }

  // eslint-disable-next-line class-methods-use-this
  // onLoadFile(a: string, b: string, c: Phaser.Textures.Texture) {

  // }

  // eslint-disable-next-line class-methods-use-this
  // onLoadProgress(progress: number) {
  //   console.log(`${Math.round(progress * 100)}%`);
  // }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    const logo = this.add.text(
      this.game.scale.width / 2,
      (this.game.scale.height / 2 - this.game.scale.height / 16),
      'PONG', {
        fontFamily: '"Press Start 2P"',
        fontSize: this.game.scale.height / 4,
      },
    );
    logo.setOrigin(0.5, 0.5);

    const startText = this.add.text(
      this.game.scale.width / 2,
      this.game.scale.height - this.game.scale.height / 4,
      'Press Space',
      {
        fontFamily: '"Press Start 2P"',
        fontSize: this.game.scale.height / 16,
      },
    );
    startText.setOrigin(0.5, 0.5);

    this.time.addEvent({
      delay: 500,
      callback: () => {
        startText.visible = !startText.visible;
      },
      loop: true,
    });
  }

  update() {
    if (this.cursors.space?.isDown) {
      this.scene.start('gameplay');
    }
  }
}
