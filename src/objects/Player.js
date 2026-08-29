import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(false);
    this.setBounce(0);

    this.speed = 240;
    this.jumpPower = 500;

    this.dead = false;
  }

  update(cursors, keys) {
    if (this.dead) {
      return;
    }

    const left =
      cursors.left.isDown ||
      keys.A.isDown;

    const right =
      cursors.right.isDown ||
      keys.D.isDown;

    const jump =
      Phaser.Input.Keyboard.JustDown(cursors.up) ||
      Phaser.Input.Keyboard.JustDown(keys.W) ||
      Phaser.Input.Keyboard.JustDown(cursors.space);

    if (left) {
      this.setVelocityX(-this.speed);
      this.setFlipX(true);
    } else if (right) {
      this.setVelocityX(this.speed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (
      jump &&
      this.body.blocked.down
    ) {
      this.setVelocityY(-this.jumpPower);
    }
  }

  kill() {
    if (this.dead) {
      return;
    }

    this.dead = true;

    this.setVelocity(0, 0);

    this.scene.time.delayedCall(
      300,
      () => {
        this.scene.playerDied();
      }
    );
  }
}
