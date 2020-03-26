var box;
var bar;
var meterText;
var dayText;
var hourText;
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

    bar = this.add.graphics({
    fillStyle: {
      color: 0x32CD32 // green
    }
  })
  //day and hour text
  dayText = this.add.text(650, 25, '', {fontSize: 32});
  hourText = this.add.text(650, 75, '', {fontSize: 18});

  }

  update()  {
    //meter text
    meterText.setText('Charge ' + charge.toFixed(2) +
    '\nHappy ' + happiness.toFixed(2) + '\nSanity ' + sanity.toFixed(2));
    //bars for categories
    bar.clear();
    bar.fillRect(150, 32, charge, 13);
    bar.fillRect(150, 48, happiness, 13);
    bar.fillRect(150, 64, sanity, 13);

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
