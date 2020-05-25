import Paddle from '@/objects/paddle';

export default class Player extends Paddle {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.setVelocityY(0);
    if (this.cursors.up?.isDown) {
      this.setVelocityY(-this.speed);
    } else if (this.cursors.down?.isDown) {
      this.setVelocityY(this.speed);
    }
  }
}
