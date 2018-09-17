import { SchedulerAction, NameFormAction } from '../actions';
import { SchedulerState, NameFormState } from '../types/index';
import { CHANGE_DAY, UPDATE_WORKSTATIONS, UPDATE_FIELD_VALUE, CHANGE_NAME} from '../constants/index';

export function schedulerReducer(state: SchedulerState, action: SchedulerAction): SchedulerState {
  switch (action.type) {
    case CHANGE_DAY:
      return { ...state, day: action.newDay };
    case UPDATE_WORKSTATIONS:
      console.log(state);
      console.log(action);
      return { ...state, workstations: action.newWorkstations };
    case CHANGE_NAME:
      return { ...state, userName: action.newName };
  }
  return state;
}

export function nameFormReducer(state: NameFormState, action: NameFormAction): NameFormState {
  switch (action.type) {
    case UPDATE_FIELD_VALUE:
      return { ...state, value: action.newValue };
  }
  return state;
}