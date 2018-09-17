import { Workstation } from "./../components/Workstation"

export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
}

//-------------------------------------------------------------

export interface NameFormState {
  value: string;
  parent: any;
}

export interface SchedulerState {
  workstations: Workstation[];
  day: number;
  userName: string;
}