/**
 *
 * @author
 *存放游戏服务器连接端口的类
 */
var ConnectionData = (function () {
    function ConnectionData() {
    }
    var d = __define,c=ConnectionData,p=c.prototype;
    ConnectionData.RoomNum = 3;
    ConnectionData.host = "127.0.0.1";
    ConnectionData.port = 3000;
    return ConnectionData;
}());
egret.registerClass(ConnectionData,'ConnectionData');
