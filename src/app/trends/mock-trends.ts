import { TrendInfo } from './trendInfo';

export const TRENDSINFO: TrendInfo[] = [
  {
    GroupId:1,
    GroupName:'maqsoud',
    UnitsSeriesInfo:[
      { UnitId: 11, UnitName: 'aban' ,variables:['power','frequency'],startDate:null, endDate:null,},
      { UnitId: 12, UnitName: 'Unit 20'   ,variables:['power','frequency'],startDate:null, endDate:null,},
    ]
  },
  {
    GroupId:2,
    GroupName:'CharmShahr',
    UnitsSeriesInfo:[
      { UnitId: 13, UnitName: 'Unit 1',variables:['power','frequency'],startDate:null, endDate:null,},
      { UnitId: 15, UnitName: 'Unit 20' ,variables:['power','frequency'],startDate:null, endDate:null,},
      ]
    }
  ];
  export const METRICS:string[]=[
    
  ]