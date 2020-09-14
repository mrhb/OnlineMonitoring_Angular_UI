export interface TrendInfo {
  GroupId:number;
  GroupName:string;
  UnitsSeriesInfo:SeriesInfo[];
  }
  export interface SeriesInfo {
    UnitId: number;
    UnitName:string;    
    variables: string[];
    startDate: Date|null ;
    endDate: Date|null;
  }