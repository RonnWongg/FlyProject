/**
 *
 * @author
 *
 */
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        _super.call(this);
        this.drawLogin();
    }
    var d = __define,c=LoginView,p=c.prototype;
    p.drawLogin = function () {
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
    };
    p.getLoginText = function () {
        return this.loginText.text;
    };
    return LoginView;
}(egret.Sprite));
egret.registerClass(LoginView,'LoginView');
