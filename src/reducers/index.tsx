import { SchedulerAction, NameFormAction } from '../actions';
import { SchedulerState, NameFormState } from '../types/index';
import { CHANGE_DAY, UPDATE_WORKSTATIONS, UPDATE_FIELD_VALUE, CHANGE_USER } from '../constants/index';
import { User, Workstation } from "../components/Workstation";

let initialSchedulerState = {
  workstations: [new Workstation(0, "722"), new Workstation(1, "723"), new Workstation(2, "724")], 
  day: -1, 
  currentUser: new User(""), 
  users: []
};

export function schedulerReducer(state: SchedulerState = initialSchedulerState, action: SchedulerAction): SchedulerState {

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