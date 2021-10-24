var width = 800;
var height = 600;

class Game extends Phaser.Scene
{
    constructor ()
    {
        super('game');
    }

    preload ()
    {
        this.load.html('start', 'html/start.html');
    }

    create ()
    {
        let element = this.add.dom(width / 2, 0).createFromCache('start');
    
        this.tweens.add({
            targets: element,
            y: 200,
            duration: 500,
            ease: 'Power3'
        });

        setTimeout(() => {
            this.scene.start('main');
        },3000);
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent:"game",
        width: 800,
        height: 600
    },
    dom: {
        createContainer: true
    },
    scene: [Game, Main, Register]
};

let game = new Phaser.Game(config);

let url = new URL(window.location.href);
const jogo = url.searchParams.get("jogo");