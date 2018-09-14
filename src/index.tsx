import * as React from "react";
import { render } from "react-dom";
//import Hello from "./components/Hello";
// import { createStore } from 'redux';
// import { enthusiasm } from './reducers/index';
// import { StoreState } from './types/index';
// import Hello from './containers/Hello';
// import { Provider } from 'react-redux';
// import { EnthusiasmAction } from './actions/index';

import { Scheduler } from './components/Scheduler'

// const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm, {
//   enthusiasmLevel: 1,
//   languageName: 'TypeScript'
//   }
// );

// render(
//   <Provider store={store}>
//     <Hello />
//   </Provider>,
//   document.getElementById('root') as HTMLElement
// );

render(
  <Scheduler name="Workstation Schedule"/>, 
  document.getElementById('root') as HTMLElement
)