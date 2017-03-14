class NPC extends engine.DisplayObjectContainer implements Observer{
    private emoji:engine.Bitmap;
    private id:string;
    private myBitmap:engine.Bitmap;
    private myTask:Task[];

    constructor(id:string,tex:string){
        super();
        
        this.myBitmap=new engine.Bitmap();
        this.myBitmap.texture=tex;
        this.myBitmap.x=0;
        this.myBitmap.y=0;
        this.addChild(this.myBitmap);

        this.id = id;

        this.myTask=new Array();

        var taskService:TaskService=TaskService.getInstance();
        taskService.addObserver(this);

         var flag=Task.UNACCEPTALBE;
        taskService.getTaskByCustomRole((taskList:Task[])=>{
            for(var i=0;i<taskList.length;i++){
                if(taskList[i].getToID().match(this.id) ||taskList[i].getFromID().match(this.id)){
                    this.myTask.push(taskList[i]);
                    if(taskList[i].getStatus()==Task.CAN_SUBMIT && taskList[i].getToID().match(this.id)){
                        flag=Task.CAN_SUBMIT;
                    }else if(taskList[i].getStatus()==Task.ACCEPTABLE && taskList[i].getFromID().match(this.id)){
                        flag=Task.ACCEPTABLE;
                    }else if(taskList[i].getStatus()==Task.DURING){
                        flag=Task.DURING;
                    }else if(!taskList[i].getToID().match(this.id) && !taskList[i].getFromID().match(this.id)){
                        ;
                    }
                }
            }
        });

        this.emoji=new engine.Bitmap();
        if(flag==Task.ACCEPTABLE){
            this.emoji.texture="ACCEPTABLE.png";
        }else if(flag==Task.CAN_SUBMIT){
            this.emoji.texture="CAN_SUBMIT.png";
        }else if(flag==Task.DURING){
            this.emoji.texture="DURING.png";
        }else{
            this.emoji.texture="";
        }
        
        
        this.emoji.x=0;
        this.emoji.y=-50;
        this.addChild(this.emoji);
        
        this.touchEnabled=true;
    }
    onChange(task:Task):void{
        
        if(task.getStatus()==Task.ACCEPTABLE && task.getFromID().match(this.id)){
            this.emoji.texture="ACCEPTABLE.png";
        }else if(task.getStatus()==Task.CAN_SUBMIT && task.getToID().match(this.id)){
            this.emoji.texture="CAN_SUBMIT.png";
        }else if(task.getStatus()==Task.DURING && task.getToID().match(this.id)){
            this.emoji.texture="DURING.png";
        }else if(!task.getFromID().match(this.id) && !task.getToID().match(this.id)){
            //与我无关
            ;
        }else{
            this.emoji.texture="";
        }
    }
    getMytask():Task[]{
        return this.myTask;
    }
    getId():string{
        return this.id;
    }
}