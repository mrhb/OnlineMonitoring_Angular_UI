export class stateInto{
    id:String;
    name:String;
    state:String;
    redAlarm:boolean;
    yellowAlarm:boolean;
    time:String;
    elapsed:string;

  public   get alarm(): string {
        var x:string;

        if(false)
        x="nocomm";
        else if(this.redAlarm)
        x="red";
        else if(this.yellowAlarm)
        x="yellow";
        else
        x="online";
        return x;
    }
    public set alarm(a: string) {
      }

}
export class unitsStateInfo{
   public items:stateInto[];
   constructor(_items:any[])
    {
      this.items=_items.map(item=>{
       var temp=  new stateInto();

       temp.id=item.id;
       temp.name=item.name;
       temp.state=item.state;
       temp.redAlarm=item.redAlarm;
       temp.yellowAlarm=item.yellowAlarm;
       temp.time=item.time;
       temp.elapsed=item.elapsed;
          return temp;
      });
    } 
    public multiplyBy(x: number): number {
        return  x;
    }
}