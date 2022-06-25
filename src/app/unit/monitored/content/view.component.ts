import { EventEmitter } from "@angular/core";
import { unitsStateInfo } from "../../service/UnitsData";

export interface ViewComponent {
    unitSelectionEvent: EventEmitter<String>;
}
  