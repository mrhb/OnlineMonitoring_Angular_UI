export class stateInto{
    id:String;
    name:String;
    state:String;
    redAlarm:boolean;
    yellowAlarm:boolean;
    AlarmList:String[]|null;
    time:String;
    elapsed:string;
    lat:string;
    long:string;

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
      if(!_items)
      _items=[];
      this.items=_items.map(item=>{
       var temp=  new stateInto();

       temp.id=item.id;
       temp.name=item.name;
       temp.state=item.state;
       temp.redAlarm=item.redAlarm;
       temp.yellowAlarm=item.yellowAlarm;
       temp.AlarmList=this.readJSON(item.AlarmList);
       temp.time=item.time;
       temp.elapsed=item.elapsed;
       temp.lat=item.lat;
       temp.long=item.long;
          return temp;
      });
    } 

    
    public readJSON(str) {
      try {
        return JSON.parse(str);
    } catch (e) {
        // Instead of error, return str as json object
        return  str;
    }
    }
}