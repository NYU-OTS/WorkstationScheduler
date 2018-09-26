import { Workstation, User } from "./../components/Workstation"
import { Store, AnyAction } from 'redux';
import { FormStateMap } from 'redux-form'

export interface NameFormState {
  value: string;
  parent: Store<{ scheduler: SchedulerState; form: FormStateMap; }, AnyAction>;
}

export interface SchedulerState {
  workstations: Workstation[];
  day: number;
  currentUser: User;
  users: User[];
}