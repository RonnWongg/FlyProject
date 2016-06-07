/**
 *
 * @author 
 *
 */
class PositionView extends egret.Sprite {
    public shutdown:egret.Bitmap;
    public p1: egret.Bitmap;
    public p2: egret.Bitmap;
    public p3: egret.Bitmap;
    public p4: egret.Bitmap;
	public constructor() {
    	super();

        this.shutdown= new egret.Bitmap();
        this.shutdown.texture = RES.getRes("shutdown_png");
        this.shutdown.x = 420;
        this.shutdown.name = "down";
        this.shutdown.touchEnabled = true;
        this.addChild(this.shutdown);
    	
        this.p1=new egret.Bitmap();
        this.p1.texture=RES.getRes("p1_png");
        this.p1.width=this.p1.height=100;
        this.p1.x=MapData.posData[0][0];
        this.p1.y=MapData.posData[0][1];
        this.p1.touchEnabled=true;
        this.addChild(this.p1);
        
        this.p2=new egret.Bitmap();
        this.p2.texture=RES.getRes("p2_png");
        this.p2.width = this.p2.height = 100;
        this.p2.x = MapData.posData[1][0];
        this.p2.y = MapData.posData[1][1];
        this.p2.touchEnabled=true;
        this.addChild(this.p2);
        
        this.p3 = new egret.Bitmap();
        this.p3.texture = RES.getRes("p3_png");
        this.p3.width = this.p3.height = 100;
        this.p3.x = MapData.posData[2][0];
        this.p3.y = MapData.posData[2][1];
        this.p3.touchEnabled = true;
        this.addChild(this.p3);
        
        this.p4= new egret.Bitmap();
        this.p4.texture = RES.getRes("p4_png");
        this.p4.width = this.p4.height = 100;
        this.p4.x = MapData.posData[3][0];
        this.p4.y = MapData.posData[3][1];
        this.p4.touchEnabled = true;
        this.addChild(this.p4);
        
        this.p1.name="1";
        this.p2.name="2";
        this.p3.name="3";
        this.p4.name="4";
	}
}
