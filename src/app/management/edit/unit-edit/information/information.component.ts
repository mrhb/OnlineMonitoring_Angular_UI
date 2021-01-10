import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as L from "leaflet";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first, map, startWith } from 'rxjs/operators';
import { UnitsService } from '@app/management/services/units.service';
import { DialogBodyComponent } from '@app/management/dialog-body/dialog-body.component';
import { Observable } from 'rxjs';

import { UsersService } from '../../../services/users.service';
import { User } from '../../../services/user';

export enum DeviceType {
  mint= "mint", 
  amf25= "amf25", 
  teta= "teta"
}
const DEVICES=[
  {type:DeviceType.mint, name: "Mint"},
  {type:DeviceType.amf25, name: "AMF25"},
  {type:DeviceType.teta, name: "Teta ECU"},
];


@Component({
  selector: 'unit-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit,AfterViewInit {
  map:any;

  hide = true;
  unitInfoForm :FormGroup ; 
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  devices=DEVICES;

  markersGroup;

  options: User[] ;
  filteredOptions: Observable<User[]>;

  @ViewChild('map') mapComntainer;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UnitsService: UnitsService,
    public  dialog: MatDialog,
    private formBuilder: FormBuilder,
    private UsersService: UsersService,
  ) { 
  
  }
  ngAfterViewInit(): void {
    this.mapInit();
    }
  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.email.indexOf(filterValue) === 0);
  }
  ngOnInit(): void {

    
    this.UsersService.getAll()
    .subscribe(
      data => {
        this.options = data;
        this.filteredOptions=data;
        // this.filteredOptions = this.userId.valueChanges.pipe(
        //   startWith(''),
        //   map(value => this._filter(value))
        // );
        console.log(data);
      },
      error => {
        console.log(error);
      });


    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.unitInfoForm = this.formBuilder.group({
       // title: ['', Validators.required],
       name: ['', Validators.required],
       address: ['', Validators.required],
       userId: [],
       state: [false],
        ip: ['', [Validators.required, Validators.pattern("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")]],
        port:['',Validators.compose([Validators.required, Validators.min(4511), Validators.max(4530)])],
        deviceType:[],
        lat: [
          null,
          [
            Validators.maxLength(32),
            Validators.min(-90),
            Validators.max(90),
            Validators.pattern(/\-?\d*\.?\d{1,2}/)
          ]
        ],
        long: [
          null,
          [
            Validators.maxLength(32),
            Validators.min(-90),
            Validators.max(90),
            Validators.pattern(/\-?\d*\.?\d{1,2}/)
          ]
        ],
    }, {
      //  validator: MustMatch('password', 'confirmPassword')
    });

    if (!this.isAddMode) {
        this.UnitsService.get(this.id)
            .pipe(first())
            .subscribe(x =>
              {
                console.log(x);
                 this.unitInfoForm.patchValue(x);
                 this.LocationChange();
              }
              );
    }
  }
  displayFn(user: User): string {
    return user && user.email ? 
    (user.fistName?user.fistName:"")+" "+(user.lastName?user.lastName:"") : '';
  }
  mapInit()
  {
    var basemaplayer=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     { attribution: '...' }
    );
    this.markersGroup = L.layerGroup([]);

     this.map = L.map(this.mapComntainer.nativeElement,{
      layers: [basemaplayer,  this.markersGroup ]
    });
  }
  LocationChange(): void {  
    console.log(this.unitInfoForm.value.lat);
    console.log(this.unitInfoForm.value.long);

    var unitmarker= L.marker([this.unitInfoForm.value.lat,this.unitInfoForm.value.long]);
    
    this.markersGroup.clearLayers()
    unitmarker.addTo(this.markersGroup);

    // this.map.setView(unitmarker,10);

    var group = new L.featureGroup([unitmarker]);
    this.map.fitBounds(group.getBounds(),
    {padding: [50,50]});
    this.map.setZoom(9)
  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      map.invalidateSize();
    },1);
 }
  resetForm() { 
    this.router.navigate(['/management/units']);
 } 
  get f() { return this.unitInfoForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      //this.alertService.clear();

      // stop here if form is invalid
      if (this.unitInfoForm.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.create();
      } else {
          this.update();
      }
  }

  private create() {
      this.UnitsService.create(this.unitInfoForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                //  this.alertService.success('User added', { keepAfterRouteChange: true });
                  this.router.navigate(['/management/units'], { relativeTo: this.route });
              },
              error: error => {
              //    this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

  private update() {
      this.UnitsService.update(this.id, this.unitInfoForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
             //     this.alertService.success('User updated', { keepAfterRouteChange: true });
                  // this.router.navigate(['/management/users'], { relativeTo: this.route });
                  this.router.navigate(['/management/units']);
              },
              error: error => {
              //    this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
  delete(){
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {name: this.unitInfoForm.value.name, type: "unit"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.UnitsService.delete(this.id).subscribe();
                    //     this.alertService.success('User updated', { keepAfterRouteChange: true });
                  // this.router.navigate(['/management/users'], { relativeTo: this.route });
                  this.router.navigate(['/management/units']);
      } 

    });   
  }
}
