window.onload = () => {
    let canvas = document.getElementById("canvasTest") as HTMLCanvasElement;
    let canvas2D=canvas.getContext("2d");
    canvas2D.strokeStyle="#FFA500";
    canvas2D.fillStyle="#FFA500";

    let stage:DisplayObjectContainer=new DisplayObjectContainer();

    let image:Bitmap=new Bitmap();
    image.texture="/src/sun.jpg";
    image.x=100;
    image.y=100;
    image.width=100;
    image.height=100;
    stage.addChild(image);

    let welcome:TextField=new TextField();
    welcome.x=10;
    welcome.y=50;
    welcome.text="Hello,World";
    welcome.font="40px Arial";
    stage.addChild(welcome);

    setInterval(()=>{
        canvas2D.clearRect(0,0,canvas.width,canvas.height);
        stage.draw(canvas2D);
    },100);
};