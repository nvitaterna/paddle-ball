export default class Goal extends Phaser.GameObjects.Graphics {
  constructor(scene: Phaser.Scene, x: number, width = 12) {
    super(scene, {
      x,
      y: 0,
    });
    this.lineStyle(width, 0xFFFFFF);
    this.beginPath();
    // this is relative to the CURRENT POSITION - we are starting at the given X value
    this.moveTo(0, 0);
    // draw a line to the bottom of the scene
    this.lineTo(0, this.scene.game.scale.height);
    this.closePath();
    this.strokePath();
    this.scene.add.existing(this);
  }
}
