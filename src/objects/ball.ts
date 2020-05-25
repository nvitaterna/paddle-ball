import * as Phaser from 'phaser';

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  public speed = 300;

  public maxSpeedY = 100;

  public speedIncrement = 20;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setBounce(1, 1);

    this.setCollideWorldBounds(true);

    this.setOrigin(0.5, 0.5);
  }
}
