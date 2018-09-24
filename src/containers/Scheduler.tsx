import { Scheduler } from '../components/Scheduler';
import * as actions from '../actions/';
import { SchedulerState } from '../types/index';
import { Workstation } from "./../components/Workstation";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({workstations, day, currentUser, users}: SchedulerState) {
  return {
    workstations,
    day,
    currentUser, 
    users
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.SchedulerAction>) {
  return {
    onChangeDay: (day: number) => dispatch(actions.changeDay(day)),
    onUpdateWorkstations: (workstations: Workstation[]) => dispatch(actions.updateWorkstations(workstations)),
    onChangeUser: (userName: string) => dispatch(actions.changeUser(userName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler as any);
