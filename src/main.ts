window.onload = () => {
    let canvas = document.getElementById("canvasTest") as HTMLCanvasElement;
    let context2D=canvas.getContext("2d");

    let stage:DisplayObjectContainer=new DisplayObjectContainer();
    
    let list=new DisplayObjectContainer();
    list.addEventListener("onmousemove",(e:MouseEvent)=>{
        let dy=currentY-lastY;
        console.log("dy="+dy);
        list.y+=dy;
    },this,false);

    let image:Bitmap=new Bitmap();
    image.texture="/src/sun.jpg";
    image.x=0;
    image.y=0;
    image.addEventListener("onclick",()=>{
        console.log("click me!!!");
    },this,false);
    list.addChild(image);

    let image2:Bitmap=new Bitmap();
    image2.texture="/src/sun.jpg";
    image2.x=0;
    image2.y=100;
    list.addChild(image2);

    stage.addChild(list);

    setInterval(()=>{
        context2D.save();
        context2D.clearRect(0,0,canvas.width,canvas.height);
        stage.draw(context2D);
        context2D.restore();
    },100);

    let hitResult:DisplayObject;
    let currentX:number;
    let currentY:number;
    let lastX:number;
    let lastY:number;
    let isMouseDown=false;
    window.onmousedown=(e)=>{
        isMouseDown=true;
        let targetArray = EventManager.getInstance().targetArray;
        targetArray.splice(0,targetArray.length);
        hitResult = stage.hitTest(e.offsetX, e.offsetY);
        currentX = e.offsetX;
        currentY = e.offsetY;
        console.log("hit!!!"+currentX+" "+currentY);
    }
    window.onmousemove=(e)=>{
        let targetArray = EventManager.getInstance().targetArray;
        lastX=currentX;
        lastY=currentY;
        currentX=e.offsetX;
        currentY=e.offsetY;
        if (isMouseDown) {
            for (let i = 0; i < targetArray.length; i++) {
                for (let x of targetArray[i].eventArray) {
                    if (x.eventType.match("onmousemove") &&
                        x.ifCapture == true) {
                        x.func(e);
                    }
                }
            }
            for (let i = targetArray.length - 1; i >= 0; i--) {
                for (let x of targetArray[i].eventArray) {
                    if (x.eventType.match("onmousemove") &&
                        x.ifCapture == false) {
                        x.func(e);
                    }
                }
            }
        }
    }
    window.onmouseup=(e)=>{
        isMouseDown=false;
        let targetArray = EventManager.getInstance().targetArray;
        targetArray.splice(0,targetArray.length);
        let newHitRusult= stage.hitTest(e.offsetX, e.offsetY)
        for (let i = targetArray.length - 1; i >= 0; i--) {
            for (let x of targetArray[i].eventArray) {
                if (x.eventType.match("onclick") &&
                    newHitRusult == hitResult ) {
                    x.func(e);
                }
            }
        }
    }
};