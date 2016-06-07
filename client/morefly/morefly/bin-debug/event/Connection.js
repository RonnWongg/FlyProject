/**
 *
 * @author
 *作为连接服务器并且数据传递等等
 * */
var Connection = (function () {
    function Connection(host, port) {
        this.m_Events = [];
        this.m_Error = "";
        this.m_Host = host;
        this.m_Port = port;
        var self = this;
    }
    var d = __define,c=Connection,p=c.prototype;
    p.bindEvents = function () {
        for (var e in this.m_Events) {
            this.socket.on(e, this.m_Events[e]);
        }
    };
    p.setError = function (err) {
        this.m_Error = err;
    };
    p.getError = function () {
        return this.m_Error;
    };
    p.connect = function () {
        if (!("io" in window)) {
            this.setError("io not defined");
            return false;
        }
        this.socket = io.connect('http://' + this.m_Host + ':' + this.m_Port);
        /*if(socket.socket.open == false){
            setError("connect http://" + m_Host + ":" + m_Port + " failed");
            return false;
        }*/
        this.bindEvents();
        return true;
    };
    p.login = function (name) {
        this.socket.emit("login", {
            "name": name
        });
    };
    p.joinRoom = function (rid, pid) {
        this.socket.emit("joinRoom", {
            "rid": rid,
            "pid": pid });
    };
    p.leavePid = function (rid, pid) {
        this.socket.emit("leaveRoom", {
            "rid": rid,
            "pid": pid
        });
    };
    p.ready = function () {
        this.socket.emit("ready", "");
    };
    p.on = function (event, callback) {
        this.m_Events[event] = callback;
        return self;
    };
    //cid为联网ID
    p.rollGo = function () {
        this.socket.emit("rollGo", "");
    };
    p.stepsUpdate = function (id, lastStep) {
        this.socket.emit("stepsUpdate", {
            "id": id,
            "lastStep": lastStep
        });
    };
    p.Over = function (id, rid, pid) {
        this.socket.emit("over", {
            "id": id,
            "rid": rid,
            "pid": pid
        });
    };
    p.replace = function (id) {
        this.socket.emit("eat", {
            "id": id
        });
    };
    return Connection;
}());
egret.registerClass(Connection,'Connection');
