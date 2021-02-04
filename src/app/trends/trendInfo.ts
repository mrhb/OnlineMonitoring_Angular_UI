import { Moment } from 'jalali-moment';

export interface TrendInfo {
  GroupId:number;
  GroupName:string;
  UnitsInfo:UnitInfo[];
  }
  export interface UnitInfo {
    id: string;
    deviceType:string;
    name:string;
  }
 
  export interface SeriesInfo {
    metricsInfo:MetricInfo[];
    startDate: number|null ;
    endDate: number|null;    
  }
  export class MetricInfo {
    Unit: UnitInfo;
    metricName: String;
    selected:boolean=false;
  }

  export interface SeriesData {any}