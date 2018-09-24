import * as React from "react";
import { render } from "react-dom";
import { createStore } from 'redux';
import { schedulerReducer, nameFormReducer } from './reducers/index';
import { SchedulerState, NameFormState } from './types/index';
import { Provider } from 'react-redux';
import { SchedulerAction, NameFormAction } from './actions/index';
import Scheduler from './containers/Scheduler';
import NameForm from './containers/NameForm';
import { Workstation, User } from "./components/Workstation";

let initialSchedulerState = {
  workstations: [new Workstation(0, "722"), new Workstation(1, "723"), new Workstation(2, "724")], 
  day: -1, 
  currentUser: new User(""), 
  users: []
};
const schedulerStore = createStore<SchedulerState, SchedulerAction, any, any>(schedulerReducer, initialSchedulerState);
let initialNameFormState = { value: "", parent: schedulerStore }; 
const nameFormStore = createStore<NameFormState, NameFormAction, any, any>(nameFormReducer, initialNameFormState);

render(
  <div>
  <Provider store={nameFormStore}>
    <NameForm />
  </Provider>
  <Provider store={schedulerStore}>
    <Scheduler />
  </Provider>
  </div>,
  document.getElementById('root') as HTMLElement
);