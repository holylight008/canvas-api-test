interface Drawable {
    draw(canvas2D: CanvasRenderingContext2D);
}
class DisplayObject implements Drawable {
    x = 0;
    y = 0;
    scaleX=1;
    scaleY=1;
    rotation=0;
    alpha=1;
    absoluteAlpha;
    absoluteMatrix;
    parent:DisplayObjectContainer;
    draw(canvas2D: CanvasRenderingContext2D) {
        var m2: math.Matrix = new math.Matrix();
        m2.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.absoluteAlpha = this.alpha * this.parent.absoluteAlpha;

            var m1: math.Matrix = this.parent.absoluteMatrix;
            var m3: math.Matrix = math.matrixAppendMatrix(m1, m2);
            this.absoluteMatrix=m3;
            canvas2D.setTransform(m3.m11, m3.m12, m3.m21, m3.m22, m3.dx, m3.dy);
        }else{
            this.absoluteAlpha=this.alpha;
            this.absoluteMatrix=m2;
            canvas2D.setTransform(m2.m11, m2.m12, m2.m21, m2.m22, m2.dx, m2.dy);
        }
        canvas2D.globalAlpha=this.absoluteAlpha;
        this.render(canvas2D);
    }
    render(canvas2D: CanvasRenderingContext2D){

    }
}
class DisplayObjectContainer extends DisplayObject {
    array:DisplayObject[] = [];
    render(canvas2D: CanvasRenderingContext2D) {
        this.array.forEach((drawAble) => {
            drawAble.draw(canvas2D);
        });
    }
    addChild(child: DisplayObject) {
        child.parent=this;
        this.array.push(child);
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
}
class Bitmap extends DisplayObject {
    cache: HTMLImageElement;
    texture: string;
    width: number = 0;
    height: number = 0;
    render(canvas2D: CanvasRenderingContext2D) {
        if (this.cache == null) {
            let bitmap = new Image();
            bitmap.src = this.texture;
            bitmap.onload = () => {
                canvas2D.drawImage(bitmap, 0, 0, this.width, this.height);
                this.cache=bitmap;
            }
        }else{
            canvas2D.drawImage(this.cache,0, 0, this.width, this.height);
        }
    }
}
