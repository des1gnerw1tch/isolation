var box;
var bar;
var meterText;
var dayText;
var hourText;
var chargeBar;
var happinessBar;
var sanityBar;
var alarmPlaying = false;
//sounds
var lowChargeAlarm;
class UIScene extends Phaser.Scene  {

  constructor() {
    super("ui");
  }

  create()  {
    //set meters
    meterText = this.add.text(32, 32, '',  {fill: '#00ff00' });

    //bars
    box = this.add.graphics();
    box.fillStyle(0x222222, .8);
    box.fillRect(150, 32, 100, 13);
    box.fillRect(150, 48, 100, 13)
    box.fillRect(150, 64, 100, 13);

    chargeBar = this.add.graphics({
     fillStyle: {
        color: 0x32CD32 // green
      }
    })

    happinessBar = this.add.graphics({
      fillStyle: {
        color: 0x32CD32 // green
      }
    })

    sanityBar = this.add.graphics({
      fillStyle: {
        color: 0x32CD32 // green
      }
    })

  //day and hour text
  dayText = this.add.text(650, 25, '', {fontSize: 32});
  hourText = this.add.text(650, 75, '', {fontSize: 18});

  //sound effects
  lowChargeAlarm = this.sound.add('lowHealth');
  lowChargeAlarm.setLoop(true);

  }

  update()  {
    //meter text
    meterText.setText('Charge ' + charge.toFixed(2) +
    '\nHappy ' + happiness.toFixed(2) + '\nSanity ' + sanity.toFixed(2)
  + '\n Charge rate ' + chargeRate + '\n Happy rate ' + happinessRate + '\n Sanity rate ' + sanityRate
 + '\n Speed Boost? ' + speedBoost);
    //bars for categories

    /*Charge Bar- this code handles the audio for the low battery alarm also, when
    battery is low, and is not dead, the robot will play this sound over and
    over. */

    chargeBar.clear();
    //handles color
    if (charge < 30)  {
      chargeBar.fillStyle(0xff0000);//red
    }  else {
      chargeBar.fillStyle(0x32CD32);
    }
    //handles alarm
    if (charge < 30 && !isDead)  {
      if (!alarmPlaying)  {
        lowChargeAlarm.play();
        console.log('played alarm');
        alarmPlaying = true;
        soundtrack.setVolume(.1);
    }
  } else {
    alarmPlaying = false;
    lowChargeAlarm.pause();
    soundtrack.setVolume(1);
  }


    //happiness bar
    happinessBar.clear();
    if (happiness < 30)  {
      happinessBar.fillStyle(0xff0000);//red
    } else {
      happinessBar.fillStyle(0x32CD32);//green
    }

    //sanity bar stuff
    sanityBar.clear();
    if (sanity < 30)  {
      sanityBar.fillStyle(0xff0000);//red
    } else {
      sanityBar.fillStyle(0x32CD32);//green
    }
    chargeBar.fillRect(150, 32, charge, 13);
    happinessBar.fillRect(150, 48, happiness, 13);
    sanityBar.fillRect(150, 64, sanity, 13);

    /*day and hour text. hour variable is in military time,
    code below converts it into time that regular beings see :)*/
    dayText.setText('Day: '+ day);

    if (hour < 12)  {
      hourText.setText(hour + ':00 AM');
    } else if (hour === 12) {
      hourText.setText(hour + ':00 PM');
    } else if (hour === 24) {
      hourText.setText((hour - 12) + ':00 AM');
    } else {
      hourText.setText((hour - 12) + ':00 PM')
    }


  }
}
