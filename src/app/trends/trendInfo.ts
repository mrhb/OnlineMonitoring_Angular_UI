import { Moment } from 'jalali-moment';

export interface TrendInfo {
  GroupId:number;
  GroupName:string;
  UnitsInfo:UnitInfo[];
  }
  export interface UnitInfo {
    UnitId: number;
    UnitType:string;
    UnitName:string;
  }
 
  export interface SeriesInfo {
    metricsInfo:MetricInfo[];
    startDate: number|null ;
    endDate: number|null;    
  }
  export interface MetricInfo {
    Unit: UnitInfo;
    Measurment: String;
  }

  export interface SeriesData {any}