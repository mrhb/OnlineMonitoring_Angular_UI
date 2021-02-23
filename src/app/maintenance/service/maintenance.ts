import { stateInto } from "@app/monitored/service/UnitsData";

export interface OneUnitMaintenanceInfo {
    id:number;
    unitName:string;
    maintenances:Maintenance[];
}

export class RemainingHour {
    unitName: string;
    maintenanceName: string;
    counter: number;
    }

export class MaintenanceTime{
    public items:RemainingHour[]=[];
    constructor(_items:stateInto[] )
        {
        _items.map(item=>{
            item.maintenances.map(m=>{
                var temp=  new RemainingHour();
                temp.counter=134;
                temp.maintenanceName=m.name;
                temp.unitName=item.name;

                this.items.push(temp);
            })
    
        // temp.id=item.id;
        // temp.name=item.name;
        // temp.state=item.state;
        // temp.AlarmList=this.readJSON(item.AlarmList);
        // temp.Genset_kWh=item.Genset_kWh;
        // temp.Run_Hours=item.Run_Hours;
        // temp.time=item.time;
        // temp.elapsed=item.elapsed;
        // temp.lat=item.lat;
        // temp.long=item.long;
        // temp.maintenances=item.maintenances;
        //     return temp;
        });
        } 
    }
export interface Maintenance {
    name: string;
    criteria:{
        type: String,
        enum: ['day','runHour']
    },
    duration:Number;
    runHour:Number;
    date:Date;
}