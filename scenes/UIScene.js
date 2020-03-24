class UIScene extends Phaser.Scene  {

  constructor() {
    super("ui");
  }

  create()  {
    //set meters
    meterText = this.add.text(32, 32, '',  {fill: '#00ff00' });
  }

  update()  {
    //meter UI
    meterText.setText('Charge: ' + charge + '%');

  }
}
