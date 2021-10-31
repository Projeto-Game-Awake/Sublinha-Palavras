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

        scene.tweens.add({
            targets: element,
            x: width/2-100,
            y: 100,
            duration: 1,
            ease: "Power3",
        });

        this.element = element;
    }

}