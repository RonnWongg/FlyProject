/**
 * Created by Ronn on 2016/5/11.
 */
//status 0为初始 1为准备 2为开始
var maxClient=100;//最大用户数
var n_Clients=0;//用户数量
var maxRid=3;//最大房间数
var m_Connections=[];//连接管理
var m_Rooms=[];//房间管理
var m_RoomsData=[];
//房间内数据
for(var i=0;i<maxRid;i++){
    m_Rooms[i]=[];//初始化房间数据
    m_RoomsData[i]=[];
    for(var j=0;j<4;j++){
        m_RoomsData[i][j]=0;
    }
}
var io=require("socket.io").listen(3000);
io.sockets.on('connection',function(socket){
    console.log(socket.id);
    socket.on("login",onLogin);//登录
    socket.on("joinRoom",onJoinRoom);//加入房间
    socket.on("leaveRoom",onLeaveRoom);//离开房间
    socket.on("ready",onReady);//游戏准备
    socket.on("disconnect",onDisconnect);//断开连接
    socket.on("rollGo",onRollGo);//游戏执行
    socket.on("stepsUpdate",onStepsUpdate);//步数更新
    socket.on("over",onGameOver);//游戏结束的状态分发
    socket.on("eat",onEat);//吃子步数改变
});
var onLogin=function(data){
    var ret=0;
    var sid=this.id;
    if(n_Clients<maxClient){
        var client={
            socket:this,
            name:data.name,
            status:0,
            rid:-1,
            pid:-1
        };
        m_Connections[sid]=client;
        console.log(m_Connections[sid].rid+":"+m_Connections[sid].pid+":"+m_Connections[sid].status);
        n_Clients++;
        this.emit("login",{
            "ret":1,
            "name":data.name
        });
    }else{
        this.emit("login",{"ret":0});
    }
};
var onJoinRoom=function(data){
    console.log("join rid:"+data.rid+" pid:"+data.pid);
    var sid=this.id;
    //m_Rooms[rid][pid-1]==null
    var rid=data.rid;
    var pid=data.pid;
    if(rid>-1&&rid<maxRid&&(pid==1||pid==2||pid==3||pid==4
        )&&m_Connections[sid]&&m_Connections[sid].status!=2
        &&(m_Rooms[rid][pid-1]==null || typeof (m_Rooms[rid][pid-1])==undefined)){
        var orid=m_Connections[sid].rid;
        var opid=m_Connections[sid].pid;

        m_Connections[sid].rid=rid;
        m_Connections[sid].pid=pid;
        m_Connections[sid].status=0;
        // console.log(m_Connections);
        m_Rooms[data.rid][data.pid-1]=sid;
        console.log(m_Rooms);
        io.sockets.emit("joinRoom",{
            "rid":data.rid,
            "pid":data.pid,
            "name":m_Connections[sid].name,
            "id":sid
        });
    }else{
        this.emit("joinRoomError", '');
    }
};
var onLeaveRoom=function(data){
    var sid=this.id;
    console.log(sid+"离开了房间");
    m_Connections[sid].rid=-1;
    m_Connections[pid].pid=-1;
};
var onReady=function(data){
    var sid=this.id;
    if(m_Connections[sid]&&m_Connections[sid].rid!=-1&&m_Connections[sid].status!=2){
        var status=1;
        var rid=m_Connections[sid].rid;
        m_Connections[sid].status=status;

        io.sockets.emit("ready",{
            "id":sid,
            "rid":rid,
            "pid":m_Connections[sid].pid,
            "name":m_Connections[sid].name,
            "status":status
        });
        console.log(m_Rooms[rid]);

       if(m_Rooms[rid][0]&&m_Rooms[rid][1]&&m_Rooms[rid][2]&&m_Rooms[rid][3]&&
            m_Connections[m_Rooms[rid][0]]&&m_Connections[m_Rooms[rid][1]] &&
           m_Connections[m_Rooms[rid][2]] &&m_Connections[m_Rooms[rid][3]]&&
           m_Connections[m_Rooms[rid][0]].status==1&&m_Connections[m_Rooms[rid][1]].status==1 &&
           m_Connections[m_Rooms[rid][2]].status==1 &&m_Connections[m_Rooms[rid][3]].status==1
       ){

           for (var i=0;i<4;i++){
               m_Connections[m_Rooms[rid][i]].status=2;
               m_Connections[m_Rooms[rid][i]].socket.emit("start", {
                   "rid": rid,
                   "pid": m_Connections[m_Rooms[rid][i]].pid,
                   "order": m_Connections[m_Rooms[rid][i]].pid,
                   "id": m_Rooms[rid][i]
               });
           }

       }
    }
};
var onDisconnect=function(data){
    var sid=this.id;
    var rid=m_Connections[sid].rid;
    var pid=m_Connections[sid].pid;
    if(!m_Connections[sid]) return ;
    n_Clients--;

    console.log(sid+":"+rid+":"+":"+pid+" "+m_Rooms[rid]);
    if(rid!=-1 && pid!=-1){
        for(var i=0;i<4;i++){
            if(m_Rooms[rid] && m_Rooms[rid][i]&& m_Rooms[rid][i]!=null && i!=pid-1){
                m_Connections[m_Rooms[rid][i]].socket.emit("outLine",{
                    "name":m_Connections[sid].name,
                    "pid":pid
                });
                m_Connections[m_Rooms[rid][i]].status=0;
                m_Connections[m_Rooms[rid][i]].rid=-1;
                m_Connections[m_Rooms[rid][i]].pid=-1;
            }

            if(i==3){
                ReInitRooms(rid);
            }
        }

        // if(m_Rooms[rid][0] && m_Rooms[rid][1] && m_Rooms[rid][2] && m_Rooms[rid][3]
        //     && m_Connections[m_Rooms[rid][0]] && m_Connections[m_Rooms[rid][1]]
        //     && m_Connections[m_Rooms[rid][2]] && m_Connections[m_Rooms[rid][3]]
        //     && m_Connections[m_Rooms[rid][0]].status==2 && m_Connections[m_Rooms[rid][1]].status==2
        //     &&m_Connections[m_Rooms[rid][2]].status==2 && m_Connections[m_Rooms[rid][3]].status==2){
        //
        //     ReInitRooms(rid);
        // }else{
        //     delete m_Rooms[rid][pid-1];
        //     console.log(m_Rooms[rid]);
        // }
    }

    delete m_Connections[sid];

    console.log(sid+"退出了");

};
var onRollGo=function(data){
    var sid=this.id;
    var rollNum=Math.floor(Math.random()*6+1);
    var rid=m_Connections[sid].rid;
    var pid=m_Connections[sid].pid;
    var currentStep=m_RoomsData[rid][pid-1];
    console.log("sid:"+sid+" rid:"+rid+" pid:"+pid+" currentStep:"+currentStep);
    for(var i=0;i<4;i++){
        m_Connections[m_Rooms[rid][i]].socket.emit("rollGo",{
            "id":sid,
            "pid":pid,
            "rid":rid
        });
    }

    for(var i=0;i<4;i++){
        m_Connections[m_Rooms[rid][i]].socket.emit("rollStop",{
            "pid":pid,
            "val":rollNum,
            "id":sid,
            "currentStep":currentStep
        });
    }

}
var onStepsUpdate=function(data){
    var sid=data.id;
    var rid=m_Connections[sid].rid;
    var pid=m_Connections[sid].pid;
    if(rid!=-1 && pid!=-1){
        m_RoomsData[rid][pid-1]=data.lastStep;
        console.log("sid:"+sid+" rid:"+rid+" pid:"+pid+" currentStep:"+m_RoomsData[rid][pid-1]);
    }
}
//0为胜利  1为失败
var onGameOver=function(data){
    var id=data.id;
    var rid=data.rid;
    var pid=data.pid;

    for(var i=0;i<4;i++){
        if(i==pid-1){
            m_Connections[m_Rooms[rid][i]].socket.emit("over",{
                "over":0
            });
        }else{
            m_Connections[m_Rooms[rid][i]].socket.emit("over",{
                "over":1
            });
        }
        m_Connections[m_Rooms[rid][i]].status=0;
        m_Connections[m_Rooms[rid][i]].rid=-1;
        m_Connections[m_Rooms[rid][i]].pid=-1;
        if(i==3){
            ReInitRooms(rid);
        }
    }

}
var onEat=function(data){
    var sid=this.id;
    var rid=m_Connections[sid].rid;
    var id=data.id;
    m_RoomsData[rid][id]=0;
    console.log(m_RoomsData[rid]);

}
var ReInitRooms=function(rid){
    m_Rooms[rid]=[];
    m_RoomsData[rid]=[0,0,0,0];
    console.log("RE"+rid+":::"+m_Rooms[rid]+":"+m_RoomsData[rid]);
}