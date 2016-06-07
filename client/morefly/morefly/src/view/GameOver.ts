/**
 *
 * @author 
 *
 */
class GameOver extends egret.Sprite{
	public constructor(over:number) {
    	super();
    	this.init(over);
    	console.log("over:"+over);
	}
	private init(over:number){
    	  //0为胜利  1为失败
	    if(over==0){
            this.winner();
	    }else{
	        this.loser();
	    }

	}
	private mc:egret.MovieClip;
	private mcf:egret.MovieClipDataFactory;
	private winner(){
    	  console.log("win");
        var data = RES.getRes("winer_json");
        var tex = RES.getRes("winer_png");
	    this.mcf=new egret.MovieClipDataFactory(data,tex);
	    this.mc=new egret.MovieClip(this.mcf.generateMovieClipData("winer"));
	    this.addChild(this.mc);
	    this.mc.play();
	}
	private loser(){
	    console.log("loser");
        var data = RES.getRes("lose_json");
        var tex = RES.getRes("lose_png");
	    this.mcf=new egret.MovieClipDataFactory(data,tex);
	    this.mc=new egret.MovieClip(this.mcf.generateMovieClipData("lose"));
	    this.addChild(this.mc);
	    this.mc.play();
	}
}
