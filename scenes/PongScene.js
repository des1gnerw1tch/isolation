var player;
var ai;
var pointer;
var debugText;
var ball;
var maxY;
var hitSound;
var loseSound;
var score;
var scoreText;
class PongScene extends Phaser.Scene{
  constructor() {
    super("pong");
  }

  create()  {

    /*when setting camera, it changes the x and y values of the
    whole scene*/
    this.cameras.main.setViewport(200, 150, 400, 300);
    this.cameras.main.setBackgroundColor('#000');

    /*world*/
    this.physics.world.setBounds(0, 0, 400, 300);
    /*player */
    player = this.physics.add.sprite(200, 280, 'paddle');
    player.body.collideWorldBounds = false;
    player.setImmovable();
    /*Ai*/
    ai = this.physics.add.sprite(200, 20, 'paddle');
    ai.setImmovable();
    /*ball*/
    ball = this.physics.add.sprite(200, 150, 'ball');
    this.time.addEvent({delay: 1000, callback: this.startGame, callbackScope: this, loop: false});
    //ball.setVelocityY(600);
    ball.setBounce(1);
    ball.body.collideWorldBounds = true;
    /*input*/
    pointer = this.input.activePointer;

    //debug
    debugText = this.add.text(100, 100);
    maxY = 0;
    //colliders
    this.physics.add.collider(ball, player, this.collideFunc, null, this);
    this.physics.add.collider(ball, ai, this.collideFuncAI, null, this);
    /*game*/
    scoreText = this.add.text(10, 10).setDepth(1);
    score = 0;



    //sound effects
    hitSound = this.sound.add('hit');
    loseSound = this.sound.add('lose');
    loseSound.setVolume(100);
  }
  update()  {
    //change in state of robot
    if ( isDead || !(robotInteracting))  {

      this.scene.stop("pong");
    }

    player.x = pointer.x - 200;
    ai.x = ball.x;

    /*debug menu, helped with creating*/
    /*if (ball.y > maxY)  {
      maxY = ball.y;
    }
    debugText.setText('player x ' + player.x + '\n ball x ' + ball.x + '\n ball y ' + ball.y
    + '\nmax ball.y ' + maxY);*/
    /*ui*/
    scoreText.setText(score);

    if (ball.y === 295) {
      this.endGame();
    }
  }

  collideFunc() {
    var dif = ball.x - player.x;
    if (dif < 20)  {
      ball.setVelocityX(dif * 7);
    } else if (dif > 20) {
      ball.setVelocityX(dif * 7);
    } else {
      ball.setVelocityX(0);
    }
    hitSound.play();
    score +=1;
    happiness += 20;
    //sanity += 5;
  }

  collideFuncAI() {
    var dif = ball.x - (ai.x + Phaser.Math.Between(-50, 50));
    if (dif < 20)  {
      ball.setVelocityX(dif * 10);
    } else if (dif > 20) {
      ball.setVelocityX(dif * 10);
    } else {
      ball.setVelocityX(0);
    }
    hitSound.play();
  }
  startGame() {
    ball.setVelocityY(600);
  }
  endGame() {
    happiness -= 10;
    sanity -= 20;
    loseSound.play();
    this.scene.stop("pong");
  }
}
