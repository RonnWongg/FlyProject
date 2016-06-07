/**
 *
 * @author 
 *
 */
class Roll extends egret.Sprite {
	public constructor() {
    	super();
    	this.init();    	
	}
    public mc: egret.MovieClip;
    private mcf: egret.MovieClipDataFactory;
    private val:number=0;
 
    private init(){
        var data = RES.getRes("dice_json");
        var tex = RES.getRes("dice_png");
        this.mcf = new egret.MovieClipDataFactory(data,tex);
        this.mc = new egret.MovieClip(this.mcf.generateMovieClipData("dice"));
        this.addChild(this.mc);
//        this.mc.touchEnabled = true;
//        this.mc.addEventListener(egret.TouchEvent.TOUCH_TAP,this.roll,this);
    }
    public setVal(): void {
        this.val = Math.floor(Math.random() * 6) + 1;
    }
    public getVal(): number {
        return this.val;
    }
    private roll(evt: egret.Event) {
        this.mc.play(-1)
//        this.setVal();
        this.mc.addEventListener(egret.Event.COMPLETE,this.complete,this);
    }
    private complete(evt: egret.Event) {      
//        console.log(this.val);
//        this.mc.gotoAndStop(this.val);
    }
}
