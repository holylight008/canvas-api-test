var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//# sourceMappingURL=DisplayObjectContainer.js.map