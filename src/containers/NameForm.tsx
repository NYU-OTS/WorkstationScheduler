import { NameForm } from '../components/Scheduler';
import * as actions from '../actions/';
import { NameFormState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapStateToProps({ value, parent }: NameFormState) {
  return {
    value, 
    parent
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.NameFormAction>) {
  return {
    onUpdateField: (value: string) => dispatch(actions.updateFieldValue(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
