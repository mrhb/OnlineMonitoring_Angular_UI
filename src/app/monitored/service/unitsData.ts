import {  Maintenance} from "@app/maintenance/service/maintenance";
export class stateInto{
    id:String;
    name:string;
    state:String;
    AlarmList:String[]|null;
    Genset_kWh:Number;
    Run_Hours:number;
    time:String;
    elapsed:string;
    lat:string;
    long:string;
    maintenances:Maintenance[];

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
       temp.Genset_kWh=item.Genset_kWh;
       temp.Run_Hours=item.Run_Hours;
       temp.time=item.time;
       temp.elapsed=item.elapsed;
       temp.lat=item.lat;
       temp.long=item.long;
       temp.maintenances=item.maintenances;
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

