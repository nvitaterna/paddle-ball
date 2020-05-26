import ballSprite from '@/assets/images/ball.png';
import paddleSprite from '@/assets/images/paddle.png';
import lineSprite from '@/assets/images/line.png';
import logoFile from '@/assets/images/logo.png';

export default class PreloadScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  logo!: Phaser.GameObjects.Image;

  constructor() {
    super('preloadScene');
  }

  preload() {
    this.load.image('logo', logoFile);
    this.load.image('ball', ballSprite);
    this.load.image('paddle', paddleSprite);
    this.load.image('line', lineSprite);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.logo = this.add.image(this.game.scale.width / 2, this.game.scale.height / 2, 'logo');
  }

  update() {
    if (this.cursors.space?.isDown) {
      this.scene.start('gameplay');
    }
  }
}
