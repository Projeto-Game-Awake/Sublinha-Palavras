class LetterBox extends Phaser.GameObjects.Container {

    constructor(scene,x,y,letter,i,j) {
        let box = scene.add.rectangle(0,0,30,30, 0xffffff);
        box.setInteractive();
        let text = null;
        box.on(
            "pointerdown",
            () => {
                this.select()
            });
            text = scene.add.text(0,0, letter, 
                {color: '#000'}
            );
        
        text.setOrigin(0.5);
        super(scene,x,y,[box,text]);

        this.scene = scene;
        this.box = box;
        this.text = text;
        
        this.letter = letter;
        this.i = i;
        this.j = j;

        this.setColorBox(box);
        
        scene.add.existing(this);
    }
    select() {
        if(this.scene.selected) {
            this.setColorBox(this.scene.selected.box);
            console.log("\"x1\":"+this.scene.selected.i + ",\"y1\":" + this.scene.selected.j + ",\"x2\":" +
            this.i + ",\"y2\":" + this.j);

            for(let i=0;i<this.scene.words.length;i++) {
                let word = this.scene.words[i];
                if(this.isMatch(word)) {
                    let stepX = this.getStep(word.x1,word.x2);
                    let stepY = this.getStep(word.y1,word.y2);
                    
                    let j = word.x1;
                    let k = word.y1;

                    let id = "";

                    do {
                        do {
                            id += this.scene.collection[j][k].letter;
                            let box = this.scene.collection[j][k].box;
                            box.setStrokeStyle(2, 0x0000ff);
                            box.setFillStyle(0x0000ff, 0.3);
                            if(k==word.y2) {
                                break;
                            }
                            j+=stepX;
                            k+=stepY;
                        } while(true);
                        if(j==word.x2) {
                            break;
                        }
                        j+=stepX;
                    } while(true);
                    this.scene.selected = null;
                    console.log(id);
                    this.underLineWord(id);
                    return;
                }
            }
        }
        this.box.setStrokeStyle(2, 0x00ff00);
        this.scene.before = this.scene.selected;
        this.scene.selected = this;
    }
    underLineWord(id) {
        let element = document.getElementById("word_"+convertNome(id));
        if(element) {
            element.classList.add('found');
        }
    }
    getStep(a,b) {
        let diff = b-a;
        if(diff > 0) {
            return 1;
        } else if(diff < 0) {
            return -1;
        } else {
            return 0;
        }
    }
    isMatch(word) {
        let x1 = word.x1;
        let x2 = word.x2;
        let y1 = word.y1;
        let y2 = word.y2;

        if(this.scene.selected.i == x1 &&
            this.i == x2 &&
            this.scene.selected.j == y1 &&
            this.j == y2) {
                return true;
        }
        if(this.scene.selected.i == x2 &&
            this.i == x1 &&
            this.scene.selected.j == y2 &&
            this.j == y1) {
                return true;
        }

        return false;
    }
    setColorBox(box) {
        if(this.isVisible) {
            box.setStrokeStyle(4, 0x0000ff);
        } else {
            box.setStrokeStyle(2, 0x000000);
        }
    }
}