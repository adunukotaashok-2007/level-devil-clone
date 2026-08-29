import Phaser from "phaser";

import BootScene from "./scenes/BootScene.js";
import MenuScene from "./scenes/MenuScene.js";
import LevelSelectScene from "./scenes/LevelSelectScene.js";
import GameScene from "./scenes/GameScene.js";
import MultiplayerScene from "./scenes/MultiplayerScene.js";

const config = {
  type: Phaser.AUTO,

  width: 960,
  height: 540,

  parent: "game",

  backgroundColor: "#87CEEB",

  physics: {
    default: "arcade",

    arcade: {
      gravity: {
        y: 1000
      },

      debug: false
    }
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  scene: [
    BootScene,
    MenuScene,
    LevelSelectScene,
    GameScene,
    MultiplayerScene
  ]
};

new Phaser.Game(config);
