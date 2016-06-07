/**
 *
 * @author 
 *作为连接服务器并且数据传递等等 
 * */
class Connection {
    public m_Events = [];
    public socket;
    public m_Error = "";
    public m_Host;
    public m_Port;
    public constructor(host,port) {
        this.m_Host = host;
        this.m_Port = port;
        var self = this;

    }
    public bindEvents() {
        for(var e in this.m_Events) {
            this.socket.on(e,this.m_Events[e]);
        }
    } 
    public setError(err) {
        this.m_Error = err;
    }
    public getError() {
        return this.m_Error;
    }
    public connect() {
        if(!("io" in window)) {
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
    }
    public login(name) {
        this.socket.emit("login",{
            "name": name
        });
    }
    public joinRoom(rid,pid) {
        this.socket.emit("joinRoom",{ 
            "rid":rid,
            "pid": pid });
    }
    public leavePid(rid,pid) {
        this.socket.emit("leaveRoom",{
            "rid":rid,
            "pid": pid
        });
    }
    public ready() {
        this.socket.emit("ready","");
    }
    public on(event,callback) {
        this.m_Events[event] = callback;
        return self;
    }
    //cid为联网ID
    public rollGo(){
        this.socket.emit("rollGo","");
    }
    public stepsUpdate(id,lastStep){
        this.socket.emit("stepsUpdate",{
            "id":id,
            "lastStep":lastStep
            });
    }
    public Over(id,rid,pid){
        this.socket.emit("over",{
            "id":id,
            "rid":rid,
            "pid":pid
            });
    }
    public replace(id){
        this.socket.emit("eat",{
            "id":id
            });
    }
}
