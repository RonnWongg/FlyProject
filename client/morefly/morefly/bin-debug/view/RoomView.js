/**
 *
 * @author
 *房间里面有4个位置  点击某个位置 告诉其他人 我加入了这个位置
 * 当4个人坐满后 通知玩家游戏 开始  进行roll 骰子
 */
var RoomView = (function (_super) {
    __extends(RoomView, _super);
    function RoomView() {
        _super.call(this);
        this.rvbg = new egret.Bitmap();
        this.rvbg.texture = RES.getRes("plane_bg_png");
        this.addChild(this.rvbg);
        //    	this.init();
    }
    var d = __define,c=RoomView,p=c.prototype;
    p.init = function () {
        this.pos = new egret.Sprite();
        this.addChild(this.pos);
    };
    return RoomView;
}(egret.Sprite));
egret.registerClass(RoomView,'RoomView');
