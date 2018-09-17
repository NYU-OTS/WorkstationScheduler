export class Workstation {
  id: number
  location: string
  slots: string[][]
  availability: boolean[]

  constructor(id: number, location: string){
    this.id = id;
    this.location = location;
    this.slots = [[], [], [], [], []];
    this.slots.forEach(function(day){
      //Fill the schedule with empty slots
      for(let i: number = 0; i < 20; ++i){
        day.push("empty");
      }      
    })
    this.availability = [true, true, true, true, true]
  }

  public recalculateAvailability(){
    for(let i: number = 0; i < this.slots.length; ++i){
      let availableToday: boolean = false;
      for(let j: number = 0; j < this.slots[i].length; ++j){
        if(this.slots[i][j] == "empty"){
          availableToday = true;
          break;
        }
      } 
      this.availability[i] = availableToday;
    }      
  }

  public listSlots(day: number){
    // let slots: string[] = []

    // for(let i: number = 0; i < this.slots[day].length; ++i){
    //   slots.push(this.slots[day][i]);
    // } 

    return this.slots[day];
  }
}