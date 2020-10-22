export interface TrendInfo {
  GroupId:number;
  GroupName:string;
  UnitsSeriesInfo:SeriesInfo[];
  }
 
  export interface SeriesInfo {
    metricsInfo:MetricInfo[];
    startDate: Date|null ;
    endDate: Date|null;    
  }
  export interface MetricInfo {
    UnitId: number;
    UnitName:string;    
    Measurment: string[];
  }

  export interface SeriesData {any}