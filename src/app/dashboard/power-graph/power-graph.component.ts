import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-power-graph',
  templateUrl: './power-graph.component.html',
  styleUrls: ['./power-graph.component.sass']
})
export class PowerGraphComponent implements OnInit {
  
  constructor() { }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ngOnInit(): void {
  }

}
