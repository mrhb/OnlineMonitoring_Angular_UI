import * as moment from 'moment';
import { SeriesInfo } from '../../trendInfo';
// Named function
function Convertor(seriasData,seriesInfo:SeriesInfo) {
    let series=  []
    var  data = [];

    //const metrics= ["Oil_P" ,"Water_T" ];
    const metrics= [];
    const lables= [];


    for(var m = 0; m < seriesInfo.metricsInfo.length; m++) {
        metrics[m] =seriesInfo.metricsInfo[m]["metricName"];
        lables[m] =seriesInfo.metricsInfo[m]["Unit"]["name"]+": "+seriesInfo.metricsInfo[m]["metricName"];

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
            { data: data[f], label:lables[f] }
        );
    }
    return series;
}

export const DataPreparation=Convertor;