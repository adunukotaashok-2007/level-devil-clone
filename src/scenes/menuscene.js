import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, 120, "TRAP RUNNER", {
        fontFamily: "Arial",
        fontSize: "64px",
        color: "#ff4444",
        fontStyle: "bold"
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 190, "A chaotic platformer", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#ffffff"
      })
      .setOrigin(0.5);

    const playButton = this.add
      .text(width / 2, 310, "PLAY", {
        fontFamily: "Arial",
        fontSize: "42px",
        color: "#ffffff",
        backgroundColor: "#333333",
        padding: {
          left: 35,
          right: 35,
          top: 15,
          bottom: 15
        }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    playButton.on("pointerover", () => {
      playButton.setColor("#4ade80");
    });

    playButton.on("pointerout", () => {
      playButton.setColor("#ffffff");
    });

    playButton.on("pointerdown", () => {
      this.scene.start("LevelSelectScene");
    });

    this.add
      .text(width / 2, 430, "Arrow Keys / WASD to move • SPACE to jump", {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#aaaaaa"
      })
      .setOrigin(0.5);
  }
}
