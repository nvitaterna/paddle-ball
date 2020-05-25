import * as Phaser from 'phaser';

export default abstract class Paddle extends Phaser.Physics.Arcade.Sprite {
  protected speed = 400;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setImmovable(true);
    this.setCollideWorldBounds(true);
  }

  abstract update(): void;
}
