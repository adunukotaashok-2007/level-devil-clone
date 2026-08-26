import Phaser from "phaser";

import Player from "../objects/Player.js";
import Trap from "../objects/Trap.js";

import level1 from "../levels/level1.js";
import level2 from "../levels/level2.js";
import level3 from "../levels/level3.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  init(data) {
    this.levelNumber = data.level || 1;

    this.deaths = 0;
  }

  create() {
    this.createBackground();

    this.loadLevel();

    this.createControls();

    this.createUI();

    this.setupCamera();
  }

  createBackground() {
    this.add.rectangle(
      1200,
      300,
      3000,
      700,
      0x171717
    );

    this.add.rectangle(
      1200,
      520,
      3000,
      40,
      0x222222
    );
  }

  loadLevel() {
    let data;

    if (this.levelNumber === 1) {
      data = level1;
    } else if (this.levelNumber === 2) {
      data = level2;
    } else {
      data = level3;
    }

    this.levelData = data;

    this.platforms = this.physics.add.staticGroup();

    data.platforms.forEach((platform) => {
      const object = this.platforms
        .create(
          platform.x,
          platform.y,
          "platform"
        )
        .setOrigin(0.5);

      object.displayWidth = platform.width;
      object.refreshBody();
    });

    this.traps = this.physics.add.staticGroup();

    data.traps.forEach((trap) => {
      const spike = new Trap(
        this,
        trap.x,
        trap.y
      );

      this.traps.add(spike);
    });

    this.player = new Player(
      this,
      data.player.x,
      data.player.y
    );

    this.physics.add.collider(
      this.player,
      this.platforms
    );

    this.physics.add.overlap(
      this.player,
      this.traps,
      () => {
        this.player.kill();
      }
    );

    // Finish
    this.finish = this.add.rectangle(
      data.finish.x,
      data.finish.y,
      50,
      80,
      0x4ade80
    );

    this.physics.add.existing(
      this.finish,
      true
    );

    this.physics.add.overlap(
      this.player,
      this.finish,
      () => {
        this.levelComplete();
      }
    );

    // World boundaries
    this.physics.world.setBounds(
      0,
      0,
      2400,
      540
    );
  }

  createControls() {
    this.cursors =
      this.input.keyboard.createCursorKeys();

    this.keys =
      this.input.keyboard.addKeys(
        "W,A,D"
      );
  }

  createUI() {
    this.deathText = this.add
      .text(20, 20, "Deaths: 0", {
        fontFamily: "Arial",
        fontSize: "22px",
        color: "#ffffff"
      })
      .setScrollFactor(0);

    this.levelText = this.add
      .text(20, 50, `Level ${this.levelNumber}`, {
        fontFamily: "Arial",
        fontSize: "20px",
        color: "#aaaaaa"
      })
      .setScrollFactor(0);

    const restart = this.add
      .text(850, 20, "RESTART", {
        fontFamily: "Arial",
        fontSize: "20px",
        color: "#ffffff",
        backgroundColor: "#333333",
        padding: 10
      })
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });

    restart.on("pointerdown", () => {
      this.restartLevel();
    });
  }

  setupCamera() {
    this.cameras.main.setBounds(
      0,
      0,
      2400,
      540
    );

    this.cameras.main.startFollow(
      this.player,
      true,
      0.08,
      0.08
    );
  }

  update() {
    if (!this.player) {
      return;
    }

    this.player.update(
      this.cursors,
      this.keys
    );

    // Player falls off the map.
    if (
      this.player.y > 650 &&
      !this.player.dead
    ) {
      this.player.kill();
    }
  }

  playerDied() {
    this.deaths++;

    this.deathText.setText(
      `Deaths: ${this.deaths}`
    );

    this.scene.restart({
      level: this.levelNumber
    });
  }

  restartLevel() {
    this.scene.restart({
      level: this.levelNumber
    });
  }

  levelComplete() {
    this.add
      .rectangle(
        this.player.x,
        270,
        500,
        200,
        0x000000,
        0.85
      )
      .setScrollFactor(0);

    const message = this.add
      .text(
        this.cameras.main.scrollX + 480,
        220,
        "LEVEL COMPLETE!",
        {
          fontFamily: "Arial",
          fontSize: "40px",
          color: "#4ade80",
          fontStyle: "bold"
        }
      )
      .setOrigin(0.5);

    message.setScrollFactor(0);

    const next = this.add
      .text(
        this.cameras.main.scrollX + 480,
        300,
        this.levelNumber < 3
          ? "NEXT LEVEL"
          : "BACK TO LEVELS",
        {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#ffffff",
          backgroundColor: "#333333",
          padding: 12
        }
      )
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setInteractive({
        useHandCursor: true
      });

    next.on("pointerdown", () => {
      if (this.levelNumber < 3) {
        this.scene.restart({
          level: this.levelNumber + 1
        });
      } else {
        this.scene.start(
          "LevelSelectScene"
        );
      }
    });

    this.physics.pause();
  }
}
