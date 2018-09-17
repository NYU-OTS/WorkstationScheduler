import { Workstation } from "./../components/Workstation"
import { Scheduler } from "./../components/Scheduler"

export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
}

//-------------------------------------------------------------

export interface NameFormState {
  value: string;
  parent: Scheduler;
}

export interface SchedulerState {
  workstations: Workstation[];
  day: number;
  userName: string;
  slotTime: string[];
}