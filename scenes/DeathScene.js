
class DeathScene extends Phaser.Scene{

  constructor() {
    super("dead");
  }

  create()  {
    cursorKeys = this.input.keyboard.createCursorKeys();
    if (charge === 0) {
      this.add.text(400, 300, 'you ran out of charge...');
      soundtrack.pause();
      scaryMusic.pause();
    }
    else if (happiness === 0)  {
      this.add.text(400, 300, 'you became depressed');
    }
    else if (sanity === 0) {
      this.add.text(400, 300, 'you lost your mind');
    }
  }
  update()  {
    if (this.input.keyboard.checkDown(cursorKeys.space, 1000))  {
      this.scene.stop("ui");
      this.scene.start("game");
    }
  }
}
