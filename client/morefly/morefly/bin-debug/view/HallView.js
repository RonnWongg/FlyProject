/**
 *
 * @author
 *大厅里 存放一个房间   房间带有一个number属性 几号房
 */
var HallView = (function (_super) {
    __extends(HallView, _super);
    function HallView() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=HallView,p=c.prototype;
    p.init = function () {
        var content = this.drawRoom(6);
        this.sv = new egret.ScrollView;
        this.sv.width = 400;
        this.sv.height = 750;
        this.sv.x = 40;
        //	    this.sv.y=50;
        this.sv.bounces = false;
        this.sv.setContent(content);
        this.addChild(this.sv);
    };
    p.drawRoom = function (num) {
        var roomnumber;
        this.roomView = new egret.Sprite();
        for (var i = 0; i < num; i++) {
            var sr = this.single();
            roomnumber = i.toString();
            var txt = new egret.TextField();
            txt.text = "No." + roomnumber;
            txt.y = 150;
            txt.height = 50;
            txt.width = 400;
            txt.size = 30;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            sr.addChild(txt);
            sr.name = roomnumber;
            sr.y = i * 200;
            sr.touchEnabled = true;
            this.roomView.addChild(sr);
        }
        return this.roomView;
    };
    p.single = function () {
        var sp = new egret.Sprite();
        sp.width = 400;
        sp.height = 200;
        var roombg = new egret.Bitmap();
        roombg.texture = RES.getRes("room_png");
        sp.addChild(roombg);
        roombg.x = 75;
        return sp;
    };
    return HallView;
}(egret.Sprite));
egret.registerClass(HallView,'HallView');
