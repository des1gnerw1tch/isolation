var isLifting;
var last;
var liftPopup;
class WeightScene extends Phaser.Scene  {

  constructor() {
    super("liftWeight");
  }
  create()  {
    isLifting = true;
    liftPopup = this.add.image(400, 300, 'liftPopup');
    liftPopup.setFrame(0);

  }
  update()  {
    if (keys.A.isDown)  {
      if (last === 'D')  {
        sanity += 2;
        happiness += 1;
        charge -= 2;
      }
      last = 'A';
      robot.setFrame(21);
      liftPopup.setFrame(2)

    }
    else if (keys.D.isDown)  {
      if (last === 'A')  {
        sanity += 2;
        happiness += 1;
        charge -= 2;
      }
      last = 'D';
      robot.setFrame(23);
      liftPopup.setFrame(1)
    } else {
      robot.setFrame(20);
    }

    if ( isDead || !(robotInteracting))  {
      isLifting = false;
      this.scene.stop('liftWeight');
    }
  }

}
