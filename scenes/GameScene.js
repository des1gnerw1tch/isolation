//player
var robot;
//input
var keys;
var lastKey;
var isKeyDown;
//meters
var meterText;
var charge;

//stations
var chargeStation;

//timers
var tick;
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
    //world
    this.physics.world.setBounds(40, 30, 720, 540);
    robot.body.collideWorldBounds=true;
    chargeStation = this.physics.add.sprite(600, 400, 'chargeStation', 0).setScale(.5);
    //decay and meters
    charge = 100;
    tick = this.time.addEvent({delay: 500, callback: this.decay, callbackScope: this, loop: true});
    //launch UI
    this.scene.launch("ui");
    //colliders
    this.physics.add.overlap(robot, chargeStation, this.chargeRobot, null, this);


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
    //this is what ticks every half of a second.

    /* if robot is overlapping with charger, then charge will go up. f
    not, charge will go down. */
    if (this.physics.overlap(robot, chargeStation)) {
      chargeStation.anims.play('blink', true);
      charge += 2;
      if (charge > 100) {
        charge = 100;
      }
    } else {
      chargeStation.anims.play('blink', false);
      charge -= 1;
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
