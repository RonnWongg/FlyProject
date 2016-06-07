/**
 *
 * @author 
 *房间里面有4个位置  点击某个位置 告诉其他人 我加入了这个位置
 * 当4个人坐满后 通知玩家游戏 开始  进行roll 骰子
 */
class RoomView extends egret.Sprite{
    
    private rvbg: egret.Bitmap;
    
	public constructor() {
    	super();
    	this.rvbg=new egret.Bitmap();
    	this.rvbg.texture=RES.getRes("plane_bg_png");
    	this.addChild(this.rvbg);
//    	this.init();
	}
    //画位置 及关闭按钮
	private pos:egret.Sprite;	
	private init(){
        this.pos=new egret.Sprite();  	    
	    this.addChild(this.pos);
	}
}
