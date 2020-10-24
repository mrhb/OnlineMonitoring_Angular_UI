import { TrendInfo } from './trendInfo';

export const TRENDSINFO: TrendInfo[] = [
  {
    GroupId:1,
    GroupName:'maqsoud',
    UnitsInfo:[
      { UnitId: 11, UnitName: 'aban' },
      { UnitId: 12, UnitName: 'Unit 20'},
    ]
  },
  {
    GroupId:2,
    GroupName:'CharmShahr',
    UnitsInfo:[
      { UnitId: 13, UnitName: 'Unit 1'},
      { UnitId: 15, UnitName: 'Unit 20'},
      ]
    }
  ];
export const METRICS:string[]=[
  "GAC_SP",          //10
  "GAC_FB",          //11
  "GAC_PWM",         //12
  "GAC_Current",     //13
  "RPM_SP",          //14
  "RPM_FB",          //15
  "RPM_Shifter",     //16
  "MAP_p",           //17
  "MAP_T",           //18
  "Thermocouple1",   //19
  "Thermocouple2",   //20
  "Oil_P",           //21
  "Water_T",         //22
  "Advance",         //23
  "IgnitionTime",    //24
  "Power",           //31
  "RunT_H",          //32
  "RunT_L",          //33
  ];