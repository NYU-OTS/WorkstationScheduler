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
}

// interface WorkstationJson{
//   position: string
//   days: [string, string][][]
// }

export class Scheduler extends React.Component<Props, State>{

  constructor(props: Props){
    super(props);
    this.state = { name: props.name, workstations: [new Workstation("722"), 
    new Workstation("723"), new Workstation("724")]};
  }

  public render(){
    let days: number[][] = [[], [], [], [], []];
    let counter: number = 0;

    this.state.workstations.forEach(function(workstation){
      let innerCounter: number = 0;
      workstation.days.forEach(function(day){
        day.forEach(function(slot){
          let startHour: number = parseInt(slot[0].slice(0, 2));
          let startMin: number = parseInt(slot[0].slice(2, 4));
          let endHour: number = parseInt(slot[1].slice(0, 2));
          let endMin: number = parseInt(slot[1].slice(2, 4));
          let timeIntervalMin: number = (endHour - startHour) * 60 + endHour - startMin;
        })
        innerCounter++;
      })
      counter++;
    })

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
            <td>
            Available workstations: 
            {

              <button>Schedule</button>
            }
            </td>
            <td>Available workstations: </td>
            <td>Available workstations: </td>
            <td>Available workstations: </td>
            <td>Available workstations: </td>
          </tr>
        </table>
      </div>
      
      // <ul>{ 
      //   this.state.workstations.map(function(workstation){
      //     return <li>{workstation.location} - {workstation.days}</li>;
      //   })
      // }</ul>     
    );
  }
}