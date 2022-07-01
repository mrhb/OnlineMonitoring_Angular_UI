import { getNumberOfCurrencyDigits } from "@angular/common";
import { CONST_breaker, CONST_controller } from './constants';

export class detailsInto{
    id:String;
    name:string;
    state:String;
    breakerState:String;
    controllerMode:String;
    AlarmList:String[]|null;
    Genset_kWh:Number;
    Load_A_L1:number;
    Load_A_L2:number;
    Load_A_L3:number;
    Run_Hours:number;

    Gen_V_L1_N:number;
    Gen_V_L2_N:number;
    Gen_V_L3_N:number;

    OilPress:number;
    time:String;
    elapsed:string;
    lat:string;
    long:string;
}
export class unitDetailsInto{
   public item:detailsInto;
   constructor(item:any)
    {
       var temp=  new detailsInto();

       temp.id=item.Id;
       temp.OilPress=item.OilPress/10;
       temp.state=item.state;
       try{
         temp.breakerState=CONST_breaker.find(x => x.key == item.breakerState).value ;
         temp.controllerMode=CONST_controller.find(x => x.key == item.controllerMode).value ;
       }
       catch(err){

       }
       temp.AlarmList=this.readJSON(item.AlarmList);
       temp.Load_A_L1=item.Load_A_L1;
       temp.Load_A_L2=item.Load_A_L2;
       temp.Load_A_L3=item.Load_A_L3;
       temp.Gen_V_L1_N=item["Gen_V_L1-N"];
       temp.Gen_V_L2_N=item["Gen_V_L2-N"];
       temp.Gen_V_L3_N=item["Gen_V_L3-N"];

       temp.Genset_kWh=item.Genset_kWh;
       temp.Run_Hours=item.Run_Hours;
       temp.time=item.time;
       temp.elapsed=item.elapsed;
       temp.lat=item.lat;
       temp.long=item.long;
      //  temp.maintenances=item.maintenances;
      this.item=temp;
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


