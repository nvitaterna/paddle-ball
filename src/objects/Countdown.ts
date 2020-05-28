const interval = 600;

export default class Countdown extends Phaser.GameObjects.Text {
  timer!: Phaser.Time.TimerEvent;

  currentNumber!: number;

  constructor(scene: Phaser.Scene, x: number, y: number, style: Phaser.Types.GameObjects.Text.TextStyle, private callback: Function) {
    super(scene, x, y, '3', style);
    this.startCountdown();
    this.scene.add.existing(this);
    this.setOrigin(0.5, 0.5);
  }

  startCountdown() {
    this.currentNumber = 3;
    this.text = '3';
    this.timer = this.scene.time.addEvent({
      delay: interval,
      callback: this.nextNumber,
      callbackScope: this,
      loop: true,
    });
    this.setVisible(true);
  }

  nextNumber() {
    this.currentNumber -= 1;
    if (this.currentNumber === 0) {
      this.text = 'Start!';
    } else {
      this.text = this.currentNumber.toString();
    }
    if (this.currentNumber < 0) {
      this.callback();
      this.timer.destroy();
      this.setVisible(false);
      delete this.timer;
    }
  }
}
