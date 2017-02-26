window.onload = function () {
    var canvas = document.getElementById("canvasTest");
    var context2D = canvas.getContext("2d");
    var stage = new DisplayObjectContainer();
    stage.addEventListener("onmousedown", true);
    var image = new Bitmap();
    image.texture = "/src/sun.jpg";
    image.x = 0;
    image.y = 100;
    image.scaleX = 0.125;
    image.scaleY = 0.125;
    image.addEventListener("onmousedown", false);
    stage.addChild(image);
    var image2 = new Bitmap();
    image2.texture = "/src/sun.jpg";
    image2.x = 100;
    image2.y = 100;
    image2.scaleX = 0.25;
    image2.scaleY = 0.125;
    stage.addChild(image2);
    // let welcome:TextField=new TextField();
    // welcome.x=10;
    // welcome.y=50;
    // welcome.color="#DB7093";
    // welcome.text="Hello,World";
    // welcome.font="40px Arial";
    // welcome.localAlpha=0.5;
    // stage.addChild(welcome);
    // let welcome1:TextField=new TextField();
    // welcome1.x=10;
    // welcome1.y=300;
    // welcome1.rotation=20;
    // welcome1.text="Hello,World";
    // welcome1.font="30px 微软雅黑";
    // stage.addChild(welcome1);
    setInterval(function () {
        context2D.save();
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
        context2D.restore();
    }, 100);
    window.onmousedown = function (e) {
        var targetArray = EventManager.getInstance().targetArray;
        if (stage.hitTest(e.offsetX, e.offsetY)) {
            for (var i = 0; i < targetArray.length; i++) {
                for (var _i = 0, _a = targetArray[i].eventArray; _i < _a.length; _i++) {
                    var x = _a[_i];
                    if (x.eventType.match("onmousedown") &&
                        x.ifCapture == true) {
                        console.log(targetArray[i].localMatrix + " onmousedown ");
                    }
                }
            }
            for (var i = targetArray.length - 1; i >= 0; i--) {
                for (var _b = 0, _c = targetArray[i].eventArray; _b < _c.length; _b++) {
                    var x = _c[_b];
                    if (x.eventType.match("onmousedown") &&
                        x.ifCapture == false) {
                        console.log(targetArray[i].localMatrix + " onmousedown ");
                    }
                }
            }
        }
    };
};
//# sourceMappingURL=main.js.map