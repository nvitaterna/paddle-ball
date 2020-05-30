export default function makeLine(
  scene: Phaser.Scene,
  position: number,
  width = 12,
  vertical = true,
) {
  const x = vertical ? position : 0;
  const y = vertical ? 0 : position;
  const x2 = vertical ? 0 : scene.game.scale.width;
  const y2 = vertical ? scene.game.scale.height : 0;

  const line = new Phaser.GameObjects.Graphics(scene, {
    x,
    y,
  });

  line.lineStyle(width, 0xFFFFFF);
  line.beginPath();
  line.moveTo(0, 0);
  line.lineTo(x2, y2);
  line.closePath();
  line.strokePath();
  scene.add.existing(line);
}
