import Phaser from "phaser";

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super("LevelSelectScene");
  }

  create() {
    const { width } = this.scale;

    this.add
      .text(width / 2, 70, "SELECT LEVEL", {
        fontFamily: "Arial",
        fontSize: "48px",
        color: "#ffffff",
        fontStyle: "bold"
      })
      .setOrigin(0.5);

    const levels = [1, 2, 3];

    levels.forEach((level, index) => {
      const x = 250 + index * 230;

      const button = this.add
        .text(x, 260, `LEVEL ${level}`, {
          fontFamily: "Arial",
          fontSize: "30px",
          color: "#ffffff",
          backgroundColor: "#333333",
          padding: {
            left: 20,
            right: 20,
            top: 15,
            bottom: 15
          }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      button.on("pointerover", () => {
        button.setColor("#4ade80");
      });

      button.on("pointerout", () => {
        button.setColor("#ffffff");
      });

      button.on("pointerdown", () => {
        this.scene.start("GameScene", {
          level: level
        });
      });
    });

    const back = this.add
      .text(width / 2, 440, "BACK", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#aaaaaa"
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    back.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}
