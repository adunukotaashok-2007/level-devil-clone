import Phaser from "phaser";

import Player from "../objects/Player.js";
import Trap from "../objects/Trap.js";

import level1 from "../levels/Level1.js";
import level2 from "../levels/Level2.js";
import level3 from "../levels/Level3.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  init(data) {
    this.levelNumber = data.level || 1;
    this.deaths = data.deaths || 0;

    this.socket = null;
    this.playerId = null;
    this.remotePlayers = {};

    this.multiplayerConnected = false;
    this.levelFinished = false;
  }

  create() {
    this.createBackground();
    this.loadLevel();
    this.createControls();
    this.createUI();
    this.setupCamera();
    this.setupMultiplayer();
  }

  createBackground() {
    this.add.rectangle(
      1200,
      300,
      3000,
      700,
      0x87ceeb
    );

    this.add.rectangle(
      1200,
      520,
      3000,
      40,
      0x7c7c7c
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

    // ==============================
    // PLATFORMS
    // ==============================

    this.platforms =
      this.physics.add.staticGroup();

    data.platforms.forEach((platform) => {
      const object = this.platforms.create(
        platform.x,
        platform.y,
        "platform"
      );

      object.setOrigin(0.5);

      object.displayWidth =
        platform.width;

      object.displayHeight = 20;

      object.refreshBody();
    });

    // ==============================
    // TRAPS
    // ==============================

    this.traps =
      this.physics.add.staticGroup();

    data.traps.forEach((trap) => {
      const spike = new Trap(
        this,
        trap.x,
        trap.y
      );

      spike.activate();

      this.traps.add(spike);
    });

    // ==============================
    // PLAYER
    // ==============================

    this.player = new Player(
      this,
      data.player.x,
      data.player.y
    );

    this.physics.add.collider(
      this.player,
      this.platforms
    );

    // ==============================
    // TRAP COLLISION
    // ==============================

    this.physics.add.overlap(
      this.player,
      this.traps,
      () => {
        if (!this.player.dead) {
          this.player.kill();
        }
      }
    );

    // ==============================
    // FINISH
    // ==============================

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
        if (
          !this.player.dead &&
          !this.levelFinished
        ) {
          this.levelComplete();
        }
      }
    );

    // ==============================
    // WORLD BOUNDS
    // ==============================

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
    // ==============================
    // DEATH COUNTER
    // ==============================

    this.deathText = this.add
      .text(
        20,
        20,
        `Deaths: ${this.deaths}`,
        {
          fontFamily: "Arial",
          fontSize: "22px",
          color: "#000000",
          fontStyle: "bold"
        }
      )
      .setScrollFactor(0);

    // ==============================
    // LEVEL TEXT
    // ==============================

    this.levelText = this.add
      .text(
        20,
        50,
        `Level ${this.levelNumber}`,
        {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "#000000",
          fontStyle: "bold"
        }
      )
      .setScrollFactor(0);

    // ==============================
    // MULTIPLAYER STATUS
    // ==============================

    this.multiplayerText = this.add
      .text(
        20,
        80,
        "Multiplayer: Connecting...",
        {
          fontFamily: "Arial",
          fontSize: "17px",
          color: "#000000"
        }
      )
      .setScrollFactor(0);

    // ==============================
    // RESTART BUTTON
    // ==============================

    const restart = this.add
      .text(
        850,
        20,
        "RESTART",
        {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "#ffffff",
          backgroundColor: "#333333",
          padding: 10
        }
      )
      .setScrollFactor(0)
      .setInteractive({
        useHandCursor: true
      });

    restart.on(
      "pointerover",
      () => {
        restart.setColor("#4ade80");
      }
    );

    restart.on(
      "pointerout",
      () => {
        restart.setColor("#ffffff");
      }
    );

    restart.on(
      "pointerdown",
      () => {
        this.restartLevel();
      }
    );
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

  setupMultiplayer() {
    /*
      IMPORTANT:

      Replace this with your actual
      WebSocket server address.

      Example:

      const serverURL =
        "wss://your-server.example.com";
    */

    const serverURL =
      "wss://YOUR-MULTIPLAYER-SERVER";

    if (
      serverURL.includes(
        "YOUR-MULTIPLAYER-SERVER"
      )
    ) {
      this.multiplayerText.setText(
        "Multiplayer: Server not configured"
      );

      return;
    }

    try {
      this.socket =
        new WebSocket(serverURL);

      this.socket.onopen = () => {
        this.multiplayerConnected =
          true;

        this.multiplayerText.setText(
          "Multiplayer: Connected"
        );

        this.socket.send(
          JSON.stringify({
            type: "join",
            level: this.levelNumber
          })
        );

        this.sendPlayerData();
      };

      this.socket.onmessage =
        (event) => {
          try {
            const data =
              JSON.parse(event.data);

            this.handleMultiplayerMessage(
              data
            );
          } catch (error) {
            console.error(
              "Invalid multiplayer data:",
              error
            );
          }
        };

      this.socket.onclose = () => {
        this.multiplayerConnected =
          false;

        this.multiplayerText.setText(
          "Multiplayer: Disconnected"
        );
      };

      this.socket.onerror = () => {
        this.multiplayerConnected =
          false;

        this.multiplayerText.setText(
          "Multiplayer: Connection error"
        );
      };
    } catch (error) {
      console.error(
        "Multiplayer error:",
        error
      );

      this.multiplayerText.setText(
        "Multiplayer: Offline"
      );
    }
  }

  sendPlayerData() {
    if (
      !this.socket ||
      this.socket.readyState !==
        WebSocket.OPEN
    ) {
      return;
    }

    if (!this.player) {
      return;
    }

    this.socket.send(
      JSON.stringify({
        type: "playerMove",
        x: this.player.x,
        y: this.player.y,
        velocityX:
          this.player.body
            ? this.player.body.velocity.x
            : 0,
        velocityY:
          this.player.body
            ? this.player.body.velocity.y
            : 0,
        level: this.levelNumber
      })
    );
  }

  handleMultiplayerMessage(data) {
    if (data.type === "welcome") {
      this.playerId = data.id;
      return;
    }

    if (data.type === "players") {
      this.updateRemotePlayers(
        data.players
      );
      return;
    }

    if (data.type === "playerJoined") {
      this.createRemotePlayer(
        data.player
      );
      return;
    }

    if (data.type === "playerLeft") {
      this.removeRemotePlayer(
        data.id
      );
    }
  }

  updateRemotePlayers(players) {
    if (!players) {
      return;
    }

    Object.keys(players).forEach(
      (id) => {
        if (id === this.playerId) {
          return;
        }

        const data = players[id];

        if (
          data.level &&
          data.level !== this.levelNumber
        ) {
          return;
        }

        if (
          !this.remotePlayers[id]
        ) {
          this.createRemotePlayer(
            data
          );
        } else {
          const remote =
            this.remotePlayers[id];

          remote.targetX = data.x;
          remote.targetY = data.y;
        }
      }
    );

    Object.keys(
      this.remotePlayers
    ).forEach((id) => {
      if (!players[id]) {
        this.removeRemotePlayer(id);
      }
    });
  }

  createRemotePlayer(data) {
    if (!data || !data.id) {
      return;
    }

    if (
      data.id === this.playerId
    ) {
      return;
    }

    if (
      this.remotePlayers[data.id]
    ) {
      return;
    }

    const remote =
      this.add.rectangle(
        data.x || 100,
        data.y || 400,
        32,
        42,
        0xff3333
      );

    remote.targetX =
      data.x || 100;

    remote.targetY =
      data.y || 400;

    remote.playerId =
      data.id;

    this.remotePlayers[data.id] =
      remote;
  }

  removeRemotePlayer(id) {
    if (
      !this.remotePlayers[id]
    ) {
      return;
    }

    this.remotePlayers[id].destroy();

    delete this.remotePlayers[id];
  }

  updateRemotePlayerPositions() {
    Object.values(
      this.remotePlayers
    ).forEach((remote) => {
      if (
        typeof remote.targetX ===
        "number"
      ) {
        remote.x =
          Phaser.Math.Linear(
            remote.x,
            remote.targetX,
            0.25
          );
      }

      if (
        typeof remote.targetY ===
        "number"
      ) {
        remote.y =
          Phaser.Math.Linear(
            remote.y,
            remote.targetY,
            0.25
          );
      }
    });
  }

  update() {
    if (!this.player) {
      return;
    }

    if (!this.player.dead) {
      this.player.update(
        this.cursors,
        this.keys
      );
    }

    this.sendPlayerData();

    this.updateRemotePlayerPositions();

    // Player fell off the map
    if (
      this.player.y > 650 &&
      !this.player.dead
    ) {
      this.player.kill();
    }
  }

  playerDied() {
    this.deaths++;

    this.scene.restart({
      level: this.levelNumber,
      deaths: this.deaths
    });
  }

  restartLevel() {
    this.scene.restart({
      level: this.levelNumber,
      deaths: this.deaths
    });
  }

  levelComplete() {
    if (this.levelFinished) {
      return;
    }

    this.levelFinished = true;

    this.physics.pause();

    // ==============================
    // COMPLETE PANEL
    // ==============================

    this.add
      .rectangle(
        400,
        270,
        500,
        200,
        0xffffff,
        0.92
      )
      .setScrollFactor(0);

    this.add
      .text(
        400,
        220,
        "LEVEL COMPLETE!",
        {
          fontFamily: "Arial",
          fontSize: "40px",
          color: "#16a34a",
          fontStyle: "bold"
        }
      )
      .setOrigin(0.5)
      .setScrollFactor(0);

    // ==============================
    // NEXT BUTTON
    // ==============================

    const next = this.add
      .text(
        400,
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

    next.on(
      "pointerover",
      () => {
        next.setColor("#4ade80");
      }
    );

    next.on(
      "pointerout",
      () => {
        next.setColor("#ffffff");
      }
    );

    next.on(
      "pointerdown",
      () => {
        if (this.levelNumber < 3) {
          this.scene.restart({
            level:
              this.levelNumber + 1,
            deaths: 0
          });
        } else {
          this.scene.start(
            "LevelSelectScene"
          );
        }
      }
    );
  }

  shutdown() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    Object.keys(
      this.remotePlayers
    ).forEach((id) => {
      this.removeRemotePlayer(id);
    });
  }
}
