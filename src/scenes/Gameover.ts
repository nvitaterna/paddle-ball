export default class GameoverScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('gameover');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    const { won, score } = this.scene.settings.data as { won: boolean, score: string };
    let text = 'You Lose :(';
    if (won) {
      text = 'You Win :)';
    }
    const textObject = this.add.text(
      this.game.scale.width / 2,
      (this.game.scale.height / 3),
      `${text} ${score}`, {
        fontFamily: '"Press Start 2P"',
        fontSize: `${(this.game.scale.height / 12).toString()}px`,
      },
    );
    textObject.setOrigin(0.5, 0.5);

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
  }

  update() {
    if (this.cursors.space?.isDown) {
      this.scene.start('gameplay');
    }
  }
}
