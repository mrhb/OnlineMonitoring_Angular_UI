import { TrendInfo } from './trendInfo';

export const METRICS_classic:string[]=[
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

  export const METRICS_minit:string[]=[
    "Gen_V_L1-N",
    "Gen_V_L2-N",
    "Gen_V_L3-N",
    "Gen_V_L1-L2",
    "Gen_V_L2-L3",
    "Gen_V_L3-L1",
    "Gen_A_L1",
    "Gen_A_L2",
    "Gen_A_L3",
    "RPM",
    "Gen_Freq",
    "W-TerminalFreq",
    "Gen_kW",
    "Gen_kW_L1",
    "Gen_kW_L2",
    "Gen_kW_L3",
    "Gen_kVAr",
    "Gen_kVAr_L1",
    "Gen_kVAr_L2",
    "Gen_kVAr_L3",
    "Gen_PF",
    "Gen_PF_L1",
    "Gen_PF_L2",
    "Gen_PF_L3",
    "Battery_Volts",
    "Oil_Pressure",
    "water_temp",
    "ECU_State",
    "Run_Hours1",
    "Run_Hours2",
    "Energy_kWh1",
    "Energy_kWh2",
    ];
  
    export const METRICS_amf25:string[]=[
      "Gen_V_L1-N"    , //1
      "Gen_V_L2-N"    , //2
      "Gen_V_L3-N"    , //3
      "Gen_V_L1-L2"    , //5
      "Gen_V_L2-L3"    , //6
      "Gen_V_L3-L1"    , //7
      "Load_A_L1"      , //8
      "Load_A_L2"      , //9
      "Load_A_L3"      , //10
      "RPM"            , //11
      "Gen_Freq"       , //12
      "Load_kW"        , //14
      "Load_kW_L1"     , //15
      "Load_kW_L2"     , //16
      "Load_kW_L3"     , //17
      "Load_kVAr"      , //19
      "Load_kVAr_L1"   , //20
      "Load_kVAr_L2"   , //21
      "Load_kVAr_L3"   , //22
      "Load_PF"        , //23
      "Load_PF_L1"     , //24
      "Load_PF_L2"     , //25
      "Load_PF_L3"     , //26
      "Load_Char"      , //28
      "Load_Char_L1"   , //29
      "Load_Char_L2"   , //30
      "Load_Char_L3"   , //31
      "Load_kVA"       , //32
      "Load_kVA_L1"    , //33
      "Load_kVA_L2"    , //34
      "Load_kVA_L3"    , //35
      "Earth_Fault"    , //48
      "ECU_State"      , //119
      "DPF1_Soot_Load" , //183
      "DPF1_Ash_Load"  , //184
      "Engine_Speed"   , //187
      "FuelRate"       , //188
      "CoolantTemp"    , //189
      "Intake_Temp"    , //190
      "OilPress"       , //191
      "Boost_Press"    , //192
      "Load"           , //193
      "Oil_Temp"       , //194
      "ECU-AIN_9"      , //195
      "FuelUsed_1"     , //203
      "FuelUsed_2"     , //204
      "SpeedReq_RPM"   , //207
      "Speed_request"  , //208
      "ECU_FreqSelect0", //209
      "Run_Hours_1"    , //3001
      "Run_Hours_2"    , //3002
      "Maintenance"    , //3004
      "Num_Starts"     , //3005
      "Genset_kWh_1"   , //3006
      "Genset_kWh_2"   , //3007
      "Genset_kVArh_1" , //3008
      "Genset_kVArh_2" , //3009
      "Num_E-Stops_1"  , //3010
      "Num_E-Stops_2"  , //3011
      "Shutdowns_1"    , //3012
      "Shutdowns_2"    , //3013
      "Prestart_Time"  , //3034
      "Starting_RPM"   , //3035
      "MaxCrank_Time"  , //3036
      "CrnkFail_Pause" , //3037
      "Crank_Attempts" , //3038
      "Min_Stab_Time"  , //3039
      "Max_Stab_Time"  , //3040
      "Cooling_Time"   , //3041
      "Idle_Time"      , //3042
      "Fuel_Solenoid"  , //3043
      "Starting_Oil_P" , //3044
      "D+_Function"    , //3045
      "Stop_Time"      , //3046
      "Cooling_Speed"  , //3047
      "ECU_FreqSelect" , //3048
      "ECU_SpeedAdj"   , //3049
      "Fuel_Pump_ON"   , //3065
      "Fuel_Pump_OFF"  , //3066
      "PowerSwitch_ON" , //3179
      "PowerSwitchOFF" , //3180
      "TempSwitch_ON"  , //3189
      "TempSwitch_OFF" , //3190
      "MaxFuelDrop"    , //3208
      "TotFuelConsum_1", //3209
      "TotFuelConsum_2", //3210
      "FuelTankVolume" , //3212
      "Mains_kWh_1"    , //3213
      "Mains_kWh_2"    , //3214
      "Mains_kVArh_1"  , //3215
      "Mains_kVArh_2"  , //3216
      "Louver_Time"    , //3239
      "D+WrnThreshold" , //3242
      ];