import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Group } from './group';
import { Unit } from './unit';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  createDb() {
    
    const users: User[] = [
      {id:1,unitCount: 1, name: 'qwe'     ,email:'mmhajjar82@gmail.com' ,loginId:'mrhb',    lang:'En',conn:1,reportsM:true,reportsW:true,api:true,isadmin:true },
      {id:2,unitCount: 2, name: 'Helium'  ,email:'sdf_435@hotmail.com'  ,loginId:'masdfrhb',lang:'En',conn:1,reportsM:false,reportsW:false,api:true,isadmin:false},
      {id:3,unitCount: 3, name: 'Lithium' ,email:'dfsced_def@yahoo.com' ,loginId:'mdfrhb',  lang:'En',conn:1,reportsM:true,reportsW:true,api:true,isadmin:false},      
    ];
    const units: Unit[] = [
      {id:1,name: 'unit1',groups:'g1',customer:'tetaPower',gate:'654.168.167.56',disable:true,comm:false},
      {id:2,name: 'unit2',groups:'gasdf',customer:'tetaPower',gate:'234.333.61.55',disable:true,comm:false},
      {id:3,name: 'unit3',groups:'gqwe',customer:'tetaPower',gate:'343.168.56.35',disable:true,comm:false},
      {id:4,name: 'unit4',groups:'dfe1',customer:'tetaPower',gate:'324.168.1.37',disable:true,comm:false},
    ];
      


    const groups: Group[] = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {users,groups};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(users: User[]): number {
  //   return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  // }

  genId<T extends User |Group>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}