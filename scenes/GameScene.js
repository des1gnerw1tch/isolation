/*give credit to: https://opengameart.org/content/generic-8-bit-jrpg-soundtrack
for main soundtrack
https://opengameart.org/content/little-girl-voices
for little girls noises
 */
//player
var robot;
//input
var keys;
var cursorKeys;
var lastKey;
var isKeyDown;
//meters
var charge;
var happiness;
var sanity;

//stations
var chargeStation;
var tv;
var bookshelf;
var dumbbells;
var popText;

//states
var robotInteracting;
var isDead;

//timers
var tick;
var hourTimer;

var trigScary;
var trigTime;

//decay rates
var chargeRate;
var happinessRate;
var sanityRate;

//progress and days
var day;
var hour;

//groups
var walls;

//music
var soundtrack;
var scaryMusic;
var happyMusicTrig;
var scaryMusicTrig;
//sounds
var girlVoice1;
var girlVoice2;

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
    robotInteracting = false;
    isDead = false;
    //input
    keys = this.input.keyboard.addKeys('W,S,A,D, J, L');
    cursorKeys = this.input.keyboard.createCursorKeys();
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
    popText = this.add.text(robot.x, robot.y, ' ',/* {fontSize: 12}*/).setScale(.5);
    //music
    soundtrack = this.sound.add('mainTheme');
    soundtrack.setLoop(true);
    soundtrack.play();
    happyMusicTrig = true;
    //sounds
    scaryMusic = this.sound.add('ambientSound');
    scaryMusic.setLoop = false;
    scaryMusicTrig = false;
    girlVoice1 = this.sound.add('girlTrapped');
    girlVoice2 = this.sound.add('bigBro');

  }
  update()  {

    //movement and animations

    if (!isDead)  {
      if (keys.A.isDown)  {
          robot.setVelocityX(-200);
          robot.anims.play('walkLeft', true);
          lastKey = 'A';
          //this ensures that robot stops interacting when movement is started
          robotInteracting = false;
        }
        else if (keys.D.isDown) {
          robot.setVelocityX(200);
          robot.anims.play('walkRight', true);
          lastKey = 'D';
          robotInteracting = false;
        }
        else {
          robot.setVelocityX(0);
        }
        if (keys.S.isDown) {
          robot.setVelocityY(200);
          robot.anims.play('walkDown', true);
          lastKey = 'S';
          robotInteracting = false;
        }
        else if (keys.W.isDown) {
          robot.setVelocityY(-200);
          robot.anims.play('walkUp', true);
          lastKey = 'W';
          robotInteracting = false;
        } else {
          robot.setVelocityY(0);
        }
    }

      /*idle animations. these are turned off when the robot is interacting
      or when is dead. */
      isKeyDown = this.checkKeysDown();
      if(!isKeyDown && !robotInteracting && !isDead)  {
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

      /* if robot is overlapping with charger, then charge will go up. f
      not, charge will go down. */
      if (this.physics.overlap(robot, chargeStation) && !isDead) {
        chargeStation.anims.play('blink', true);
        chargeRate = 2;
      } else {
        chargeStation.anims.play('still', true);
        chargeRate = -.2;
      }
      /*if robot is overlapping with the tv, happiness will go up, but
      productivity will go way down
      does not change battery*/
      if (this.physics.overlap(robot, tv) && lastKey === 'W' && !isDead) {
        tv.anims.play('on', true);
        happinessRate = .4;
        sanityRate = -.4;
      } else {
        tv.anims.play('static', true);
        happinessRate = -.2;
        sanityRate = -.2;
      }
      /*hides pop text when not overlapping*/
      /*if (!(this.physics.overlap(robot, bookshelf)) && !(this.physics.overlap(robot, dumbbells)) || robotInteracting) {
        popText.visible = false;
      }*/
      /*robot overlapping with bookshelf. If overlapping, pop up will
      say press space to read*/
      if (this.physics.overlap(robot, bookshelf) && !isDead) {
        popText.visible = true;
        popText.x = bookshelf.x - 30;
        popText.y = bookshelf.y + 50;
        popText.setText('Press Space to interact');
        if (this.input.keyboard.checkDown(cursorKeys.space, 1000))  {
          this.scene.launch('read');
          robotInteracting = true;
        }

      }
      //robot overlapping dumbbells
      if (this.physics.overlap(robot, dumbbells)) {
        if (!isDead)  {
          popText.visible = true;
          popText.x = dumbbells.x - 30;
          popText.y = dumbbells.y + 30;
          popText.setText('Press Space to interact');
          if (this.input.keyboard.checkDown(cursorKeys.space, 1000))  {
            robotInteracting = true;
            robot.anims.play('lift', true);
          }
        }
        /*when you pick up the dumbbell, the dumbbell on the ground
        should disappear. this makes it so..*/
        if (robotInteracting) {
          dumbbells.visible = false;
          chargeRate = -.6;
          happinessRate = 1;
          sanityRate = 2;
          /*popText.visible = false;*/
        } else {
          dumbbells.visible = true;
          chargeRate = -.2;
          happinessRate = -.2;
          sanityRate = -.2;
        }
      }

      /*hides pop text when not overlapping or when not interacting. Needs to be
      below all of the hover checks, so it can turn off poptext after interact.*/
      if (!(this.physics.overlap(robot, bookshelf)) && !(this.physics.overlap(robot, dumbbells)) || robotInteracting) {
        popText.visible = false;
      }

      /*this is what happens when sanity gets too low ....*/
      if (sanity < 34)  {
        var rand = Phaser.Math.Between(1, sanity * 10);
        if (rand === 1)
        this.cameras.main.shake(400 * (1-(sanity/100)));
        if (rand === 2)
        this.cameras.main.flash(400 * (1-(sanity/100)));
      }
      if (sanity < 34 && !scaryMusicTrig) {
        trigTime = Phaser.Math.Between(1000, 10000);
        trigScary = this.time.addEvent({delay: trigTime, callback: this.playScarySound, callbackScope: this, loop: false});
        soundtrack.pause();
        scaryMusicTrig = true;
        happyMusicTrig = false;
      }
      if (sanity > 34 && !happyMusicTrig) {
        soundtrack.play();
        scaryMusic.pause();
        trigScary.paused = true;
        happyMusicTrig = true;
        scaryMusicTrig = false;
      }

      /*This system ensures that this if statement below is only iterated once.
      If it was itererated more than once, then it would be weird and might
      make multiple timers. */
      if (charge === 0 && !isDead) {
        isDead = true;
        robotInteracting = false;
        tick.paused = true;
        hourTimer.paused = true;
        robot.anims.play('off', true);
        robot.setVelocityX(0);
        robot.setVelocityY(0);
        this.time.addEvent({delay: 5000, callback: this.death, callbackScope: this, loop: false});
      }

  }

  decay() {
    //this is what ticks every tenth of a second.

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
    bookshelf = this.physics.add.image(180, 40, 'bookshelf').setScale(.3);
    dumbbells = this.physics.add.image(70, 450, 'dumbbells').setScale(.3);
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

  /*play scary sound*/
  playScarySound()  {
    var num = Phaser.Math.Between(1, 3);
    trigTime = Phaser.Math.Between(6000, 16000);
    switch (num)  {
      case 1:
        if (!(scaryMusic.isPlaying)) {
          scaryMusic.play();
        } else {
          console.log('canceled scary noise');
        }
        break;
      case 2:
        girlVoice1.play();
        break;
      case 3:
       girlVoice2.play();
       break;
     }

     trigScary = this.time.addEvent({delay: trigTime, callback: this.playScarySound, callbackScope: this, loop: false});
   }

  death() {
    this.scene.launch("dead");
    this.scene.pause("game");
  }


}
