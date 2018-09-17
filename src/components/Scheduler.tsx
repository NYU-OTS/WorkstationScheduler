import * as React from "react";
import { Workstation } from "./Workstation";
import { SchedulerState, NameFormState } from "./../types";
import { changeName } from '../actions/index'
import './table.css'

export interface SchedulerProps {
  workstations: Workstation[];
  day: number;
  userName: string;
  onChangeDay: (day: number) => void;
  onUpdateWorkstations: (workstations: Workstation[]) => void;
  onChangeName: (name: string) => void;
} 

export class Scheduler extends React.Component<SchedulerProps, SchedulerState>{
  static readonly daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  static readonly slotTime = [
    "8:00 - 8:30", 
    "8:30 - 9:00",
    "9:00 - 9:30",
    "9:30 - 10:00",
    "10:00 - 10:30", 
    "10:30 - 11:00", 
    "11:00 - 11:30", 
    "11:30 - 12:00", 
    "12:00 - 12:30", 
    "12:30 - 13:00", 
    "13:00 - 13:30", 
    "13:30 - 14:00", 
    "14:00 - 14:30", 
    "14:30 - 15:00", 
    "15:00 - 15:30", 
    "15:30 - 16:00", 
    "16:00 - 16:30", 
    "16:30 - 17:00", 
    "17:00 - 17:30", 
    "17:30 - 18:00", 
  ];

  constructor(props: SchedulerProps){
    super(props);
  }

  public render(){

    let days: number[][] = [[], [], [], [], []];

    this.props.workstations.forEach(function(workstation){
      workstation.recalculateAvailability();
      for(let i: number = 0; i < days.length; ++i){
        if(workstation.availability[i]){
          days[i].push(workstation.id);
        }
      } 
    })
   
    let counter: number = 0;

    return(
      <div>
        {this.greeting(this.props.userName)}
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
        {this.scheduleOfDay(this.props.day)}
      </div>   
    );
  }

  greeting(userName: string){
    if(userName != ""){
      return( <h1>Hello, {this.props.userName} </h1>);
    }
    return
  }

  scheduleOfDay(day: number){
    if(day >= 0){
      //Read Schedules of workstations on the specified day
      let schedule: [string, [string, number][], number][] = []
      for(let i = 0; i < 20; ++i){
        schedule.push([Scheduler.slotTime[i], [], i]);
      }
      for(let i = 0; i < this.props.workstations.length; ++i){
        let slots = this.props.workstations[i].listSlots(day);
        for(let j = 0; j < 20; ++j){
          schedule[j][1].push([slots[j], i]);
        }
      }
      this.props.workstations.forEach((workstation) => {
        
      })

      return(
        <div>
          <h1> {Scheduler.daysName[day]} </h1>
          <table>
            <tr>
              <th> Time </th>
              {
                //For header row
                this.props.workstations.map(function(workstation){
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
                              this.getSlotButton(this.props.userName, slot[0], day, time[2], slot[1])
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
  }

  handleRegisterClick(userName: string, day: number, slot: number, workstation: number){
    let newWorkstations = [...this.props.workstations];
    newWorkstations[workstation].slots[day][slot] = userName;
    console.log(this.props.workstations[workstation].slots[day][slot], newWorkstations[workstation].slots[day][slot])
    //this.setState({workstations: newWorkstations});
    this.props.onUpdateWorkstations(newWorkstations);
  }

  handleRemoveClick(day: number, slot: number, workstation: number){
    let newWorkstations = [...this.props.workstations];
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
  parent: any;
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
    //this.props.parent.handleNameChange(this.props.value);
    this.props.parent.dispatch(changeName(this.props.value));
    event.preventDefault();
  }

  handleLogOut(event: any) {
    //this.props.parent.handleNameChange("");
    this.props.parent.dispatch(changeName(""));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Log in: 
            <input type="text" value={this.props.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          <button onClick={this.handleLogOut}>Log out</button>
        </form>
      </div>
    );
  }
}