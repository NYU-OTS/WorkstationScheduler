import { Scheduler } from '../components/Scheduler';
import * as actions from '../actions/';
import { SchedulerState } from '../types/index';
import { Workstation } from "./../components/Workstation";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({}: SchedulerState) {
  return {}
}

export function mapDispatchToProps(dispatch: Dispatch<actions.SchedulerAction>) {
  return {
    onChangeDay: (day: number) => dispatch(actions.changeDay(day)),
    onUpdateWorkstations: (workstations: Workstation[]) => dispatch(actions.updateWorkstations(workstations)),
    onChangeName: (name: string) => dispatch(actions.changeName(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
