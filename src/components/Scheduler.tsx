import * as React from "react";
import { Workstation } from "./Workstation";

export interface Props {
  name: string;
  // onAdd?: () => void;
  // onDelete?: () => void;
  // onEdit?: () => void;
} 

interface State {
  name: string
  workstations: Workstation[];
  day: number
}

// interface WorkstationJson{
//   position: string
//   days: [string, string][][]
// }

export class Scheduler extends React.Component<Props, State>{
  static readonly daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  constructor(props: Props){
    super(props);
    this.state = { name: props.name, workstations: [new Workstation(0, "722"), 
    new Workstation(1, "723"), new Workstation(2, "724")], day: -1};
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

    // this.state.workstations.forEach(function(workstation){
    //   workstation.slots.forEach(function(day){

    //     day.forEach(function(slot){
    //       let startHour: number = parseInt(slot[0].slice(0, 2));
    //       let startMin: number = parseInt(slot[0].slice(2, 4));
    //       let endHour: number = parseInt(slot[1].slice(0, 2));
    //       let endMin: number = parseInt(slot[1].slice(2, 4));
    //       let timeIntervalMin: number = (endHour - startHour) * 60 + endHour - startMin;
    //     })
    //   })
    // })

    return(
      <div>
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
            days.map(function(day){
              return (
                <td>
                Available workstations: <br />
                
                {day.toString()}
                <br />
                {
                  <button>Schedule</button>
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

  scheduleOfDay(day: number){
    if(day >= 0){
      return(
        <div>
          <h1> {Scheduler.daysName[day]} </h1>
          <table>
            <tr>
              {
                //For header row
                this.state.workstations.map(function(workstation){
                  return (
                    <th> Workstation {workstation.id} in room {workstation.location}</th>
                  );
                })
              }    
            </tr>
          </table>   
        </div>       
      );
    }
    return;
  }
}