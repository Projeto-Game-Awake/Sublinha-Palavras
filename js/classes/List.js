class List {

    constructor(scene, title, list) {
        let x = -40;
        let y = -40;
        if(isMobile()) {
            y -= 300;
        }

        let html = "";

        for(let i=0;i<list.length;i++) {
            if(i%2==0) {
                html += list[i].replaceAll("\n","<br/>");
            } else {
                html += "<span id='word_"+convertNome(list[i])+"'>"+list[i]+"</span>";
            }
        }

        let element = scene.add.dom(0, 0).createFromCache("list");
        element.width = 400;
        element.getChildByID("title").innerHTML = "<h1>"+title+"</h1>";
        element.getChildByID("list").innerHTML = html;
        element.addListener("click");

        element.on("click", function (event) {
        if (event.target.name === "playButton") {
            var inputText = this.getChildByName("txtPlayers");

            //  Have they entered anything?
            if (inputText.value !== "") {
                //  Turn off the click events
                this.removeListener("click");

                //  Hide the login element
                this.setVisible(false);

                gameOptions.players = parseInt(inputText.value);

                scene.scene.transition({ target: "main", duration: 1 });
            } else {
                //  Flash the prompt
                this.scene.tweens.add({
                    targets: text,
                    alpha: 0.2,
                    duration: 250,
                    ease: "Power3",
                    yoyo: true,
                });
            }
        }
        });

        scene.tweens.add({
            targets: element,
            x: width/2-100,
            y: 100,
            duration: 500,
            ease: "Power3",
        });

        this.element = element;
    }

}