import * as moment from 'moment';
import { SeriesInfo } from '../../trendInfo';
import{GetColor} from'./ColorGenerator';
// Named function
function Convertor(seriasData,metricsInfo) {
    let series=  []
    var  data = [];

    //const metrics= ["Oil_P" ,"Water_T" ];
    const metrics= [];
    const lables= [];


    for(var m = 0; m < metricsInfo.length; m++) {
        metrics[m] =metricsInfo[m]["metricName"];
        lables[m] =metricsInfo[m]["Unit"]["name"]+": "+metricsInfo[m]["metricName"];

    }

    // initialize array
    for(var j = 0; j < metrics.length; j++) {
        data[j] = [];
    }

    for (let  i = 0; i < seriasData.length; i++) {

        for (let  f = 0; f < metrics.length; f++){
            var obj3 = {
                x: moment(seriasData[i].time).format('MM/DD/YYYY HH:mm:ss'),
                y: seriasData[i][metrics[f]]
            };
        data[f].push(obj3);
        }
    }


    for (let  f = 0; f < metrics.length; f++){
        series.push(
            {   
                data: data[f], label:lables[f] ,
                backgroundColor:GetColor(f).background.toString(),
                borderColor:GetColor(f).border.toString(),
                pointRadius: 2,
                pointHoverRadius: 4
            }
        );
    }
    return series;
}

export const DataPreparation=Convertor;