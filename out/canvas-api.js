var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.alpha = 1;
    }
    DisplayObject.prototype.draw = function (canvas2D) {
        var m2 = new math.Matrix();
        m2.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.absoluteAlpha = this.alpha * this.parent.absoluteAlpha;
            var m1 = this.parent.absoluteMatrix;
            var m3 = math.matrixAppendMatrix(m1, m2);
            this.absoluteMatrix = m3;
            canvas2D.setTransform(m3.m11, m3.m12, m3.m21, m3.m22, m3.dx, m3.dy);
        }
        else {
            this.absoluteAlpha = this.alpha;
            this.absoluteMatrix = m2;
            canvas2D.setTransform(m2.m11, m2.m12, m2.m21, m2.m22, m2.dx, m2.dy);
        }
        canvas2D.globalAlpha = this.absoluteAlpha;
        this.render(canvas2D);
    };
    DisplayObject.prototype.render = function (canvas2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.apply(this, arguments);
        this.array = [];
    }
    DisplayObjectContainer.prototype.render = function (canvas2D) {
        this.array.forEach(function (drawAble) {
            drawAble.draw(canvas2D);
        });
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        child.parent = this;
        this.array.push(child);
    };
    return DisplayObjectContainer;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "";
        this.font = "";
        this.color = "#000000";
    }
    TextField.prototype.render = function (canvas2D) {
        canvas2D.font = this.font;
        canvas2D.fillStyle = this.color;
        canvas2D.fillText(this.text, 0, 0);
    };
    return TextField;
}(DisplayObject));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
        this.width = 0;
        this.height = 0;
    }
    Bitmap.prototype.render = function (canvas2D) {
        var _this = this;
        if (this.cache == null) {
            var bitmap_1 = new Image();
            bitmap_1.src = this.texture;
            bitmap_1.onload = function () {
                canvas2D.drawImage(bitmap_1, 0, 0, _this.width, _this.height);
                _this.cache = bitmap_1;
            };
        }
        else {
            canvas2D.drawImage(this.cache, 0, 0, this.width, this.height);
        }
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=canvas-api.js.map