import * as moment from 'moment';
// Named function
function Convertor(seriasData) {
    let series=  []
    var  data = [];
    const seriesInfo= ["Oil_P" ,"Water_T" ];

    // initialize array
    for(var j = 0; j < seriesInfo.length; j++) {
        data[j] = [];
    }

    for (let  i = 0; i < seriasData.length; i++) {

        for (let  f = 0; f < seriesInfo.length; f++){
            var obj3 = {
                x: moment(seriasData[i].time).format('MM/DD/YYYY HH:mm:ss'),
                y: seriasData[i][seriesInfo[f]]
            };
        data[f].push(obj3);
        }
    }
    
    for (let  f = 0; f < seriesInfo.length; f++){
        series.push(
            { data: data[f], label:seriesInfo[f],backgroundColor : 'rgba(255,0,0,0.3)' }
        );
    }
    return series;
}

export const mockk2=Convertor;