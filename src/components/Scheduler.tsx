import * as React from "react";
import { Workstation } from "./Workstation";
import { SchedulerState, NameFormState } from "./../types";
import './table.css'

// import { createStore } from 'redux';
// import { nameFormReducer } from './../reducers/index';
// import { Provider } from 'react-redux';
// import { NameFormAction } from '../actions/index';
// import NameFormContainer from '../containers/NameForm';

export interface SchedulerProps {
  onChangeDay: (day: number) => void;
  onUpdateWorkstations: (workstations: Workstation[]) => void;
  onChangeName: (name: string) => void;
} 

export class Scheduler extends React.Component<SchedulerProps, SchedulerState>{
  static readonly daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  constructor(props: SchedulerProps){
    super(props);
    let slotTime = [];
    for(let i = 0; i < 20; ++i){
      let time: string = "";
      time = String(8 + (i % 2 == 0 ? i/2 : i/2 - 1/2)) + ":" + (i % 2 != 0 ? 30 : "00") + " - ";
      time += String(8 + ((i+1) % 2 == 0 ? (i + 1)/2 : (i + 1)/2 - 1/2)) + ":" + (i % 2 == 0 ? 30 : "00");
      slotTime.push(time);
    }
    this.state = { workstations: [new Workstation(0, "722"), 
    new Workstation(1, "723"), new Workstation(2, "724")], day: -1, userName: "", slotTime: slotTime};
  }

  public render(){

    let days: number[][] = [[], [], [], [], []];

    this.state.workstations.forEach(function(workstation){
      workstation.recalculateAvailability();
      for(let i: number = 0; i < days.length; ++i){
        if(workstation.availability[i]){
          days[i].push(workstation.id);
        }
      } 
    })

    // const store = createStore<NameFormState, NameFormAction, any, any>(nameFormReducer, {
    //   value: "Yiyang", 
    //   parent: this
    //   }
    // );
    
    let counter: number = 0;

    return(
      <div>
        {this.greeting(this.state.userName)}
        {/* <Provider store={store}>
          <NameFormContainer />
        </Provider> */}
        <h1> Workstation Scheduler </h1>
        <table>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th> 
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
          <tr>
          {
            days.map((day) => {
              return (
                <td>
                Available workstations: <br />
                {day.toString()}
                <br />
                {
                  <button onClick={this.handleScheduleClick.bind(this, counter++)}>Schedule</button>
                }
              </td>
              );
            })
          }
          </tr>
        </table>
        {this.scheduleOfDay(this.state.day)}
      </div>   
    );
  }

  greeting(userName: string){
    if(userName != ""){
      return( <h1>Hello, {this.state.userName} </h1>);
    }
    return
  }

  scheduleOfDay(day: number){
    if(day >= 0){
      //Read Schedules of workstations on the specified day
      let schedule: [string, [string, number][], number][] = []
      for(let i = 0; i < 20; ++i){
        schedule.push([this.state.slotTime[i], [], i]);
      }
      for(let i = 0; i < this.state.workstations.length; ++i){
        let slots = this.state.workstations[i].listSlots(day);
        for(let j = 0; j < 20; ++j){
          schedule[j][1].push([slots[j], i]);
        }
      }
      this.state.workstations.forEach((workstation) => {
        
      })

      return(
        <div>
          <h1> {Scheduler.daysName[day]} </h1>
          <table>
            <tr>
              <th> Time </th>
              {
                //For header row
                this.state.workstations.map(function(workstation){
                  return (
                    <th> Workstation {workstation.id} in room {workstation.location}</th>
                  );
                })
              }    
            </tr>
            {
              schedule.map((time) => {
                return(
                  <tr>
                    <th> {time[0]} </th>
                    {
                      time[1].map((slot) => {
                        return(
                          <th>
                            {slot[0]} <br />
                            {
                              this.getSlotButton(this.state.userName, slot[0], day, time[2], slot[1])
                            }
                          </th>
                        );
                      })
                    }                  
                  </tr>
                );
              })      
            }
          </table>   
        </div>       
      );
    }
    return;
  }

  handleScheduleClick(day: number){
    //this.setState({day: day});
    this.props.onChangeDay(day);
    console.log(this.state);
  }

  handleRegisterClick(userName: string, day: number, slot: number, workstation: number){
    let newWorkstations = this.state.workstations;
    newWorkstations[workstation].slots[day][slot] = userName;
    //this.setState({workstations: newWorkstations});
    this.props.onUpdateWorkstations(newWorkstations);
  }

  handleRemoveClick(day: number, slot: number, workstation: number){
    let newWorkstations = this.state.workstations;
    newWorkstations[workstation].slots[day][slot] = "empty";
    //this.setState({workstations: newWorkstations});
    this.props.onUpdateWorkstations(newWorkstations);
  }

  handleNameChange(userName: string){
    //this.setState({userName: userName});
    this.props.onChangeName(userName);
  }

  getSlotButton(userName: string, registeredName: string, day: number, timeSlot: number, workstation: number){
    if(userName == ""){
      return
    }
    if(userName == registeredName){
      return(<button onClick={this.handleRemoveClick.bind(this, day, timeSlot, workstation)}>Remove</button>);
    }
    if(registeredName == "empty"){
      return(<button onClick={this.handleRegisterClick.bind(this, userName, day, timeSlot, workstation)}>Register</button>)
    }
    
    return
  }
}

interface NameFormProps {
  value: string;
  parent: Scheduler;
  onUpdateField: (value: string) => void;
} 

export class NameForm extends React.Component<NameFormProps, NameFormState> {
  constructor(props: NameFormProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleChange(event: any) {
    this.props.onUpdateField(event.target.value);
  }

  handleSubmit(event: any) {
    this.state.parent.handleNameChange(this.state.value);
    event.preventDefault();
  }

  handleLogOut() {
    this.props.parent.handleNameChange("");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Log in: 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <button onClick={this.handleLogOut}>Log out</button>
      </form>
    );
  }
}