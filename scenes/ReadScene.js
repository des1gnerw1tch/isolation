var readTimer;
var readBox;
var readBar;
class ReadScene extends Phaser.Scene {
  constructor() {
    super("read");
  }

  create()  {
    //book image
    this.add.image(400, 300, 'book');
    //it will take 10 seconds to read a book
    readTimer = this.time.addEvent({delay: 10000, callback: this.finishRead, callbackScope: this, loop: false});
    //box and bar for the book
    readBox = this.add.graphics();
    readBox.fillStyle(0x222222, .8);
    readBox.fillRect(300, 420, 200, 20);

    readBar = this.add.graphics({
    fillStyle: {
      color: 0x32CD32 // green
    }
  })

  }

  update()  {
    if (this.input.keyboard.checkDown(keys.W, 1000) || this.input.keyboard.checkDown(keys.A, 1000)
    || this.input.keyboard.checkDown(keys.S, 1000) || this.input.keyboard.checkDown(keys.D, 1000))  {

      this.scene.stop('read');
    }

    readBar.clear();
    readBar.fillRect(300, 420, readTimer.getProgress() * 200, 20);

  }
  finishRead()  {
    happiness += 10;
    sanity += 40;
    this.scene.stop('read');
  }
}