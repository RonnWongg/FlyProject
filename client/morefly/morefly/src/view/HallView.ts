/**
 *
 * @author 
 *大厅里 存放一个房间   房间带有一个number属性 几号房
 */
class HallView extends egret.Sprite{
	public constructor() {
    	super();
        this.init();
	}
	private sv:egret.ScrollView;
	private roomView:egret.Sprite;
	private init(){
        var content=this.drawRoom(6);
        
	    this.sv=new egret.ScrollView;
	    this.sv.width=400;
	    this.sv.height=750;
	    this.sv.x=40;
//	    this.sv.y=50;
	    this.sv.bounces=false;
	    
	    this.sv.setContent(content);
	    
	    this.addChild(this.sv);
	}
	private drawRoom(num:number){
    	var roomnumber:string;
    	this.roomView=new egret.Sprite();
	    for(var i:number=0;i<num;i++){
    	    var sr:egret.Sprite=this.single();
    	    roomnumber=i.toString();
    	    
    	    var txt:egret.TextField=new egret.TextField();
    	    txt.text="No."+roomnumber;
    	    txt.y=150;
    	    txt.height=50;
    	    txt.width=400;
    	    txt.size=30;
    	    txt.textAlign=egret.HorizontalAlign.CENTER;
    	    
    	    sr.addChild(txt);
    	    
    	    sr.name=roomnumber;
    	    sr.y=i*200;
    	    
    	    sr.touchEnabled=true;
    	    
	        this.roomView.addChild(sr);
	    }
	    return this.roomView;
	}
    
	private single(){
	    var sp:egret.Sprite=new egret.Sprite();
	    sp.width=400;
	    sp.height=200;
	    
	    var roombg:egret.Bitmap=new egret.Bitmap();
	    roombg.texture=RES.getRes("room_png");
	    sp.addChild(roombg);
		roombg.x=75;
			
	    return sp;
	}
}
