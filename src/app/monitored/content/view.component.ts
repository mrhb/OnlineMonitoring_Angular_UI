export interface ViewComponent {
    data:RowElement[] ;
  }
  
  export interface RowElement {
    alarm:{name:string , Icon:string};
    itemName: string;
    engines: string;
    update: number;
    subunits:RowElement[];
  }