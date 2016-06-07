/**
 *创建一个用户 用于游戏逻辑  
 * @author 
 * 1红 2黄 3绿 4蓝
 */
class Player {
	public constructor() {
    	
	}
	private col:number;//颜色
	private path:any;//路径
	private id:string;//联网生成的id
    private rid:number;//房间id
    private pid:number;//位置id
    private pname:string;
    
    public getPname():string{
        return this.pname;
    }
    public setPname(pname:string){
        this.pname=pname;
    }
    
	
	public setCol(col:number){
	    this.col=col;
	}	
	public setPath(path:any){
	    this.path=path;
	}	
	public setId(id:string){
	    this.id=id;
	}
    public setRid(rid: number) {
        this.rid = rid;
    } 
    public setPid(pid: number) {
        this.pid = pid;
    }
	
    
	
	public getCol():number{
	    return this.col;
	}	
	public getPath():any{
	    return this.path;
	}	
	public getId():string{
	    return this.id;
	}	
    public getRid(): number {
        return this.rid;
    }
    public getPid(): number {
        return this.pid;
    }
	
}
