//player
var robot;
//input
var keys;
var lastKey;
var isKeyDown;
//meters
var charge;
var happiness;
var sanity;

//stations
var chargeStation;
var tv;

//timers
var tick;
var hourTimer;

//decay rates
var chargeRate;
var happinessRate;
var sanityRate;

//progress and days
var day;
var hour;

//groups
var walls;

class GameScene extends Phaser.Scene  {

  constructor() {
    super("game");
  }

  create()  {
    //backdrop
    this.add.image(400, 300, 'room');
    //sprite
    robot = this.physics.add.sprite(400, 300, 'robot', 8);
    robot.setScale(.5);
    robot.setDepth(1);
    //input
    keys = this.input.keyboard.addKeys('W,S,A,D, G');
    //camera
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.startFollow(robot, true);
    this.cameras.main.setZoom(2);
    //groups
    walls = this.physics.add.staticGroup();
    //world
    this.physics.world.setBounds(40, 30, 720, 540);
    robot.body.collideWorldBounds=true;
    this.buildWalls();
    this.placeObjects();

    //decay and meters
    charge = 100;
    happiness = 100;
    sanity = 100;
    chargeRate = -.2;
    happinessRate = -.2;
    sanityRate = -.2;
    tick = this.time.addEvent({delay: 100, callback: this.decay, callbackScope: this, loop: true});
    //day and hours
    day = 1;
    hour = 7;
    hourTimer = this.time.addEvent({delay: 1000, callback: this.changeTime, callbackScope: this, loop: true});
    //launch UI
    this.scene.launch("ui");
    //colliders
    this.physics.add.collider(robot, walls);

  }
  update()  {

    //movement and animations
    if (keys.A.isDown)  {
        robot.setVelocityX(-200);
        robot.anims.play('walkLeft', true);
        lastKey = 'A';
      }
      else if (keys.D.isDown) {
        robot.setVelocityX(200);
        robot.anims.play('walkRight', true);
        lastKey = 'D';
      }
      else {
        robot.setVelocityX(0);
      }
      if (keys.S.isDown) {
        robot.setVelocityY(200);
        robot.anims.play('walkDown', true);
        lastKey = 'S';
      }
      else if (keys.W.isDown) {
        robot.setVelocityY(-200);
        robot.anims.play('walkUp', true);
        lastKey = 'W';
      } else {
        robot.setVelocityY(0);
      }

      //idle animations
      isKeyDown = this.checkKeysDown();
      if(!isKeyDown)  {
        switch(lastKey) {
          case 'W':
            robot.anims.play('idleU', true);
            break;
          case 'S':
            robot.anims.play('idleF', true);
            break;
          case 'A':
            robot.anims.play('idleL', true);
            break;
          case 'D':
            robot.anims.play('idleR', true);
            break;
        }
      }

  }

  decay() {
    //this is what ticks every tenth of a second.

    /* if robot is overlapping with charger, then charge will go up. f
    not, charge will go down. */
    if (this.physics.overlap(robot, chargeStation)) {
      chargeStation.anims.play('blink', true);
      chargeRate = 2;
    } else {
      chargeStation.anims.play('still', true);
      chargeRate = -.2;
    }
    /*if robot is overlapping with the tv, happiness will go up, but
    productivity will go way down
    does not change battery*/
    if (this.physics.overlap(robot, tv) && lastKey === 'W') {
      tv.anims.play('on', true);
      happinessRate = .4;
    } else {
      tv.anims.play('static', true);
      happinessRate = -.2;
    }

    charge += chargeRate;
    happiness += happinessRate;
    sanity += sanityRate;

    //makes sure nothing gets past 100 or lower than 0
    if (charge > 100) {
      charge = 100;
    } else if (charge < 0){
      charge = 0;
    }
    if (happiness > 100) {
      happiness = 100;
    } else if (happiness < 0){
      happiness = 0;
    }
    if (sanity > 100) {
      sanity = 100;
    } else if (sanity < 0){
      sanity = 0;
    }

  }


  buildWalls()  {
    //walls
    //training room walls
    walls.create(120, 370, 'wallH');
    walls.create(180, 370, 'wallH');
  //  walls.create(300, 440, 'wallV');
    walls.create(300, 490, 'wallV');

    //library walls
    walls.create(170, 250, 'wallH');
    walls.create(250, 180, 'wallV');
    walls.create(250, 110, 'wallV');

    //bedroom walls
    walls.create(450, 490, 'wallV');
    walls.create(520, 420, 'wallH');
    walls.create(600, 420, 'wallH');

    //office walls
    walls.create(600, 230, 'wallH');
    walls.create(620, 230, 'wallH');
    walls.create(520, 160, 'wallV');

  }

  placeObjects()  {
    //objects
    chargeStation = this.physics.add.sprite(500, 550, 'chargeStation', 0).setScale(.5);
    tv = this.physics.add.sprite(400, 200, 'tv', 0).setScale(.5);
  }
  changeTime()  {
    hour++;
    if (hour === 24) {
      day++;

    } else if (hour === 25) {
      hour = 1;
    }
  }
  //checks if any movement keys are down
  checkKeysDown()  {
    if (keys.W.isDown || keys.S.isDown || keys.D.isDown || keys.A.isDown) {
      return true;
    } else {
      return false;
    }
  }

}
