class Main extends Phaser.Scene
{
    static direction = {
        UP : 0,
        RIGHT : 1,
        DOWN : 2,
        LEFT : 3
    }

    static directionMove = [
        {x:0,y:1},
        {x:1,y:0},
        {x:0,y:-1},
        {x:-1,y:0},
    ]

    constructor ()
    {
        super('main');
    }

    preload ()
    {
        this.load.html('list', '/html/list.html');
        this.load.json('jogo', "data/" + jogo + ".json"); 
    }

    create ()
    {
        let json = this.cache.json.get("jogo");
        try {
            this.diagonal = json.diagonal;
            this.reverse = json.reverse;
            this.lines = json.lines;
            this.words = json.words;
        } catch {
            alert("Jogo "+jogo+" inválido!");
            return;
        }

        this.selected = null;
        this.before = null;

        this.collection = [];

        let boxSize = 32;

        let y = boxSize;
        
        for(let i=0;i<this.lines.length;i++) {
            let line = this.lines[i];
            let letters = line.toUpperCase().split("");

            let x = boxSize; 
            this.collection[i] = [];

            for(let j=0;j<letters.length;j++) {
                let letterBox = new LetterBox(this,
                    x,
                    y,
                    letters[j],
                    i,
                    j);
                x += boxSize;

                this.collection[i][j] = letterBox;
            }
            y += boxSize;
        }

        let button = this.add.rectangle(750,60,80,80, 0x0000ff);
        button.setStrokeStyle(4, 0xdddddd);
        button.setInteractive();
        button.on(
        "pointerdown",
        () => {
            this.list.element.setVisible(!this.list.element.visible);
            /*this.hasWon = true;
            for(let i=0;i<this.collection.length;i++) {
                for(let j=0;j<this.collection[i].length;j++) {
                    if(this.collection[i][j] != null && !this.collection[i][j].isMatch()) {
                        this.hasWon = false;
                    }
                }
            }
            if(this.hasWon) {
                this.message = "Parabéns";
            } else {
                this.message = "Tente novamente";
            }
            this.showMessage();*/
        });

        this.list = new List(this, json.title,json.list);
    }

    keyPress(key) {
        return function() {
            if(this.selected && !this.selected.isVisible) {
                this.selected.setText(key);
            }
        }
    }

    showMessage(isTip) {
        let back = this.add.rectangle(0,0,800,600,0x000000);
        back.alpha = 0.6;
        back.setOrigin(0);
  
        let text;
        if(isTip) {
            text = this.add.text(400, 300, this.message, { 
                backgroundColor: '#68b5e9',
                fontFamily: "Arial Black",
                fontSize: 43 , 
                wordWrap: { width: 780, useAdvancedWrap: true }
            });
            text.setOrigin(0.5);
            text.setPadding(64, 16);
        } else {
            text = this.add.text(400, 300, this.message, { fontFamily: "Arial Black", fontSize: 82 });
            text.setOrigin(0.5);
      
            text.setStroke('#000000', 4);
            //  Apply the gradient fill.
            const gradient = text.context.createLinearGradient(0, 0, 0, text.height);
      
            if(this.hasWon) {
              gradient.addColorStop(0, '#111111');
              gradient.addColorStop(.5, '#00ff00');
              gradient.addColorStop(.5, '#11aa11');
              gradient.addColorStop(1, '#111111');
            } else {
              gradient.addColorStop(0, '#111111');
              gradient.addColorStop(.5, '#ffffff');
              gradient.addColorStop(.5, '#aaaaaa');
              gradient.addColorStop(1, '#111111');
            }
            text.setFill(gradient);
        }
  
        back.setInteractive();
        back.on(
            "pointerdown",
            () => {
                text.destroy();
                back.destroy();
            });
      }

}