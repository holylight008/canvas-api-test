var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.matrix = [1, 0, 0, 0, 1, 0];
    }
    DisplayObject.prototype.draw = function (canvas2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.apply(this, arguments);
        this.array = [];
    }
    DisplayObjectContainer.prototype.draw = function (canvas2D) {
        this.array.forEach(function (drawAble) {
            drawAble.draw(canvas2D);
        });
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
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
    TextField.prototype.draw = function (canvas2D) {
        canvas2D.globalAlpha = this.alpha;
        canvas2D.font = this.font;
        canvas2D.fillStyle = this.color;
        canvas2D.fillText(this.text, this.x, this.y + 10);
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
    Bitmap.prototype.draw = function (canvas2D) {
        var _this = this;
        if (this.cache == null) {
            var bitmap_1 = new Image();
            bitmap_1.src = this.texture;
            bitmap_1.onload = function () {
                canvas2D.scale(_this.scaleX, _this.scaleY);
                canvas2D.drawImage(bitmap_1, _this.x, _this.y, _this.width, _this.height);
                _this.cache = bitmap_1;
            };
        }
        else {
            canvas2D.drawImage(this.cache, this.x, this.y, this.width, this.height);
        }
    };
    return Bitmap;
}(DisplayObject));
var shape = (function (_super) {
    __extends(shape, _super);
    function shape() {
        _super.apply(this, arguments);
    }
    shape.prototype.draw = function (canvas2D) {
    };
    return shape;
}(DisplayObject));
//# sourceMappingURL=canvas-api.js.map