import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import * as L from "leaflet";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { UnitsService } from '@app/management/services/units.service';
import { DialogBodyComponent } from '@app/management/dialog-body/dialog-body.component';

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
  unitmarker;

  @ViewChild('map') mapComntainer;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UnitsService,
    public  dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }
  ngAfterViewInit(): void {
    this.mapInit();
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.unitInfoForm = this.formBuilder.group({
       // title: ['', Validators.required],
       name: ['', Validators.required],
       address: ['', Validators.required],
       state: [false],
        ip: ['', [Validators.required, Validators.pattern("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")]],
        port:['',Validators.compose([Validators.required, Validators.min(4551), Validators.max(4570)])],
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
        this.userService.get(this.id)
            .pipe(first())
            .subscribe(x =>
              {
                console.log(x);
                 this.unitInfoForm.patchValue(x);
              }
              );
    }
  }
  mapInit()
  {


    this.map = L.map(this.mapComntainer.nativeElement);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     { attribution: '...' }
    ).addTo(this.map);

    var marker1= L.marker([36.250091, 59.914066]);
    var marker2= L.marker([36.250091, 52.914069]);

    this.unitmarker= L.marker([36.250091, 52.914079]);;

    this.unitmarker.addTo(this.map);
    marker2.addTo(this.map);

    
    var group = new L.featureGroup([marker2,this.unitmarker]);
    this.map.fitBounds(group.getBounds(),
    {padding: [50, 50]});


    this.unitmarker=marker1;


    var group = new L.featureGroup([marker2,this.unitmarker]);
    this.map.fitBounds(group.getBounds(),
    {padding: [50, 50]});

   // this.onMapReady(this.map) ;
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
      this.userService.create(this.unitInfoForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                //  this.alertService.success('User added', { keepAfterRouteChange: true });
                  this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: error => {
              //    this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

  private update() {
      this.userService.update(this.id, this.unitInfoForm.value)
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
        this.userService.delete(this.id).subscribe();
                    //     this.alertService.success('User updated', { keepAfterRouteChange: true });
                  // this.router.navigate(['/management/users'], { relativeTo: this.route });
                  this.router.navigate(['/management/units']);
      } 

    });   
  }
}
