export default class Countdown extends Phaser.GameObjects.Text {
  timer: Phaser.Time.TimerEvent;

  currentNumber = 3;

  constructor(scene: Phaser.Scene, x: number, y: number, style: Phaser.Types.GameObjects.Text.TextStyle, public callback: Function) {
    super(scene, x, y, '3', style);

    this.timer = scene.time.addEvent({
      delay: 1000,
      callback: this.nextNumber,
      callbackScope: this,
      loop: true,
    });
    this.setOrigin(0.5, 0.5);
  }

  nextNumber() {
    if (this.currentNumber === 0) {
      this.timer.destroy();
      this.callback();
      this.destroy();
    } else {
      this.currentNumber -= 1;
      if (this.currentNumber === 0) {
        this.text = 'Start!';
      } else {
        this.text = this.currentNumber.toString();
      }
    }
  }
}
