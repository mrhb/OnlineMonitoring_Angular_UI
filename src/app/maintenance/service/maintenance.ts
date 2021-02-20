export interface MaintenanceInfo {
    id:number;
    unitName:string;
    maintenances:Maintenance[];
}

export interface Maintenance {
    name: string;
    criteria:{
        type: String,
        enum: ['day','runHour']
    },
    duration:Number;
    runHour:Number;
    date:Number;
}