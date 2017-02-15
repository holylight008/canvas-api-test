var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.draw = function (canvas2D) {
        var _this = this;
        this.img.onload = function () {
            canvas2D.drawImage(_this.img, _this.x, _this.y);
        };
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=Bitmap.js.map