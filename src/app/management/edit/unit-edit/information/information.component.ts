import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import * as L from "leaflet";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { UnitsService } from '@app/management/services/units.service';




@Component({
  selector: 'unit-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  map:any;

  hide = true;
  unitInfoForm :FormGroup ; 
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  formGroup :FormGroup ; 


  infoformGroup :FormGroup ; 
  nameformGroup :FormGroup ; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UnitsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.unitInfoForm = this.formBuilder.group({
       // title: ['', Validators.required],
       name: ['', Validators.required],
       address: ['', Validators.required],
       state: [''],
        ip: ['', [Validators.required, Validators.pattern("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")]],
        port:['',Validators.compose([Validators.required, Validators.min(4551), Validators.max(4570)])],
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
                 this.mapInit();

              }
              );
    }
    ///////////////////////***shoulde review *** */
    this.nameformGroup=new FormGroup({
      name: new FormControl(),
      state: new FormControl("true")
   });
   this.infoformGroup=new FormGroup({
    name: new FormControl(),
    state: new FormControl("false")
 });

  }
  mapInit()
  {
    this.map = L.map("map");

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     { maxZoom: 18, attribution: '...' }
    ).addTo(this.map);

    var marker1= marker([ 36.250091, 59.914066]);
    var marker2= marker([  36.250091, 52.914069]);

    L.marker([ 36.250091, 59.914066]).addTo(this.map);
    L.marker([ 36.250091, 52.914069]).addTo(this.map);

    
    var group = new L.featureGroup([marker1, marker2]);
    this.map.fitBounds(group.getBounds());
  }

}
