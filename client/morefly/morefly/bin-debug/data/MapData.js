/**
 *存放飞行棋地图数据
 * @author
 *
 */
var MapData = (function () {
    function MapData() {
        //起始位置
        this.redinit = [[98, 595, 1], [20, 520, 1], [20, 560, 1], [60, 520, 1], [60, 560, 1]];
        this.yelinit = [[15, 255, 2], [50, 180, 2], [50, 220, 2], [85, 180, 2], [85, 220, 2]];
        this.greinit = [[350, 175, 3], [390, 210, 3], [390, 250, 3], [425, 210, 3], [425, 250, 3]];
        this.bluinit = [[430, 510, 4], [360, 550, 4], [360, 590, 4], [400, 550, 4], [400, 590, 4]];
        //颜色 1红 2黄 3绿 4蓝
        this.col = [1, 2, 3, 4];
        //外圈数据
        this.roundData = [];
        //内圈数据
        this.endData = [];
        this.roundDataInit();
        this.endDataInit();
    }
    var d = __define,c=MapData,p=c.prototype;
    p.roundDataInit = function () {
        for (var i = 0; i < 52; i++) {
            this.roundData[i] = [];
            this.roundData[i][2] = this.col[i % 4];
            var w = 15, h = 295;
            if (i < 4) {
                this.roundData[i][0] = 30 * i + w;
                this.roundData[i][1] = h;
            }
            else if (i < 8) {
                this.roundData[i][0] = 120 + w;
                this.roundData[i][1] = h - (i - 3) * 30;
            }
            else if (i < 13) {
                this.roundData[i][0] = (i - 3) * 30 + w;
                this.roundData[i][1] = h - 120;
            }
            else if (i < 17) {
                this.roundData[i][0] = 300 + w;
                this.roundData[i][1] = h + (i - 17) * 30;
            }
            else if (i < 21) {
                this.roundData[i][0] = (i - 6) * 30 + w;
                this.roundData[i][1] = h;
            }
            else if (i < 26) {
                this.roundData[i][0] = 420 + w;
                this.roundData[i][1] = h + (i - 20) * 30;
            }
            else if (i < 30) {
                this.roundData[i][0] = (40 - i) * 30 + w;
                this.roundData[i][1] = h + 180;
            }
            else if (i < 34) {
                this.roundData[i][0] = 300 + w;
                this.roundData[i][1] = h + (i - 23) * 30;
            }
            else if (i < 39) {
                this.roundData[i][0] = (43 - i) * 30 + w;
                this.roundData[i][1] = h + 300;
            }
            else if (i < 43) {
                this.roundData[i][0] = 120 + w;
                this.roundData[i][1] = h + (49 - i) * 30;
            }
            else if (i < 47) {
                this.roundData[i][0] = (46 - i) * 30 + w;
                this.roundData[i][1] = h + 180;
            }
            else if (i < 52) {
                this.roundData[i][0] = w;
                this.roundData[i][1] = h + (52 - i) * 30;
            }
        }
    };
    p.endDataInit = function () {
        var w = 15, h = 295;
        for (var i = 0; i < 24; i++) {
            this.endData[i] = [];
            if (i < 6) {
                this.endData[i][0] = w + 210;
                this.endData[i][1] = h + 300 - 30 * (i + 1);
                this.endData[i][2] = 1;
            }
            else if (i < 12) {
                this.endData[i][0] = w + (i - 5) * 30;
                this.endData[i][1] = h + 3 * 30;
                this.endData[i][2] = 2;
            }
            else if (i < 18) {
                this.endData[i][0] = w + 210;
                this.endData[i][1] = h - 120 + (i - 11) * 30;
                this.endData[i][2] = 3;
            }
            else {
                this.endData[i][0] = w + 420 - (i - 17) * 30;
                this.endData[i][1] = h + 3 * 30;
                this.endData[i][2] = 4;
            }
        }
    };
    p.getRoundData = function () {
        return this.roundData;
    };
    p.getEndData = function () {
        return this.endData;
    };
    //位置信息
    MapData.posData = [[20, 520], [20, 170], [370, 180], [360, 530]];
    return MapData;
}());
egret.registerClass(MapData,'MapData');
