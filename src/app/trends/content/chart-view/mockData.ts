import * as moment from 'moment';

// export const seriasData=[
//     {
//         "time": "2020-09-30T09:13:30.000Z",
//         "Water_T": 139,
//         "mean": 335
//     },
//     {
//         "time": "2020-09-30T09:13:35.000Z",
//         "Water_T": 271.6,
//         "mean": 165
//     },
//     {
//         "time": "2020-09-30T09:13:40.000Z",
//         "Water_T": 229,
//         "mean": 220.5
//     },
//     {
//         "time": "2020-09-30T09:13:45.000Z",
//         "Water_T": 339,
//         "mean": 283.75
//     },
//     {
//         "time": "2020-09-30T09:13:50.000Z",
//         "Water_T": null,
//         "mean": 275.25
//     },
//     {
//         "time": "2020-09-30T09:13:58.000Z",
//         "Water_T": 271,
//         "mean": 171
//     },
//     {
//         "time": "2020-09-30T09:14:00.000Z",
//         "Water_T": 313.4,
//         "mean": 174.4
//     },
//     {
//         "time": "2020-09-30T09:14:05.000Z",
//         "Water_T": 216.25,
//         "mean": 234.75
//     },
//     {
//         "time": "2020-09-30T09:14:10.000Z",
//         "Water_T": 184.25,
//         "mean": 169.5
//     },
//     {
//         "time": "2020-09-30T09:14:15.000Z",
//         "Water_T": 169,
//         "mean": 206
//     },
//     {
//         "time": "2020-09-30T09:14:20.000Z",
//         "Water_T": 176,
//         "mean": 298.5
//     },
//     {
//         "time": "2020-09-30T09:14:25.000Z",
//         "Water_T": 277.5,
//         "mean": 275
//     },
//     {
//         "time": "2020-09-30T09:14:30.000Z",
//         "Water_T": 213.6,
//         "mean": 287
//     },
//     {
//         "time": "2020-09-30T09:14:35.000Z",
//         "Water_T": 249.5,
//         "mean": 321.5
//     },
//     {
//         "time": "2020-09-30T09:14:40.000Z",
//         "Water_T": 282,
//         "mean": 273.5
//     },
//     {
//         "time": "2020-09-30T09:14:45.000Z",
//         "Water_T": 327.25,
//         "mean": 292.75
//     },
//     {
//         "time": "2020-09-30T09:14:50.000Z",
//         "Water_T": 238.2,
//         "mean": 223.6
//     },
//     {
//         "time": "2020-09-30T09:14:55.000Z",
//         "Water_T": 247,
//         "mean": 194
//     },
//     {
//         "time": "2020-09-30T09:15:00.000Z",
//         "Water_T": 210.75,
//         "mean": 209.25
//     },
//     {
//         "time": "2020-09-30T09:15:05.000Z",
//         "Water_T": 341,
//         "mean": 419
//     },
//     {
//         "time": "2020-09-30T09:15:10.000Z",
//         "Water_T": 217.8,
//         "mean": 245
//     },
//     {
//         "time": "2020-09-30T09:15:15.000Z",
//         "Water_T": 314,
//         "mean": 206
//     },
//     {
//         "time": "2020-09-30T09:15:20.000Z",
//         "Water_T": 307.5,
//         "mean": 337.75
//     },
//     {
//         "time": "2020-09-30T09:15:25.000Z",
//         "Water_T": 146.25,
//         "mean": 273.5
//     },
//     {
//         "time": "2020-09-30T09:15:30.000Z",
//         "Water_T": 242,
//         "mean": 132
//     }
// ];

// Named function
function Convertor(seriasData) {
var  data1:any[] = [];
var  data2:any[] = [];
for (let  i = 0; i < seriasData.length; i++) {
    var obj1 = {
            x: moment(seriasData[i].time).format('MM/DD/YYYY HH:mm:ss'),
            y: seriasData[i].Water_T,
        };
        var obj2 = {
            x: moment(seriasData[i].time).format('MM/DD/YYYY HH:mm:ss'),
            y: seriasData[i].mean,
        };

        data1.push(obj1);
        data2.push(obj2);
    }
    
 let series=  [
    { data: data1, label: 'Series B' ,backgroundColor : 'rgba(255,0,0,0.3)' },
    { data: data2, label: 'Series B' ,backgroundColor : 'rgba(255,0,0,0.3)' }
    ] ;

    return series;
}
    export const mockk2=Convertor;


// export const TRENDSINFO: String = "dfcrgf";

