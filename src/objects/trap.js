import Phaser from "phaser";

export default class Trap extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "spike");

    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    this.activeTrap = false;

    this.setVisible(false);
  }

  activate() {
    this.activeTrap = true;

    this.setVisible(true);

    this.setActive(true);
  }

  deactivate() {
    this.activeTrap = false;

    this.setVisible(false);

    this.setActive(false);
  }
}
