class ToogleButton extends Phaser.GameObjects.Container {

    constructor(scene,x,y,w,h, backgroundColor, border, bordeColor, trueText,falseText, action) {
        let button = scene.add.rectangle(0,0,w,h, backgroundColor);
        button.setStrokeStyle(border, bordeColor);
        button.setInteractive();
        button.on(
        "pointerdown",
        () => {
            action();
            this.isVisible = !this.isVisible;
            if(this.isVisible) {
                text.setText(trueText);
            } else {
                text.setText(falseText);
            }
        });

        let text = scene.add.text(0,0,trueText, {fontSize:40});
        text.setOrigin(0.5);
        super(scene,x,y,[button,text]);
        this.isVisible = true;
        scene.add.existing(this);
    }

}