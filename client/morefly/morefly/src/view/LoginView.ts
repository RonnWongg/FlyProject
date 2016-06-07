/**
 *
 * @author 
 *
 */
class LoginView extends egret.Sprite{
	public constructor() {
    	super();
    	this.drawLogin();
	}
	private loginText:egret.TextField;
	private loginButton:egret.Bitmap;
	private drawLogin(){
        this.loginText = new egret.TextField();
        this.loginText.x = 150;
        this.loginText.y = 200;
        this.loginText.width = 150;
        this.loginText.height = 38;
        this.loginText.type = egret.TextFieldType.INPUT;
        this.loginText.background = true;
        this.loginText.backgroundColor = 0xffffff;
        this.loginText.textColor = 0;
        this.loginText.size = 35;
        
        this.addChild(this.loginText);
	
        this.loginButton = new egret.Bitmap();
        this.loginButton.texture = RES.getRes("login_png");       
        this.loginButton.touchEnabled = true;
        this.loginButton.x = 150;
        this.loginButton.y = 250;
        
        this.loginButton.touchEnabled = true;
        
        this.addChild(this.loginButton);
	}
	
	public getLoginText():any{
	    return this.loginText.text;
	}
	
}
