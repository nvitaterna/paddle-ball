export default class Score extends Phaser.GameObjects.Text {
  score = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '0', {
      fontFamily: '"Press Start 2P"',
      fontSize: '72px',
    });
    this.setOrigin(0.5, 0);
    this.scene.add.existing(this);
  }

  increment() {
    this.score += 1;
    this.setText(this.score.toString());
  }
}
