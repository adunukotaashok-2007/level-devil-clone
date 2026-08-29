import Phaser from "phaser";

export default class MultiplayerScene extends Phaser.Scene {
  constructor() {
    super("MultiplayerScene");
  }

  create() {
    const { width, height } = this.scale;

    // Background
    this.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x87ceeb
    );

    // Title
    this.add
      .text(
        width / 2,
        80,
        "MULTIPLAYER",
        {
          fontFamily: "Arial",
          fontSize: "52px",
          color: "#000000",
          fontStyle: "bold"
        }
      )
      .setOrigin(0.5);

    // Information
    this.add
      .text(
        width / 2,
        150,
        "Play Trap Runner with other players",
        {
          fontFamily: "Arial",
          fontSize: "22px",
          color: "#222222"
        }
      )
      .setOrigin(0.5);

    // Play button
    const playButton = this.add
      .text(
        width / 2,
        270,
        "PLAY ONLINE",
        {
          fontFamily: "Arial",
          fontSize: "32px",
          color: "#ffffff",
          backgroundColor: "#2563eb",
          padding: {
            left: 25,
            right: 25,
            top: 15,
            bottom: 15
          }
        }
      )
      .setOrigin(0.5)
      .setInteractive({
        useHandCursor: true
      });

    playButton.on(
      "pointerover",
      () => {
        playButton.setColor("#4ade80");
      }
    );

    playButton.on(
      "pointerout",
      () => {
        playButton.setColor("#ffffff");
      }
    );

    playButton.on(
      "pointerdown",
      () => {
        this.scene.start(
          "GameScene",
          {
            level: 1,
            deaths: 0,
            multiplayer: true
          }
        );
      }
    );

    // Level button
    const levelButton = this.add
      .text(
        width / 2,
        350,
        "SELECT LEVEL",
        {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#ffffff",
          backgroundColor: "#333333",
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

    levelButton.on(
      "pointerdown",
      () => {
        this.scene.start(
          "LevelSelectScene"
        );
      }
    );

    // Back button
    const backButton = this.add
      .text(
        width / 2,
        440,
        "BACK",
        {
          fontFamily: "Arial",
          fontSize: "22px",
          color: "#333333",
          backgroundColor: "#ffffff",
          padding: {
            left: 20,
            right: 20,
            top: 8,
            bottom: 8
          }
        }
      )
      .setOrigin(0.5)
      .setInteractive({
        useHandCursor: true
      });

    backButton.on(
      "pointerdown",
      () => {
        this.scene.start(
          "MenuScene"
        );
      }
    );
  }
}
