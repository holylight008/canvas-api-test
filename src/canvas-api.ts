

interface Drawable {
    draw(canvas2D: CanvasRenderingContext2D);
}
class DisplayObject implements Drawable {
    x: number = 0;
    y: number = 0;
    alpha:number=1;
    scaleX:number=1;
    scaleY:number=1;
    matrix:number[]=[1,0,0,0,1,0];
    draw(canvas2D: CanvasRenderingContext2D) {

    }
}
class DisplayObjectContainer extends DisplayObject {
    array: Drawable[] = [];
    draw(canvas2D: CanvasRenderingContext2D) {
        this.array.forEach((drawAble) => {
            drawAble.draw(canvas2D);
        });
    }
    addChild(child: Drawable) {
        this.array.push(child);
    }
}
class TextField extends DisplayObject {
    text: string = "";
    font:string="";
    draw(canvas2D: CanvasRenderingContext2D) {
        canvas2D.font=this.font;
        canvas2D.fillText(this.text, this.x, this.y + 10);
    }
}
class Bitmap extends DisplayObject {
    cache: HTMLImageElement;
    texture: string;
    width: number = 0;
    height: number = 0;
    draw(canvas2D: CanvasRenderingContext2D) {
        if (this.cache == null) {
            let bitmap = new Image();
            bitmap.src = this.texture;
            bitmap.onload = () => {
                canvas2D.drawImage(bitmap, this.x, this.y, this.width, this.height);
                this.cache=bitmap;
            }
        }else{
            canvas2D.drawImage(this.cache, this.x, this.y, this.width, this.height);
        }
    }
}

class shape extends DisplayObject{
    draw(canvas2D: CanvasRenderingContext2D){
        
    }
}
