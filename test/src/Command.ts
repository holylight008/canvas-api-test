interface Command {

    execute(callback: Function): void;

    cancel(callback: Function): void;

}

class WalkCommand implements Command {
    private tiles: tile[];
    private _hasBeenCancelled;
    constructor(tiles: tile[]) {
        this.tiles = tiles;
        this._hasBeenCancelled = false;
    }

    execute(callback: Function): void {
        GameScene.getCurrentScene().moveTo(this.tiles, () => {
            if (!this._hasBeenCancelled) {
                callback();
            }
        })
    }

    cancel(callback: Function) {
        GameScene.getCurrentScene().stopMove(() => {
            this._hasBeenCancelled = true;
            callback();
        })
    }
}

class FightCommand implements Command {
    /**
     * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
     */
    private _hasBeenCancelled = false;
    private player:Player;
    private monster:Monster;
    constructor(player:Player,monster:Monster){
        this.player=player;
        this.monster=monster;
    }

    execute(callback: Function): void {
        console.log("开始战斗");
        if(!this._hasBeenCancelled){
            this.player.Macine.ChangeState(new FightState(this.player,this.monster));
        }
    }

    cancel(callback: Function) {
        this._hasBeenCancelled = true;
        //每更换一次序列帧图片的时间是0.25s，因此此处每0.2s检查一次
        // if(!this.player.Macine.getCurrentState().isSequenceOver()){
        //     egret.setTimeout(()=>{
        //         this.cancel(callback);
        //     },this,200);
        // }else{
        //     console.log("脱离战斗");
        //     callback();
        // }
        console.log("脱离战斗");
        callback();
    }
}

class TalkCommand implements Command {
    execute(callback: Function): void {
        console.log("打开对话框");
        UiManager.getCurrentUiManager().addPanel(UiManager.DIALOGPANEL,true);
    }

    cancel(callback: Function) {
        console.log("关闭对话框");
        UiManager.getCurrentUiManager().removePanel();
        callback();
    }
}
class IdleCommand implements Command{
    private player:Player;
    constructor(player:Player){
        this.player=player;
    }
    execute(callback: Function): void {
        console.log("开始停留");
        this.player.Macine.ChangeState(new IdleState(this.player));
        callback();
    }

    cancel(callback: Function) {
        console.log("结束停留");
        callback();
    }
}

class CommandList {

    private _list: Command[] = [];
    private currentCommand: Command;
    private _frozen = false;

    addCommand(command: Command) {
        this._list.push(command);
    }

    cancel() {
        this._frozen = true;
        var command = this.currentCommand;
        //2s后无论是否取消完毕都解冻
        setTimeout(() => {
            if (this._frozen) {
                this._frozen = false;
            }
        }, this, 2000);
        if (command) {
            command.cancel(() => {
                this._frozen = false;
            });
            this._list = [];
        } else {
            this._frozen = false;
            this._list = [];
        }

    }

    execute() {
        if (this._frozen) {
            setTimeout(this.execute, this, 100);
            return;
        }

        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command)
            command.execute(() => {
                this.execute()
            })
        }
        else {
            console.log("全部命令执行完毕")
        }
    }
    pass(){
        if(this.currentCommand){
            this.currentCommand.cancel(()=>{
                this._frozen=false;
                this.execute();
            });
        }
    }
}