import Phaser from "phaser";

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super("LevelSelectScene");
  }

  create() {
    const { width, height } = this.scale;

    // ==========================================
    // BACKGROUND
    // ==========================================

    this.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x87ceeb
    );

    // ==========================================
    // TITLE
    // ==========================================

    this.add
      .text(
        width / 2,
        70,
        "SELECT LEVEL",
        {
          fontFamily: "Arial",
          fontSize: "48px",
          color: "#000000",
          fontStyle: "bold"
        }
      )
      .setOrigin(0.5);

    // ==========================================
    // LEVEL BUTTONS
    // ==========================================

    const levels = [1, 2, 3];

    levels.forEach((level, index) => {
      const x =
        width / 2 - 230 + index * 230;

      const button = this.add
        .text(
          x,
          260,
          `LEVEL ${level}`,
          {
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
          }
        )
        .setOrigin(0.5)
        .setInteractive({
          useHandCursor: true
        });

      // Mouse over
      button.on(
        "pointerover",
        () => {
          button.setColor("#4ade80");
        }
      );

      // Mouse leaves
      button.on(
        "pointerout",
        () => {
          button.setColor("#ffffff");
        }
      );

      // Select level
      button.on(
        "pointerdown",
        () => {
          this.scene.start(
            "GameScene",
            {
              level: level,
              deaths: 0,
              multiplayer: false
            }
          );
        }
      );
    });

    // ==========================================
    // BACK BUTTON
    // ==========================================

    const back = this.add
      .text(
        width / 2,
        440,
        "BACK",
        {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#333333",
          backgroundColor: "#ffffff",
          padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 10
          }
        }
      )
      .setOrigin(0.5)
      .setInteractive({
        useHandCursor: true
      });

    // Back hover
    back.on(
      "pointerover",
      () => {
        back.setColor("#16a34a");
      }
    );

    back.on(
      "pointerout",
      () => {
        back.setColor("#333333");
      }
    );

    // Back to menu
    back.on(
      "pointerdown",
      () => {
        this.scene.start("MenuScene");
      }
    );
  }
}
