


class Task implements TaskConditionContext{
    public static UNACCEPTALBE=0;
    public static ACCEPTABLE=1;
    public static DURING=2;
    public static CAN_SUBMIT=3;
    public static SUBMITTED=4;

    private id:string;
    private name:string;
    private desc:string;
    private status:number;
    private fromNpcId:string;
    private toNpcId:string;
    private current:number;
    private total:number;
    private condition:TaskCondition;
    private targetMonster:string;
    private nextTask:string;

    constructor(id:string,fromID:string,toID:string,status:number,condition:TaskCondition,total:number,targetMonster:string,laterTask:string){
        this.id=id;
        this.fromNpcId=fromID;
        this.toNpcId=toID;
        this.status=status;
        this.current=0;
        this.total=total;
        this.condition=condition;
        this.targetMonster=targetMonster;
        this.nextTask=laterTask;

        //此处更新会出现任务管理系统和场景管理系统中
        TaskService.getInstance().addTask(this);
    }
    public getFromID():string{
        return this.fromNpcId;
    }
    public getToID():string{
        return this.toNpcId;
    }
    public getStatus():number{
        return this.status;
    }
    public setStatus(newStatus:number):void{
        this.status=newStatus;
    }
    public getID():string{
        return this.id;
    }
    public getCondition():TaskCondition{
        return this.condition;
    }
    public getTargetMonster():string{
        return this.targetMonster;
    }
    public getNextTask():string{
        return this.nextTask;
    }
//接受任务
    public onAccept(){
        TaskService.getInstance().accept(this.id);
        this.condition.onAccept(this);
    }
//任务提交
    public onSubmit(){
        TaskService.getInstance().over(this.getID());
        this.condition.onFinish(this);
        //此处应加入onFinish逻辑为玩家增加装备
    }
//任务完成
    public onFinish():void{
        TaskService.getInstance().finish(this.getID());
    }
//杀怪进行中
    public setCurrent():void{
        this.current++;
        if(this.current==this.total){
            this.onFinish();
        }
    }
    
    public toString():string{
        if(this.status==Task.ACCEPTABLE){
            return "ACCEPTABLE";
        }else if(this.status==Task.CAN_SUBMIT){
            return "CAN_SUBMIT"
        }else if(this.status==Task.DURING){
            return "DURING"
        }else if(this.status==Task.SUBMITTED){
            return "SUBMITTED"
        }else if(this.status==Task.UNACCEPTALBE){
            return "UNACCEPTALBE"
        }
    }
}


let taskJason=[
    {id:"task_0",fromID:"npc_0",toID:"npc_1",status:Task.ACCEPTABLE,condition:"NPCTalkTaskCondition",total:1,targetMonster:"null",laterTask:"task_1"},
    {id:"task_1",fromID:"npc_1",toID:"npc_1",status:Task.UNACCEPTALBE,condition:"KillMonsterTaskCondition",total:1,targetMonster:"monster_png",laterTask:"null"}
];

class TaskFactory{
    public static createOneTask(id:string):Task{
        for(var i=0;i<taskJason.length;i++){
            if(taskJason[i].id.match(id)){
                if(taskJason[i].condition.match("NPCTalkTaskCondition")){
                    return new Task(taskJason[i].id, taskJason[i].fromID, taskJason[i].toID,
                        taskJason[i].status, new NPCTalkTaskCondition(), taskJason[i].total,
                        taskJason[i].targetMonster, taskJason[i].laterTask);
                }else if(taskJason[i].condition.match("KillMonsterTaskCondition")){
                    return new Task(taskJason[i].id, taskJason[i].fromID, taskJason[i].toID,
                        taskJason[i].status, new KillMonsterTaskCondition(), taskJason[i].total,
                        taskJason[i].targetMonster, taskJason[i].laterTask);
                }
            }
        }
    }
}