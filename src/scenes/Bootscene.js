import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    this.createTextures();

    this.scene.start("MenuScene");
  }

  createTextures() {

    // =========================
    // PLAYER
    // =========================

    const playerGraphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false
    });

    playerGraphics.clear();
    playerGraphics.fillStyle(0x4ade80);
    playerGraphics.fillRect(0, 0, 32, 42);

    playerGraphics.generateTexture(
      "player",
      32,
      42
    );

    playerGraphics.destroy();


    // =========================
    // PLATFORM
    // =========================

    const platformGraphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false
    });

    platformGraphics.clear();
    platformGraphics.fillStyle(0x555555);
    platformGraphics.fillRect(0, 0, 80, 20);

    platformGraphics.generateTexture(
      "platform",
      80,
      20
    );

    platformGraphics.destroy();


    // =========================
    // SPIKE
    // =========================

    const spikeGraphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false
    });

    spikeGraphics.clear();
    spikeGraphics.fillStyle(0xff3333);

    spikeGraphics.beginPath();

    spikeGraphics.moveTo(0, 30);
    spikeGraphics.lineTo(15, 0);
    spikeGraphics.lineTo(30, 30);

    spikeGraphics.closePath();

    spikeGraphics.fillPath();

    spikeGraphics.generateTexture(
      "spike",
      30,
      30
    );

    spikeGraphics.destroy();
  }
}
