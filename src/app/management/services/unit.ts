export interface Unit {
    id: number;
    userId:string;
    name: string;
    address:String,
    ip:String,
    port:Number,
    lat:Number,
    long:Number,
    state:Boolean,
    deviceType:{
      type: String,
      enum: ['mint','amf25','teta','aras']
      },
    groups: string;
    customer: string;
    gate:string;
    disable: boolean;
    comm:boolean;
  }
  
  