import { stateInto } from "@app/monitored/service/UnitsData";
import  * as moment from 'jalali-moment';
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
                temp.counter=this.calCounter(m,item.Run_Hours);
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

        calCounter(m:Maintenance,CurrentRunhour:number):number
        {
            var counter=0;
            switch(m.criteria as any) { 
                case 'runHour': { 
                    var temp=m.runHour+m.duration; //ساعت کارکردی که باید سرویس مجددا انجام شود
                    counter= CurrentRunhour-temp;
                    break; 
                } 
                case 'day' : { 
                    let createdDate = moment(m.date).utc().format();
                    let expirationDate = moment(m.date).add(m.duration, 'd');//روزی که باید مجددا سرویس انجام شود
                    counter=expirationDate.subtract(moment.now()).hours();
                   //statements; 
                   break; 
                } 
                default: { 
                   //statements; 
                   break; 
                } 
             } 
             if(counter<0) counter=0;
            return counter;
        }
    }

export interface Maintenance {
    name: string;
    criteria:{
        type: String,
        enum: ['day','runHour']
    },
    duration:number;
    runHour:number;
    date:Date;
}