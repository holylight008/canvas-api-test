var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "";
    }
    TextField.prototype.draw = function (canvas2D) {
        canvas2D.fillText(this.text, this.x, this.y);
    };
    return TextField;
}(DisplayObject));
//# sourceMappingURL=TextField.js.map