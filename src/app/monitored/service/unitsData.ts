export class stateInto{
    id:String;
    name:String;
    state:String;
    AlarmList:String[]|null;
    time:String;
    elapsed:string;
    lat:string;
    long:string;

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