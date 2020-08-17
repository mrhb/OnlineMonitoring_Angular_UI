import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AlarmsDataSource, AlarmsItem } from './alarms-datasource';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AlarmsComponent implements  OnInit {
 
  dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AlarmsItem>;
 

  columnsToDisplay = ['unitname','alarms'];
  expandedElement: PeriodicElement | null;

 

  ngOnInit() {
    this.dataSource = ELEMENT_DATA;
  }

 
}

export interface PeriodicElement {
  unitname: string;
  alarms:{name:string , Icon:string}[];
}


const ELEMENT_DATA: PeriodicElement[] = [
  {
    unitname: 'unit 1',
    alarms:[
      {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'alarm'}
    ]
  },
  {
    unitname: 'unit 2',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    unitname: 'unit 3',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Dongle Incomp', Icon:'warning'}
        ]
  },
  {
    unitname: 'unit 4',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    unitname: 'unit 5',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    unitname: 'unit 6',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    unitname: 'unit 7',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
     {
    unitname: 'unit 8',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  // {
  //   position: 4,
  //   name: 'Beryllium',
  //   weight: 9.0122,
  //   symbol: 'Be',
  //   description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
  //       relatively rare element in the universe, usually occurring as a product of the spallation of
  //       larger atomic nuclei that have collided with cosmic rays.`
  // }, {
  //   position: 5,
  //   name: 'Boron',
  //   weight: 10.811,
  //   symbol: 'B',
  //   description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
  //       by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
  //       low-abundance element in the Solar system and in the Earth's crust.`
  // }, {
  //   position: 6,
  //   name: 'Carbon',
  //   weight: 12.0107,
  //   symbol: 'C',
  //   description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
  //       and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
  //       to group 14 of the periodic table.`
  // }, {
  //   position: 7,
  //   name: 'Nitrogen',
  //   weight: 14.0067,
  //   symbol: 'N',
  //   description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
  //       discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  // }, {
  //   position: 8,
  //   name: 'Oxygen',
  //   weight: 15.9994,
  //   symbol: 'O',
  //   description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
  //        the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
  //        agent that readily forms oxides with most elements as well as with other compounds.`
  // }, {
  //   position: 9,
  //   name: 'Fluorine',
  //   weight: 18.9984,
  //   symbol: 'F',
  //   description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
  //       lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
  //       conditions.`
  // }, {
  //   position: 10,
  //   name: 'Neon',
  //   weight: 20.1797,
  //   symbol: 'Ne',
  //   description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
  //       Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
  //       two-thirds the density of air.`
  // },
];
