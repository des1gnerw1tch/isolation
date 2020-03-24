class LoadScene extends Phaser.Scene{
  constructor(){
    super("loadGame");
  }

  preload() {

    var box = this.add.graphics();
    box.fillStyle(0x9400D3, 0.8);
    box.fillRect(0, 0, 800, 600);

    //robots room
    this.load.image('room', 'assets/room.png');

    //sprites

    this.load.spritesheet('robot', 'assets/robot.png', { frameWidth: 48, frameHeight: 51 });
    this.load.spritesheet('chargeStation', 'assets/charger.png', { frameWidth: 80, frameHeight: 80 });


  }
  create()  {
    this.add.text(400, 400, 'loading');
    //robot animations
    this.anims.create({
      key: 'idleF',
      frames: [ { key: 'robot', frame: 0 } ],
      frameRate: 10,
    })

    this.anims.create({
      key: 'idleR',
      frames: [ { key: 'robot', frame: 1 } ],
      frameRate: 10,
    })

    this.anims.create({
      key: 'idleU',
      frames: [ { key: 'robot', frame: 2 } ],
      frameRate: 10,
    })

    this.anims.create({
      key: 'idleL',
      frames: [ { key: 'robot', frame: 3 } ],
      frameRate: 10,
    })

    this.anims.create({
      key: 'walkDown',
      frames: this.anims.generateFrameNumbers('robot', {start: 4, end: 7}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'walkRight',
      frames: this.anims.generateFrameNumbers('robot', {start: 8, end: 11}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'walkLeft',
      frames: this.anims.generateFrameNumbers('robot', {start: 12, end: 15}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'walkUp',
      frames: this.anims.generateFrameNumbers('robot', {start: 16, end: 19}),
      frameRate: 10,
      repeat: -1
    })
    //charging station
    this.anims.create({
      key: 'blink',
      frames: this.anims.generateFrameNumbers('chargeStation', {start: 0, end: 1}),
      frameRate: 8,
      repeat: -1
    })



    this.scene.start('game');

  }
}
