window.onload = () => {
    let canvas = document.getElementById("canvasTest") as HTMLCanvasElement;
    let canvas2D=canvas.getContext("2d");

    let stage:DisplayObjectContainer=new DisplayObjectContainer();

    let image:Bitmap=new Bitmap();
    image.texture="/src/sun.jpg";
    image.x=0;
    image.y=100;
    image.width=100;
    image.height=100;
    stage.addChild(image);

    let image2:Bitmap=new Bitmap();
    image2.texture="/src/sun.jpg";
    image2.x=100;
    image2.y=100;
    image2.scaleX=2;
    image2.width=100;
    image2.height=100;
    stage.addChild(image2);

    let welcome:TextField=new TextField();
    welcome.x=10;
    welcome.y=50;
    welcome.color="#DB7093";
    welcome.text="Hello,World";
    welcome.font="40px Arial";
    welcome.alpha=0.1;
    stage.addChild(welcome);

    let welcome1:TextField=new TextField();
    welcome1.x=10;
    welcome1.y=300;
    welcome1.rotation=20;
    welcome1.text="Hello,World";
    welcome1.font="30px 微软雅黑";
    stage.addChild(welcome1);

    setInterval(()=>{
        canvas2D.restore();
        canvas2D.clearRect(0,0,canvas.width,canvas.height);
        stage.draw(canvas2D);
    },100);
};