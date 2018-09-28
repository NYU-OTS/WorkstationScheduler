import * as React from "react";
import { Workstation, TimeSlot, User } from "./Workstation";
import { SchedulerState, NameFormState } from "./../types";
import { changeUser } from '../actions/index';
import { reduxForm, Field } from 'redux-form';
import './table.css';

export interface SchedulerProps {
  workstations: Workstation[];
  day: number;
  currentUser: User;
  users: User[];
  onChangeDay: (day: number) => void;
  onUpdateWorkstations: (workstations: Workstation[]) => void;
  onChangeUser: (userName: string) => void;
} 

export class Scheduler extends React.Component<SchedulerProps, SchedulerState>{
  static readonly daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  static readonly slotTime = [
    new TimeSlot([8, 0], [8, 30]), 
    new TimeSlot([8, 30], [9, 0]),
    new TimeSlot([9, 0], [9, 30]), 
    new TimeSlot([9, 30], [10, 0]),
    new TimeSlot([10, 0], [10, 30]), 
    new TimeSlot([10, 30], [11, 0]), 
    new TimeSlot([11, 0], [11, 30]), 
    new TimeSlot([11, 30], [12, 0]),
    new TimeSlot([12, 0], [12, 30]), 
    new TimeSlot([12, 30], [13, 0]),
    new TimeSlot([13, 0], [13, 30]), 
    new TimeSlot([13, 30], [14, 0]),
    new TimeSlot([14, 0], [14, 30]), 
    new TimeSlot([14, 30], [15, 0]),
    new TimeSlot([15, 0], [15, 30]), 
    new TimeSlot([15, 30], [16, 0]),
    new TimeSlot([16, 0], [16, 30]), 
    new TimeSlot([16, 30], [17, 0]),
    new TimeSlot([17, 0], [17, 30]), 
    new TimeSlot([17, 30], [18, 0])
  ];
  RegisterForm = 
    reduxForm({
      form: "register"
    })(props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="startTime">Workstation id:<br/></label>
            <Field name="workstation" component="input" type="number" min="0" max="2"/>
          </div>
          <div>
            <label htmlFor="startTime">Start Time:<br/></label>
            Hour<Field name="startTimeHour" component="input" type="number" min="8" max="17"/>
            Minute<Field name="startTimeMin" component="input" type="number" min="0" max="59"/>
          </div>
          <div>
            <label htmlFor="endTime">End Time:<br/></label>
            Hour<Field name="endTimeHour" component="input" type="number" min="9" max="18"/>
            Minute<Field name="endTimeMin" component="input" type="number" min="0" max="59"/>
          </div>
          <button type="submit">Register</button>
        </form>
      )
    });

  constructor(props: SchedulerProps){
    super(props);
  }

  public render(){

    let days: number[][] = [[], [], [], [], []];

    this.props.workstations.forEach(function(workstation){
      for(let i: number = 0; i < days.length; ++i){
        if(workstation.availability[i]){
          days[i].push(workstation.id);
        }
      } 
    })
   
    let counter: number = 0;

    return(
      <div>
        {this.greeting(this.props.currentUser)}
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
        {
          this.scheduleOfDay(this.props.day)
        }
      </div>   
    );
  }

  greeting(user: User){
    if(user.name != ""){
      return( <h1>Hello, {user.name} </h1>);
    }
    return
  }

  scheduleOfDay(day: number){
    if(day >= 0){
      //Read Schedules of workstations on the specified day

      //[slot time, [slots in the slot time, workstation id]]
      let schedule: [TimeSlot, [TimeSlot[], number][]][] = []

      //Initialize the data structure
      for(let i = 0; i < 20; ++i){
        schedule.push([Scheduler.slotTime[i], []]);
        for(let j = 0; j < this.props.workstations.length; ++j){
          schedule[i][1].push([[], j]);
        }
      }

      //Fill the data structure
      for(let i = 0; i < this.props.workstations.length; ++i){
        //Every recorded timeslot
        let slots = this.props.workstations[i].slots[day];
        let slotsCounter = 0;
        for(let k = 0; k < schedule.length; ++k){
          for(let j = slotsCounter; j < slots.length; ++j){
            if(schedule[k][0].ifIntersect(slots[j])){
              schedule[k][1][i][0].push(slots[j]);
            }
          }
        }

        // for(let j = 0; j < slots.length; ++j){
          
        //   schedule[j][1].push([[], i]);          
        //   for(let k = 0; k < slots.length; ++k){
        //     schedule[j][1][0].push();
        //   }
        // }
      }

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
                    <th> {time[0].toStringTimeOnly()} </th>
                    {
                      time[1].map((workstation) => {
                        return(
                          <th>
                            {
                              workstation[0].map((timeSlot) => {
                                return (
                                  <div>
                                    {
                                      timeSlot.toStringFull()
                                    }
                                    <br />
                                    {
                                      this.getSlotButton(this.props.currentUser, timeSlot.user, timeSlot, day, workstation[1])
                                    }
                                  </div>
                                  );
                              })
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
          {this.getRegisterForm(this.props.currentUser)}
        </div>       
      );
    }
    return;
  }

  handleScheduleClick(day: number){
    //this.setState({day: day});
    this.props.onChangeDay(day);
  }

  // handleRegisterClick(userName: string, day: number, slot: number, workstation: number){
  //   let newWorkstations = [...this.props.workstations];
  //   newWorkstations[workstation].addSlot() = userName;
  //   //this.setState({workstations: newWorkstations});
  //   this.props.onUpdateWorkstations(newWorkstations);
  // }

  handleRemoveClick(day: number, slot: TimeSlot, workstation: number){
    let newWorkstations = [...this.props.workstations];
    newWorkstations[workstation].removeSlot(slot, day)
    //this.setState({workstations: newWorkstations});
    this.props.onUpdateWorkstations(newWorkstations);
  }

  // handleNameChange(userName: string){
  //   //this.setState({userName: userName});
  //   let user = this.props.users.find(user => {
  //     return user.name == "userName";
  //   })

  //   if(user == undefined){
  //     user = new User(userName);
  //     this.props.users.push(user);     
  //   }

  //   this.props.onChangeUser(user);
  // }

  getSlotButton(currentUser: User, registeredUser: User, timeSlot: TimeSlot, day: number, workstation: number){
    // if(userName == ""){
    //   return
    // }
    if(currentUser == registeredUser){
      return(<button onClick={this.handleRemoveClick.bind(this, day, timeSlot, workstation)}>Remove</button>);
    }
    // if(registeredName == "empty"){
    //   return(<button onClick={this.handleRegisterClick.bind(this, userName, day, timeSlot, workstation)}>Register</button>)
    // }
    return
  }

  getRegisterForm(currentUser: User){
    if(currentUser.name != ""){
      return <this.RegisterForm onSubmit={this.onSubmit.bind(this)} />;
    }
    return;
  }

  onSubmit(values: any) {
    let startTime: [number, number] = [Number(values.startTimeHour), Number(values.startTimeMin)];
    let endTime: [number, number] = [Number(values.endTimeHour), Number(values.endTimeMin)];

    if(TimeSlot.minus(endTime, startTime) < 30){
      window.alert("You must register a time slot longer than 30 minutes");
      return;
    }

    if(TimeSlot.minus(endTime, Workstation.rightBound.startTime) > 0){
      window.alert("You cannot register a time slot after 18:00");
      return;
    }

    let newWorkstations = [...this.props.workstations];
    let error = newWorkstations[values.workstation].addSlot(this.props.currentUser, startTime, endTime, this.props.day);
    if(error[0] == 0){
      this.props.onUpdateWorkstations(newWorkstations);
      window.alert("Time slot registered!");
      return;
    }
    if(error[0] == 1){
      window.alert("Unknown error!");
      return;
    }
    if(error[0] == 2){
      window.alert("Slot already taken by " + error[1].toStringFull());
      return;
    }
    if(error[0] == 3){
      window.alert("This slot conflicts with your another slot at " + error[1].toStringTimeOnly());
      return;
    }
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
    this.props.parent.dispatch(changeUser(this.props.value));
    event.preventDefault();
  }

  handleLogOut(event: any) {
    this.props.parent.dispatch(changeUser(""));
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