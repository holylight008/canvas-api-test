class EventManager{
    targetArray:DisplayObject[];
    static eventManager:EventManager;
    constructor(){

    }
    static getInstance(){
        if(EventManager.eventManager==null){
            EventManager.eventManager=new EventManager();
            EventManager.eventManager.targetArray=new Array();
            return EventManager.eventManager;
        }else{
            return EventManager.eventManager;
        }
    }
}

class MyEvent{
    eventType="";
    ifCapture=false;
    constructor(eventType:string,ifCapture:boolean){
        this.eventType=eventType;
        this.ifCapture=ifCapture;
    }
}

interface Drawable {
    draw(canvas2D: CanvasRenderingContext2D);
}
abstract class DisplayObject implements Drawable {
    x = 0;
    y = 0;
    scaleX=1;
    scaleY=1;
    rotation=0;
    localAlpha=1;
    localMatrix;
    absoluteAlpha;
    absoluteMatrix;
    parent:DisplayObjectContainer;
    eventArray:MyEvent[]=[];
    draw(canvas2D: CanvasRenderingContext2D) {
        var localMatrix: math.Matrix = new math.Matrix();
        localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        this.localMatrix = localMatrix;
        if (this.parent) {
            this.absoluteAlpha = this.localAlpha * this.parent.absoluteAlpha;

            var parentMatrix: math.Matrix = this.parent.absoluteMatrix;
            var absoluteMatrix: math.Matrix = math.matrixAppendMatrix(localMatrix, parentMatrix);
            this.absoluteMatrix=absoluteMatrix;
            canvas2D.setTransform(absoluteMatrix.m11, absoluteMatrix.m12, absoluteMatrix.m21, absoluteMatrix.m22, absoluteMatrix.dx, absoluteMatrix.dy);
        }else{
            this.absoluteAlpha=this.localAlpha;
            this.absoluteMatrix=localMatrix;
            canvas2D.setTransform(localMatrix.m11, localMatrix.m12, localMatrix.m21, localMatrix.m22, localMatrix.dx, localMatrix.dy);
        }
        canvas2D.globalAlpha=this.absoluteAlpha;
        this.render(canvas2D);
    }
    addEventListener(eventType:string,ifCapture:boolean){
        //if this.eventArray doesn't contain e
        let e=new MyEvent(eventType,ifCapture);
        this.eventArray.push(e);
    }
    dispatchEvent(e:MyEvent){
        for(let x of this.eventArray){
            if(x.ifCapture=false){

            }
        }
    }

    abstract render(canvas2D: CanvasRenderingContext2D);
    abstract hitTest(x:number,y:number);
}
class DisplayObjectContainer extends DisplayObject {
    children:DisplayObject[] = [];
    render(canvas2D: CanvasRenderingContext2D) {
        this.children.forEach((drawAble) => {
            drawAble.draw(canvas2D);
        });
    }
    addChild(child: DisplayObject) {
        child.parent=this;
        this.children.push(child);
    }
    hitTest(x: number, y: number) {
        let eventManager = EventManager.getInstance();
        if (this.eventArray.length != 0) {
            eventManager.targetArray.push(this);
        }
        for (let i = this.children.length - 1; i >= 0; i--) {
            let child = this.children[i];
            let invertChildMatrix = new math.Matrix();
            invertChildMatrix = math.invertMatrix(child.localMatrix);
            let pointAfterInvert = math.pointAppendMatrix(new math.Point(x, y), invertChildMatrix);
            let hitTestResult = child.hitTest(pointAfterInvert.x, pointAfterInvert.y);
            if (hitTestResult) {
                return hitTestResult;
            }
        }
        return null;
    }
}
class TextField extends DisplayObject {
    text: string = "";
    font:string="";
    color:string="#000000";
    render(canvas2D: CanvasRenderingContext2D) {
        canvas2D.font=this.font;
        canvas2D.fillStyle=this.color;
        canvas2D.fillText(this.text, 0, 0 );
    }
    hitTest(x:number,y:number){
        //temproray height 20,width 10
        let rect=new math.Rectangle(0,0,this.text.length*10, 20);
        if (rect.isPointIn(x, y)) {
            let eventManager=EventManager.getInstance();
            if(this.eventArray.length!=0){
                eventManager.targetArray.push(this);
            }
            return this;
        }
        else {
            return null;
        }
    }
}
class Bitmap extends DisplayObject {
    imageCache: HTMLImageElement;
    texture: string;
    render(canvas2D: CanvasRenderingContext2D) {
        if (this.imageCache == null) {
            let bitmap = new Image();
            bitmap.src = this.texture;
            bitmap.onload = () => {
                canvas2D.drawImage(bitmap, 0, 0);
                this.imageCache=bitmap;
            }
        }else{
            canvas2D.drawImage(this.imageCache,0, 0);
        }
    }
    hitTest(x:number,y:number){
        //entrue image onload
        if (this.imageCache) {
            var rect = new math.Rectangle(0, 0, this.imageCache.width, this.imageCache.height);
            if (rect.isPointIn(x, y)) {
                let eventManager = EventManager.getInstance();
                if (this.eventArray.length != 0) {
                    eventManager.targetArray.push(this);
                }
                return this;
            }
            else {
                return null;
            }
        }
    }
}
