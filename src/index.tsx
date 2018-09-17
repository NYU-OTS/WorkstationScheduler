import * as React from "react";
import { render } from "react-dom";
import { createStore } from 'redux';
import { schedulerReducer } from './reducers/index';
import { SchedulerState } from './types/index';
import { Provider } from 'react-redux';
import { SchedulerAction } from './actions/index';
import Scheduler from './containers/Scheduler';

const store = createStore<SchedulerState, SchedulerAction, any, any>(schedulerReducer, {});

render(
  <Provider store={store}>
    <Scheduler />
  </Provider>,
  document.getElementById('root') as HTMLElement
);