/**
 *
 * @author
 *
 */
var HandleEvt = (function (_super) {
    __extends(HandleEvt, _super);
    function HandleEvt() {
        _super.call(this);
        this.allLine = [];
        this.init();
    }
    var d = __define,c=HandleEvt,p=c.prototype;
    p.drawbtn = function () {
        this.startbtn = new egret.Bitmap();
        this.startbtn.texture = RES.getRes("start_png");
        this.startbtn.x = 150;
        this.startbtn.y = 665;
        this.startbtn.touchEnabled = true;
    };
    p.getData = function () {
        this.data = new MapData();
        var roundData = this.data.getRoundData();
        var endData = this.data.getEndData();
        this.redLine = (this.data.redinit.slice(0, 1)).concat(roundData.slice(39, 52))
            .concat(roundData.slice(0, 37))
            .concat(endData.slice(0, 6));
        this.yelLine = (this.data.yelinit.slice(0, 1)).concat(roundData.slice(0, 50))
            .concat(endData.slice(6, 12));
        this.greLine = (this.data.greinit.slice(0, 1)).concat(roundData.slice(13, 52))
            .concat(roundData.slice(0, 11))
            .concat(endData.slice(12, 18));
        this.bluLine = (this.data.bluinit.slice(0, 1)).concat(roundData.slice(26, 52))
            .concat(roundData.slice(0, 24))
            .concat(endData.slice(18, 24));
        this.allLine = [this.redLine, this.yelLine, this.greLine, this.bluLine];
    };
    p.init = function () {
        this.socket = new Connection(ConnectionData.host, ConnectionData.port);
        this.setOn();
        this.lv = new LoginView();
        this.addChild(this.lv);
        this.lv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.login, this);
        //        this.hv=new HallView();
        //       	
        var gv = new GameOver(0);
        this.addChild(gv);
    };
    p.login = function (evt) {
        if (this.lv.getLoginText()) {
            //    	    console.log("开始连接服务器并登录");
            this.socket.connect();
            this.socket.login(this.lv.getLoginText());
        }
    };
    p.gameState = function (evt) {
        var rid = 0;
        var name = evt.target.name;
        if (name == "down") {
            console.log(evt.target.name);
        }
        else {
            this.socket.joinRoom(rid, name);
        }
    };
    p.setOn = function () {
        var self = this;
        this.socket.on("login", function (data) {
            if (data.ret == 1) {
                self.loginSucceed(data);
            }
            else {
                self.loginFailed();
            }
        });
        this.socket.on("joinRoom", function (data) {
            self.joinRoomMsg(data);
        });
        this.socket.on("ready", function (data) {
            console.log("id:" + data.id + ",name:" + data.name + ",rid:" + data.rid + ",pid:" + data.pid + ",status:" + data.status + " . ready");
            self.txtMsg.text = "name:" + data.name + ",pid:" + data.pid + " ready";
        });
        this.socket.on("start", function (data) {
            self.GoStart(data);
        });
        this.socket.on("rollGo", function (data) {
            self.rollStart(data);
        });
        this.socket.on("rollStop", function (data) {
            self.rollStop(data);
        });
        this.socket.on("over", function (data) {
            var over = data.over;
            self.Gameover(over);
        });
        this.socket.on("outLine", function (data) {
            self.MsgToAll(data);
        });
        this.socket.on("joinRoomError", function () {
            self.joinRoomError();
        });
    };
    p.joinRoomError = function () {
        this.txtMsg.text = "加入失败，再找个位置.";
    };
    //登录成功
    p.loginSucceed = function (data) {
        this.removeChild(this.lv);
        this.personName = data.name;
        //	    console.log("name:"+this.personName+" 登录成功");
        this.rv = new RoomView();
        this.addChild(this.rv);
        this.pv = new PositionView();
        this.pv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameState, this);
        this.addChild(this.pv);
        this.txtMsg = new egret.TextField();
        this.txtMsg.background = true;
        this.txtMsg.backgroundColor = 0xECECEC;
        this.txtMsg.border = true;
        this.txtMsg.borderColor = 0x000000;
        this.txtMsg.size = 35;
        this.txtMsg.text = "请加入位置，状态准备";
        this.txtMsg.textColor = 0;
        this.txtMsg.height = 50;
        this.txtMsg.width = 400;
        this.txtMsg.textAlign = egret.HorizontalAlign.CENTER;
        this.txtMsg.x = 40;
        this.txtMsg.y = 10;
        this.addChild(this.txtMsg);
    };
    //登录失败
    p.loginFailed = function () {
        console.log("fail");
    };
    //加入房间位置
    p.joinRoomMsg = function (data) {
        //        console.log("name:"+data.name+",rid:"+data.rid+",pid:"+data.pid+",id:"+data.id+" joinRoom"); 
        this.pv.getChildAt(data.pid).touchEnabled = false;
        this.pv.getChildAt(data.pid).width = this.pv.getChildAt(data.pid).height = 50;
        this.txtMsg.text = "name:" + data.name + " joinRoom. pid:" + data.pid;
        if (this.personName == data.name) {
            this.removeChild(this.pv);
            this.drawbtn();
            this.rv.addChild(this.startbtn);
            this.startbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.socket.ready();
                //                self.startbtn.touchEnabled = false;
                console.log("触发了");
            }, this);
        }
    };
    p.GoStart = function (data) {
        this.rv.removeChild(this.startbtn);
        this.getData();
        this.drawPlane(data);
        this.personID = data.id;
        this.personRid = data.rid;
        this.personPid = data.pid;
        this.personOrder = data.order;
        //        console.log("id:"+this.personID+",rid:"+this.personRid+",pid:" + this.personPid+",order:"+this.personOrder);
    };
    p.drawPlane = function (data) {
        for (var i = 1; i < 5; i++) {
            var p = new egret.Bitmap();
            p.texture = RES.getRes(i + "_png");
            p.x = this.allLine[i - 1][0][0];
            p.y = this.allLine[i - 1][0][1];
            p.name = (i).toString();
            this.rv.addChild(p);
        }
        this.txtMsg.text = "游戏开始了";
        this.rol = new Roll();
        this.rol.x = 200;
        this.rol.y = 660;
        this.addChild(this.rol);
        if (data.pid == 1) {
            this.rol.touchEnabled = true;
            this.txtMsg.text = "你先开始";
        }
        else {
            this.rol.touchEnabled = false;
        }
        this.rol.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerRoll, this);
    };
    p.playerRoll = function (evt) {
        this.socket.rollGo();
        this.rol.touchEnabled = false;
    };
    p.rollStart = function (data) {
        this.rol.mc.play(-1);
        this.hisId = data.id;
        this.hisRid = data.rid;
        this.hisPid = data.pid;
    };
    p.rollStop = function (data) {
        //    	console.log("rollStop id:"+data.id+",pid:"+data.pid+" ,val"+data.val+",current:"+data.currentStep);
        var val = data.val;
        this.curStep = data.currentStep;
        this.curVal = data.val;
        var lastStep = data.val + data.currentStep;
        this.lastStep = lastStep;
        egret.setTimeout(this.stop, this, 1000, val);
        //        this.socket.stepsUpdate(this.hisId,this.curStep + val);      
    };
    p.stop = function (val) {
        this.rol.mc.gotoAndStop(val);
        console.log("begin:" + this.curStep + ",stop:" + this.lastStep);
        var str = "";
        if (this.hisPid == 1) {
            str = "红色";
        }
        if (this.hisPid == 2) {
            str = "黄色";
        }
        if (this.hisPid == 3) {
            str = "绿色";
        }
        if (this.hisPid == 4) {
            str = "蓝色";
        }
        this.txtMsg.text = "" + str + "投掷了 " + val + " 点";
        if (this.lastStep > 55) {
            var setVal = 56 - this.curStep;
            var onTimer = new egret.Timer(500, setVal);
            console.log("lastStep:" + this.lastStep + ",setVal:" + setVal);
        }
        else {
            var onTimer = new egret.Timer(500, val);
            console.log("normal val:" + val);
        }
        onTimer.addEventListener(egret.TimerEvent.TIMER, this.fly, this);
        onTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.flycomplete, this);
        onTimer.start();
    };
    //正常飞
    p.fly = function (evt) {
        var pid = this.hisPid;
        var num = evt.target.currentCount;
        var sp = this.rv.getChildAt(pid);
        egret.Tween.get(sp).to({ x: this.allLine[pid - 1][this.curStep + num][0], y: this.allLine[pid - 1][this.curStep + num][1] }, 500, egret.Ease.cubicInOut);
    };
    p.flycomplete = function () {
        var lastStep = this.lastStep;
        var pid = this.hisPid;
        var sp = this.rv.getChildAt(pid);
        if (lastStep < 51) {
            this.Replace(pid, lastStep);
        }
        if (lastStep < 50 && this.allLine[pid - 1][lastStep][2] == pid) {
            if (lastStep == 18) {
                this.lastStep = lastStep + 12;
                //该动画未执行 
                egret.setTimeout(function () {
                    egret.Tween.get(sp).to({ x: this.allLine[pid - 1][lastStep][0], y: this.allLine[pid - 1][lastStep][1] }, 1000, egret.Ease.cubicInOut);
                }, this, 500);
                egret.setTimeout(function () { }, this, 500);
            }
            egret.setTimeout(function () {
                var UpTimer = new egret.Timer(500, 4);
                UpTimer.addEventListener(egret.TimerEvent.TIMER, this.StepUp, this);
                UpTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.StepUpComplete, this);
                UpTimer.start();
            }, this, 500);
        }
        else {
            if (this.personID == this.hisId) {
                this.socket.stepsUpdate(this.hisId, lastStep);
            }
            if (this.curVal == 6 && this.personID == this.hisId) {
                this.txtMsg.text = "再摇一次.";
                this.rol.touchEnabled = true;
            }
            if (this.curVal != 6) {
                this.playerOrder();
            }
            if (lastStep > 55 && this.personID == this.hisId) {
                this.socket.Over(this.hisId, this.hisRid, this.hisPid);
            }
        }
    };
    //跳跃
    p.StepUp = function (evt) {
        var lastStep = this.lastStep;
        var pid = this.hisPid;
        var sp = this.rv.getChildAt(pid);
        var num = evt.target.currentCount;
        egret.Tween.get(sp).to({ x: this.allLine[pid - 1][lastStep + num][0], y: this.allLine[pid - 1][lastStep + num][1] }, 500, egret.Ease.cubicInOut);
    };
    p.StepUpComplete = function () {
        var curStep = this.lastStep + 4;
        var pid = this.hisPid;
        var sp = this.rv.getChildAt(pid);
        this.Replace(pid, curStep);
        if (curStep == 18) {
            curStep = curStep + 12;
            //该动画未执行
            egret.setTimeout(function () {
                egret.Tween.get(sp).to({ x: this.allLine[pid - 1][curStep][0], y: this.allLine[pid - 1][curStep][1] }, 1500, egret.Ease.cubicInOut);
            }, this, 1000);
            this.Replace(pid, curStep);
        }
        if (this.personID == this.hisId) {
            this.socket.stepsUpdate(this.hisId, curStep);
        }
        if (this.curVal == 6 && this.personID == this.hisId) {
            this.txtMsg.text = "再摇一次.";
            this.rol.touchEnabled = true;
        }
        if (this.curVal != 6) {
            this.playerOrder();
        }
    };
    //游戏结束
    p.Gameover = function (over) {
        this.removeChildren();
        var gv = new GameOver(over);
        this.addChild(gv);
        gv.touchEnabled = true;
        gv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reStart, this);
    };
    p.reStart = function (evt) {
        this.addChild(this.rv);
        this.rv.removeChildAt(4);
        this.rv.removeChildAt(3);
        this.rv.removeChildAt(2);
        this.rv.removeChildAt(1);
        this.txtMsg.text = "";
        this.addChild(this.txtMsg);
        this.pv = new PositionView();
        this.pv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameState, this);
        this.addChild(this.pv);
    };
    //吃子
    p.Replace = function (pid, lastStep) {
        var place = [];
        var x = 0;
        var y = 0;
        for (var i = 1; i < 5; i++) {
            var sp = this.rv.getChildAt(i);
            x = Math.floor(sp.x);
            y = Math.floor(sp.y);
            place[i] = [x, y];
        }
        var curX = this.allLine[pid - 1][lastStep][0];
        var curY = this.allLine[pid - 1][lastStep][1];
        var _loop_1 = function(i) {
            if (i != pid) {
                if (place[i][0] == curX && place[i][1] == curY) {
                    var sp_1 = this_1.rv.getChildAt(i);
                    egret.setTimeout(function () {
                        egret.Tween.get(sp_1).to({ x: this.allLine[i - 1][0][0], y: this.allLine[i - 1][0][1] }, 1500, egret.Ease.circInOut);
                    }, this_1, 100);
                    console.log("pid:" + pid + " eat " + i);
                    if (this_1.personID == this_1.hisId) {
                        this_1.socket.replace(i - 1);
                    }
                }
            }
        };
        var this_1 = this;
        for (var i = 1; i < 5; i++) {
            _loop_1(i);
        }
    };
    //玩家轮流
    p.playerOrder = function () {
        if (this.personID == this.hisId) {
            this.rol.touchEnabled = false;
            this.txtMsg.text = "轮到下一位";
        }
        else {
            if (this.hisPid == 1 && this.personPid == 2) {
                this.rol.touchEnabled = true;
                this.txtMsg.text = "小子，到你了";
            }
            if (this.hisPid == 2 && this.personPid == 3) {
                this.rol.touchEnabled = true;
                this.txtMsg.text = "小子，到你了";
            }
            if (this.hisPid == 3 && this.personPid == 4) {
                this.rol.touchEnabled = true;
                this.txtMsg.text = "小子，到你了";
            }
            if (this.hisPid == 4 && this.personPid == 1) {
                this.rol.touchEnabled = true;
                this.txtMsg.text = "小子，到你了";
            }
        }
    };
    p.MsgToAll = function (data) {
        var name = data.name;
        var pid = data.pid;
        this.txtMsg.text = "pid:" + pid + ",name:" + name + " 掉了";
        if (this.contains(this.rol)) {
            this.removeChild(this.rol);
        }
        if (this.rv.contains(this.startbtn)) {
            this.rv.removeChild(this.startbtn);
        }
        if (this.rv.numChildren > 3) {
            this.rv.removeChildAt(4);
            this.rv.removeChildAt(3);
            this.rv.removeChildAt(2);
            this.rv.removeChildAt(1);
        }
        egret.setTimeout(function () {
            this.txtMsg.text = "再找个位置";
        }, this, 1000);
        this.pv = new PositionView();
        this.pv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameState, this);
        this.addChild(this.pv);
    };
    return HandleEvt;
}(egret.Sprite));
egret.registerClass(HandleEvt,'HandleEvt');
