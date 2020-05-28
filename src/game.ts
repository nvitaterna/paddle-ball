// eslint-disable-next-line import/extensions
import * as Phaser from 'phaser';
import Gameplay from '@/scenes/Gameplay';
import Preload from '@/scenes/Preload';

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  title: 'Game',
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },
  scene: [
    Preload,
    Gameplay,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
      debug: process.env.NODE_ENV === 'development',
    },
  },
  parent: 'game',
};

export default new Phaser.Game(gameConfig);
