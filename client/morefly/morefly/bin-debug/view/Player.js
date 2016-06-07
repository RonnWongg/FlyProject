/**
 *创建一个用户 用于游戏逻辑
 * @author
 * 1红 2黄 3绿 4蓝
 */
var Player = (function () {
    function Player() {
    }
    var d = __define,c=Player,p=c.prototype;
    p.getPname = function () {
        return this.pname;
    };
    p.setPname = function (pname) {
        this.pname = pname;
    };
    p.setCol = function (col) {
        this.col = col;
    };
    p.setPath = function (path) {
        this.path = path;
    };
    p.setId = function (id) {
        this.id = id;
    };
    p.setRid = function (rid) {
        this.rid = rid;
    };
    p.setPid = function (pid) {
        this.pid = pid;
    };
    p.getCol = function () {
        return this.col;
    };
    p.getPath = function () {
        return this.path;
    };
    p.getId = function () {
        return this.id;
    };
    p.getRid = function () {
        return this.rid;
    };
    p.getPid = function () {
        return this.pid;
    };
    return Player;
}());
egret.registerClass(Player,'Player');
