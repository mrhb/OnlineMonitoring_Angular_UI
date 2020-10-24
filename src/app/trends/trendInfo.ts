export interface TrendInfo {
  GroupId:number;
  GroupName:string;
  UnitsInfo:UnitInfo[];
  }
  export interface UnitInfo {
    UnitId: number;
    UnitName:string;
  }
 
  export interface SeriesInfo {
    metricsInfo:MetricInfo[];
    startDate: Date|null ;
    endDate: Date|null;    
  }
  export interface MetricInfo {
    Unit: UnitInfo;
    Measurment: String;
  }

  export interface SeriesData {any}