/**
 *
 * @author
 *
 */
var Roll = (function (_super) {
    __extends(Roll, _super);
    function Roll() {
        _super.call(this);
        this.val = 0;
        this.init();
    }
    var d = __define,c=Roll,p=c.prototype;
    p.init = function () {
        var data = RES.getRes("dice_json");
        var tex = RES.getRes("dice_png");
        this.mcf = new egret.MovieClipDataFactory(data, tex);
        this.mc = new egret.MovieClip(this.mcf.generateMovieClipData("dice"));
        this.addChild(this.mc);
        //        this.mc.touchEnabled = true;
        //        this.mc.addEventListener(egret.TouchEvent.TOUCH_TAP,this.roll,this);
    };
    p.setVal = function () {
        this.val = Math.floor(Math.random() * 6) + 1;
    };
    p.getVal = function () {
        return this.val;
    };
    p.roll = function (evt) {
        this.mc.play(-1);
        //        this.setVal();
        this.mc.addEventListener(egret.Event.COMPLETE, this.complete, this);
    };
    p.complete = function (evt) {
        //        console.log(this.val);
        //        this.mc.gotoAndStop(this.val);
    };
    return Roll;
}(egret.Sprite));
egret.registerClass(Roll,'Roll');
