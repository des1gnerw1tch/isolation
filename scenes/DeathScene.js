
class DeathScene extends Phaser.Scene{

  constructor() {
    super("dead");
  }

  create()  {
    this.add.text(400, 300, 'you ran out of charge...');
    cursorKeys = this.input.keyboard.createCursorKeys();
    soundtrack.pause();
    scaryMusic.pause();
  }
  update()  {
    if (this.input.keyboard.checkDown(cursorKeys.space, 1000))  {
      this.scene.stop("ui");
      this.scene.start("game");
    }
  }
}
