import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
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
        100,
        "TRAP RUNNER",
        {
          fontFamily: "Arial",
          fontSize: "64px",
          color: "#ff3333",
          fontStyle: "bold"
        }
      )
      .setOrigin(0.5);

    // ==========================================
    // SUBTITLE
    // ==========================================

    this.add
      .text(
        width / 2,
        170,
        "A chaotic trap-based platformer",
        {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#222222"
        }
      )
      .setOrigin(0.5);

    // ==========================================
    // PLAY BUTTON
    // ==========================================

    const playButton = this.add
      .text(
        width / 2,
        280,
        "PLAY",
        {
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
          "LevelSelectScene"
        );
      }
    );

    // ==========================================
    // MULTIPLAYER BUTTON
    // ==========================================

    const multiplayerButton = this.add
      .text(
        width / 2,
        380,
        "MULTIPLAYER",
        {
          fontFamily: "Arial",
          fontSize: "30px",
          color: "#ffffff",
          backgroundColor: "#2563eb",
          padding: {
            left: 25,
            right: 25,
            top: 12,
            bottom: 12
          }
        }
      )
      .setOrigin(0.5)
      .setInteractive({
        useHandCursor: true
      });

    multiplayerButton.on(
      "pointerover",
      () => {
        multiplayerButton.setColor(
          "#4ade80"
        );
      }
    );

    multiplayerButton.on(
      "pointerout",
      () => {
        multiplayerButton.setColor(
          "#ffffff"
        );
      }
    );

    multiplayerButton.on(
      "pointerdown",
      () => {
        this.scene.start(
          "MultiplayerScene"
        );
      }
    );

    // ==========================================
    // CONTROLS
    // ==========================================

    this.add
      .text(
        width / 2,
        475,
        "Arrow Keys / WASD to move • W / UP to jump",
        {
          fontFamily: "Arial",
          fontSize: "18px",
          color: "#333333"
        }
      )
      .setOrigin(0.5);

    // ==========================================
    // VERSION
    // ==========================================

    this.add
      .text(
        width / 2,
        height - 25,
        "Trap Runner • Original Game",
        {
          fontFamily: "Arial",
          fontSize: "14px",
          color: "#444444"
        }
      )
      .setOrigin(0.5);
  }
}
