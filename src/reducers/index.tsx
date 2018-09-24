import { SchedulerAction, NameFormAction } from '../actions';
import { SchedulerState, NameFormState } from '../types/index';
import { CHANGE_DAY, UPDATE_WORKSTATIONS, UPDATE_FIELD_VALUE, CHANGE_USER, ADD_USER} from '../constants/index';
import { User } from "../components/Workstation";

export function schedulerReducer(state: SchedulerState, action: SchedulerAction): SchedulerState {
  switch (action.type) {
    case CHANGE_DAY:
      return { ...state, day: action.newDay };
    case UPDATE_WORKSTATIONS:
      return { ...state, workstations: action.newWorkstations };
    case CHANGE_USER:
      if(action.newUserName == ""){
        return { ...state, currentUser: new User("") };
      }
      let user = state.users.find(user => {
        return user.name == action.newUserName;
      })

      if(user == undefined){
        user = new User(action.newUserName);
        let newUsers = [...state.users];
        newUsers.push(user);     
        return { ...state, currentUser: user, users: newUsers };
      }
      return { ...state, currentUser: user};
    case ADD_USER:
      return { ...state, users: action.newUsers };
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