 
// Some random pastel backgrounds with saturation in range 25-95% and lightness in range 85-95%:
const hues=[266,288,187,111,97,17,50];

const backgrounds=[];
const borders=[];

for (let  f = 0; f < hues.length; f++){

    var h=hues[f];
    var s=95;//saturation  
    var l=68; //lightness    


    var a=0.8
    backgrounds[f]="hsl(" +(h) + ',' + s + '%,' +l + '%, 0.25)' ;
    borders[f]="hsl(" +(h) + ',' + s + '%,' +l + '%)';
}






function getColor(i){ 
     // Define desired object
  var obj = {
    background: backgrounds[i%backgrounds.length],
    border: borders[i%backgrounds.length]
  };
  // Return it
  return obj;
}





      export const GetColor=getColor;  