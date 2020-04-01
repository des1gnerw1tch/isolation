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
    //this.load.image('room', 'assets/roomLayout.png');
    this.load.image('wallH', 'assets/wallHorizontal.png');
    this.load.image('wallV', 'assets/wallVertical.png');

    //sprites

    this.load.spritesheet('robot', 'assets/robot.png', { frameWidth: 48, frameHeight: 51 });
    //interactive objects
    this.load.spritesheet('chargeStation', 'assets/charger.png', { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet('tv', 'assets/tv.png', { frameWidth: 112, frameHeight: 112 });
    this.load.image('bookshelf', 'assets/bookshelf.png');
    this.load.image('dumbbells', 'assets/dumbbells.png');
    this.load.spritesheet('pc', 'assets/computer.png', { frameWidth: 160, frameHeight: 160 });
    //props
    this.load.image('lamp', 'assets/lamp.png');
    this.load.image('seat', 'assets/seat.png');
    this.load.image('sofa', 'assets/sofa.png');
    this.load.image('coffeeTable', 'assets/coffeeTable.png');
    this.load.image('officeRug', 'assets/officeRug.png');
    //scene screens
    this.load.image('book', 'assets/book.png');
    this.load.spritesheet('liftPopup', 'assets/liftPopup.png', { frameWidth: 240, frameHeight: 180 });

    //music
    this.load.audio('mainTheme', 'assets/town.mp3');
    //sound effects
    this.load.audio('ambientSound', 'assets/ambientSound.wav');
    this.load.audio('bigBro', 'assets/girlBigBro.mp3');
    this.load.audio('girlTrapped', 'assets/girlTrapped.mp3');
    this.load.audio('shutter', 'assets/shutter.mp3');
    this.load.audio('boost', 'assets/boost.wav');
    this.load.audio('lowHealth', 'assets/lowHealth.wav');
    //pong
    this.load.image('paddle', 'assets/paddle.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.audio('hit', 'assets/hit.wav');
    this.load.audio('lose', 'assets/back.wav');


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
    this.anims.create({
      key: 'lift',
      frames: this.anims.generateFrameNumbers('robot', {start: 20, end: 23}),
      frameRate: 6,
      repeat: -1
    })
    this.anims.create({
      key: 'off',
      frames: this.anims.generateFrameNumbers('robot', {start: 24, end: 29}),
      frameRate: 6
    })

    //charging station

    this.anims.create({
      key: 'still',
      frames: [ { key: 'chargeStation', frame: 3 } ],
      frameRate: 8,
    })
    this.anims.create({
      key: 'blink',
      frames: this.anims.generateFrameNumbers('chargeStation', {start: 0, end: 1}),
      frameRate: 8,
      repeat: -1
    })

    //tv animations
    this.anims.create({
      key: 'off',
      frames: [ { key: 'tv', frame: 0 } ],
      frameRate: 8
    })

    this.anims.create({
      key: 'on',
      frames: this.anims.generateFrameNumbers('tv', {start: 5, end: 9}),
      frameRate: 5,
      repeat: -1
    })

    this.anims.create({
      key: 'static',
      frames: this.anims.generateFrameNumbers('tv', {start: 10, end: 12}),
      frameRate: 8,
      repeat: -1
    })



    this.scene.start('game');

  }
}
