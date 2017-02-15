window.onload = function () {
    var canvas = document.getElementById("canvasTest");
    var canvas2D = canvas.getContext("2d");
    var stage = new DisplayObjectContainer();
    var image = new Bitmap();
    image.texture = "/src/sun.jpg";
    image.x = 0;
    image.y = 100;
    image.width = 100;
    image.height = 100;
    stage.addChild(image);
    var image2 = new Bitmap();
    image2.texture = "/src/sun.jpg";
    image2.x = 100;
    image2.y = 100;
    image2.width = 100;
    image2.height = 100;
    stage.addChild(image2);
    var welcome = new TextField();
    welcome.x = 10;
    welcome.y = 50;
    welcome.color = "#DB7093";
    welcome.text = "Hello,World";
    welcome.font = "40px Arial";
    welcome.alpha = 0.5;
    stage.addChild(welcome);
    var welcome1 = new TextField();
    welcome1.x = 10;
    welcome1.y = 80;
    welcome1.text = "Hello,World";
    welcome1.font = "30px 微软雅黑";
    stage.addChild(welcome1);
    setInterval(function () {
        canvas2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(canvas2D);
    }, 100);
};
//# sourceMappingURL=main.js.map