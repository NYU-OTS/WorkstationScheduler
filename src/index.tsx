import * as React from "react";
import { render } from "react-dom";
import { createStore, combineReducers } from 'redux';
import { schedulerReducer, nameFormReducer } from './reducers/index';
import { NameFormState } from './types/index';
import { Provider } from 'react-redux';
import { NameFormAction } from './actions/index';
import Scheduler from './containers/Scheduler';
import NameForm from './containers/NameForm';
import { Workstation, User } from "./components/Workstation";
import { reducer as formReducer } from 'redux-form'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

let initialSchedulerState = {
  workstations: [new Workstation(0, "722"), new Workstation(1, "723"), new Workstation(2, "724")], 
  day: -1, 
  currentUser: new User(""), 
  users: []
};

const rootReducer = combineReducers({
  schedulerReducer, 
  form: formReducer
})

const schedulerStore = createStore(rootReducer, {schedulerReducer: initialSchedulerState});
let initialNameFormState = { value: "", parent: schedulerStore }; 
const nameFormStore = createStore<NameFormState, NameFormAction, any, any>(nameFormReducer, initialNameFormState);

const SchedulerApp = () => (
  <div>
    <Nav/>
    <Provider store={nameFormStore}>
      <NameForm />
    </Provider>
    <Provider store={schedulerStore}>
      <Scheduler />
    </Provider>
  </div>
);

const Nav = () => (
  <div>
    <NavLink exact activeClassName='is-active' to='/scheduler'>Scheduler</NavLink>
    <br />
    <NavLink exact activeClassName='is-active' to='/about'>About</NavLink>
  </div>
);

const About = () => (
  <div>
    <Nav/>
    Author: Yiyang Zeng
    Advisor: Andy Entrekin
  </div>
);

const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Nav} />
        <Route path="/scheduler" component={SchedulerApp} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  </div>
);

render(
  <App/>, 
  document.getElementById('root') as HTMLElement
);