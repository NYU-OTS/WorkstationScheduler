import { Workstation, User } from "./../components/Workstation"

export interface NameFormState {
  value: string;
  parent: any;
}

export interface SchedulerState {
  workstations: Workstation[];
  day: number;
  currentUser: User;
  users: User[];
}