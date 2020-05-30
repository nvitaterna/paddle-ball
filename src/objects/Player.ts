import Paddle from '@/objects/Paddle';

export default class Player extends Paddle {
  constructor(scene: Phaser.Scene, x: number, y: number, key: string, private cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    super(scene, x, y, key);
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
