import * as React from "react";
import { Workstation } from "./Workstation";
import './table.css'

export interface SchedulerProps {
  name: string;
  // onAdd?: () => void;
  // onDelete?: () => void;
  // onEdit?: () => void;
} 

interface SchedulerState {
  name: string
  workstations: Workstation[];
  day: number
  userName: string
  slotTime: string[]
}

// interface WorkstationJson{
//   position: string
//   days: [string, string][][]
// }

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
    this.state = { name: props.name, workstations: [new Workstation(0, "722"), 
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

    let counter: number = 0;

    return(
      <div>
        {this.greeting(this.state.userName)}
        <NameForm parent={this}/>
        <h1> {this.state.name} </h1>
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
    this.setState({day: day});
  }

  handleRegisterClick(userName: string, day: number, slot: number, workstation: number){
    let newWorkstations = this.state.workstations;
    newWorkstations[workstation].slots[day][slot] = userName;
    this.setState({workstations: newWorkstations});
  }

  handleRemoveClick(day: number, slot: number, workstation: number){
    let newWorkstations = this.state.workstations;
    newWorkstations[workstation].slots[day][slot] = "empty";
    this.setState({workstations: newWorkstations});
  }

  getSlotButton(userName: string, registeredName: string, day: number, timeSlot: number, workstation: number){
    if(userName == registeredName){
    return(<button onClick={this.handleRemoveClick.bind(this, day, timeSlot, workstation)}>Remove</button>);
    }
    else{
      if(registeredName == "empty"){
        return(<button onClick={this.handleRegisterClick.bind(this, userName, day, timeSlot, workstation)}>Register</button>)
      }
    }
    return
  }
}

interface NameFormProps {
  parent: Scheduler;
} 

interface NameFormState {
  value: string
}

class NameForm extends React.Component<NameFormProps, NameFormState> {
  constructor(props: NameFormProps) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleChange(event: any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event: any) {
    this.props.parent.setState({userName: this.state.value});
    event.preventDefault();
  }

  handleLogOut() {
    this.props.parent.setState({userName: ""});
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