var _this = this;
window.onload = function () {
    var canvas = document.getElementById("canvasTest");
    var context2D = canvas.getContext("2d");
    var stage = new DisplayObjectContainer();
    var list = new DisplayObjectContainer();
    list.addEventListener("onmousemove", function (e) {
        var dy = currentY - lastY;
        console.log("dy=" + dy);
        list.y += dy;
    }, _this, false);
    var image = new Bitmap();
    image.texture = "/src/sun.jpg";
    image.x = 0;
    image.y = 0;
    image.addEventListener("onclick", function () {
        console.log("click me!!!");
    }, _this, false);
    list.addChild(image);
    var image2 = new Bitmap();
    image2.texture = "/src/sun.jpg";
    image2.x = 0;
    image2.y = 100;
    list.addChild(image2);
    stage.addChild(list);
    setInterval(function () {
        context2D.save();
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
        context2D.restore();
    }, 100);
    var hitResult;
    var currentX;
    var currentY;
    var lastX;
    var lastY;
    var isMouseDown = false;
    window.onmousedown = function (e) {
        isMouseDown = true;
        var targetArray = EventManager.getInstance().targetArray;
        targetArray.splice(0, targetArray.length);
        hitResult = stage.hitTest(e.offsetX, e.offsetY);
        currentX = e.offsetX;
        currentY = e.offsetY;
        console.log("hit!!!" + currentX + " " + currentY);
    };
    window.onmousemove = function (e) {
        var targetArray = EventManager.getInstance().targetArray;
        lastX = currentX;
        lastY = currentY;
        currentX = e.offsetX;
        currentY = e.offsetY;
        if (isMouseDown) {
            for (var i = 0; i < targetArray.length; i++) {
                for (var _i = 0, _a = targetArray[i].eventArray; _i < _a.length; _i++) {
                    var x = _a[_i];
                    if (x.eventType.match("onmousemove") &&
                        x.ifCapture == true) {
                        x.func(e);
                    }
                }
            }
            for (var i = targetArray.length - 1; i >= 0; i--) {
                for (var _b = 0, _c = targetArray[i].eventArray; _b < _c.length; _b++) {
                    var x = _c[_b];
                    if (x.eventType.match("onmousemove") &&
                        x.ifCapture == false) {
                        x.func(e);
                    }
                }
            }
        }
    };
    window.onmouseup = function (e) {
        isMouseDown = false;
        var targetArray = EventManager.getInstance().targetArray;
        targetArray.splice(0, targetArray.length);
        var newHitRusult = stage.hitTest(e.offsetX, e.offsetY);
        for (var i = targetArray.length - 1; i >= 0; i--) {
            for (var _i = 0, _a = targetArray[i].eventArray; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x.eventType.match("onclick") &&
                    newHitRusult == hitResult) {
                    x.func(e);
                }
            }
        }
    };
};
//# sourceMappingURL=main.js.map