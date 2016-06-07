/**
 *
 * @author
 *
 */
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(over) {
        _super.call(this);
        this.init(over);
        console.log("over:" + over);
    }
    var d = __define,c=GameOver,p=c.prototype;
    p.init = function (over) {
        //0为胜利  1为失败
        if (over == 0) {
            this.winner();
        }
        else {
            this.loser();
        }
    };
    p.winner = function () {
        console.log("win");
        var data = RES.getRes("winer_json");
        var tex = RES.getRes("winer_png");
        this.mcf = new egret.MovieClipDataFactory(data, tex);
        this.mc = new egret.MovieClip(this.mcf.generateMovieClipData("winer"));
        this.addChild(this.mc);
        this.mc.play();
    };
    p.loser = function () {
        console.log("loser");
        var data = RES.getRes("lose_json");
        var tex = RES.getRes("lose_png");
        this.mcf = new egret.MovieClipDataFactory(data, tex);
        this.mc = new egret.MovieClip(this.mcf.generateMovieClipData("lose"));
        this.addChild(this.mc);
        this.mc.play();
    };
    return GameOver;
}(egret.Sprite));
egret.registerClass(GameOver,'GameOver');
