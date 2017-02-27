var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventManager = (function () {
    function EventManager() {
    }
    EventManager.getInstance = function () {
        if (EventManager.eventManager == null) {
            EventManager.eventManager = new EventManager();
            EventManager.eventManager.targetArray = new Array();
            return EventManager.eventManager;
        }
        else {
            return EventManager.eventManager;
        }
    };
    return EventManager;
}());
var MyEvent = (function () {
    function MyEvent(eventType, func, target, ifCapture) {
        this.eventType = "";
        this.ifCapture = false;
        this.eventType = eventType;
        this.ifCapture = ifCapture;
        this.func = func;
        this.target = target;
    }
    return MyEvent;
}());
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.localAlpha = 1;
        this.eventArray = [];
    }
    DisplayObject.prototype.draw = function (canvas2D) {
        var localMatrix = new math.Matrix();
        localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        this.localMatrix = localMatrix;
        if (this.parent) {
            this.absoluteAlpha = this.localAlpha * this.parent.absoluteAlpha;
            var parentMatrix = this.parent.absoluteMatrix;
            var absoluteMatrix = math.matrixAppendMatrix(localMatrix, parentMatrix);
            this.absoluteMatrix = absoluteMatrix;
            canvas2D.setTransform(absoluteMatrix.m11, absoluteMatrix.m12, absoluteMatrix.m21, absoluteMatrix.m22, absoluteMatrix.dx, absoluteMatrix.dy);
        }
        else {
            this.absoluteAlpha = this.localAlpha;
            this.absoluteMatrix = localMatrix;
            canvas2D.setTransform(localMatrix.m11, localMatrix.m12, localMatrix.m21, localMatrix.m22, localMatrix.dx, localMatrix.dy);
        }
        canvas2D.globalAlpha = this.absoluteAlpha;
        this.render(canvas2D);
    };
    DisplayObject.prototype.addEventListener = function (eventType, func, target, ifCapture) {
        //if this.eventArray doesn't contain e
        var e = new MyEvent(eventType, func, target, ifCapture);
        this.eventArray.push(e);
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.apply(this, arguments);
        this.children = [];
    }
    DisplayObjectContainer.prototype.render = function (canvas2D) {
        this.children.forEach(function (drawAble) {
            drawAble.draw(canvas2D);
        });
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        child.parent = this;
        this.children.push(child);
    };
    DisplayObjectContainer.prototype.hitTest = function (x, y) {
        var eventManager = EventManager.getInstance();
        if (this.eventArray.length != 0) {
            eventManager.targetArray.push(this);
        }
        for (var i = this.children.length - 1; i >= 0; i--) {
            var child = this.children[i];
            var invertChildMatrix = new math.Matrix();
            invertChildMatrix = math.invertMatrix(child.localMatrix);
            var pointAfterInvert = math.pointAppendMatrix(new math.Point(x, y), invertChildMatrix);
            var hitTestResult = child.hitTest(pointAfterInvert.x, pointAfterInvert.y);
            if (hitTestResult) {
                return hitTestResult;
            }
        }
        return null;
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
    TextField.prototype.hitTest = function (x, y) {
        //temproray height 20,width 10
        var rect = new math.Rectangle(0, 0, this.text.length * 10, 40);
        if (rect.isPointIn(x, y)) {
            var eventManager = EventManager.getInstance();
            if (this.eventArray.length != 0) {
                eventManager.targetArray.push(this);
            }
            return this;
        }
        else {
            console.log("not hit");
            return null;
        }
    };
    return TextField;
}(DisplayObject));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (canvas2D) {
        var _this = this;
        if (this.imageCache == null) {
            var bitmap_1 = new Image();
            bitmap_1.src = this.texture;
            bitmap_1.onload = function () {
                canvas2D.drawImage(bitmap_1, 0, 0);
                _this.imageCache = bitmap_1;
            };
        }
        else {
            canvas2D.drawImage(this.imageCache, 0, 0);
        }
    };
    Bitmap.prototype.hitTest = function (x, y) {
        //entrue image onload
        if (this.imageCache) {
            var rect = new math.Rectangle(0, 0, this.imageCache.width, this.imageCache.height);
            if (rect.isPointIn(x, y)) {
                var eventManager = EventManager.getInstance();
                if (this.eventArray.length != 0) {
                    eventManager.targetArray.push(this);
                }
                return this;
            }
            else {
                return null;
            }
        }
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=canvas-api.js.map