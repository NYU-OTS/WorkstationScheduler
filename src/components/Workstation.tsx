export class TimeSlot {
  user: User
  startTime: [number, number]
  endTime: [number, number]

  constructor(startTime: [number, number], endTime: [number, number], user?: User){
    if(user != undefined){
      this.user = user;
    }   
    this.startTime = [startTime[0], startTime[1]];
    this.endTime = [endTime[0], endTime[1]];
  }

  //return 1 means lhs > rhs; -1 means lhs < rhs; 0 means lhs == rhs
  static compare(lhs: [number, number], rhs: [number, number]){
    if(lhs[0] == rhs[0]){
      if(lhs[1] == rhs[1]){
        return 0;
      }
      if(lhs[1] > rhs[1]){
        return 1;
      }
      else{
        return -1;
      }
    }
    else{
      if(lhs[0] > rhs[0]){
        return 1;
      }
      else{
        return -1;
      }
    }
  }

  //Return the time between the start of this timeslot and the end of the other timeslot in minutes
  minus(rhs: TimeSlot){
    let diff: number = this.startTime[1] - rhs.endTime[1] + 60 * (this.startTime[0] - rhs.endTime[0]);
    return diff;
  }

  ifIntersect(rhs: TimeSlot){
    if(
      TimeSlot.compare(this.startTime, rhs.endTime) == -1 //this.startTime < rhs.endTime
      && TimeSlot.compare(rhs.startTime, this.startTime) == -1 //rhs.startTime < this.startTime
    ){
      return true;
    }
    if(
      TimeSlot.compare(this.endTime, rhs.endTime) == -1 //this.endTime < rhs.endTime
      && TimeSlot.compare(rhs.startTime, this.endTime) == -1 //rhs.startTime < this.endTime
    ){
      return true;
    }
    return false;
  }

  toStringTimeOnly(){
    return String(this.startTime[0]) + ":" + String(this.startTime[1]) + " - " + 
    String(this.endTime[0]) + ":" + String(this.endTime[1]);
  }

  toStringFull(){
    return this.user + "(" + this.toStringTimeOnly() + ")";
  }
}

export class Workstation {
  static readonly leftBound = new TimeSlot([0, 0], [8, 0]);
  static readonly rightBound = new TimeSlot([18, 0], [0, 0]);
  id: number
  location: string
  slots: TimeSlot[][]
  availability: boolean[]

  constructor(id: number, location: string){
    this.id = id;
    this.location = location;
    this.slots = [[], [], [], [], []];

    this.availability = [true, true, true, true, true]
  }

  //Error code 0 means unknown successful
  //Error code 1 means unknown error
  //Error code 2 means the input slot is intersecting with an existing slot 
  //Error code 3 means the user has already registered a slot intersecting with the input slot
  public addSlot(user: User, startTime: [number, number], endTime: [number, number], day: number){
    let slots = this.slots[day];
    let newSlot = new TimeSlot(startTime, endTime, user);
    for(let i: number = 0; i < this.slots.length; ++i){
      //If the input slot is intersecting with an existing slot, return an error
      if(newSlot.ifIntersect(slots[i])){
        return 2;
      }

      //If the input slot is before the slot at index i, insert the input slot
      if(TimeSlot.compare(endTime, slots[i].startTime)){
        if(user.ifDuplicate(newSlot, day)){
          return 3; 
        }
        else{
          user.addTimeSlot(newSlot, day);
          slots.splice(i, 0, newSlot);
          this.recalculateAvailability(day);
          return 0;
        }               
      }
    }
    return 1;
  }

  public removeSlot(index: number, day: number){
    this.slots[day].splice(index, 1);
    this.recalculateAvailability(day);
  }

  public recalculateAvailability(day?: number){
    if(day != undefined){
      let availableToday: boolean = false;
        let lastSlot: TimeSlot = Workstation.leftBound;
        for(let j: number = 0; j <= this.slots[day].length; ++j){
          let timeSlot: TimeSlot = this.slots[day][j];
          if(j >= this.slots[day].length){
            timeSlot = Workstation.rightBound;
          }
          
          if(timeSlot.minus(lastSlot) >= 30){
            availableToday = true;
            break;
          }
        }
        this.availability[day] = availableToday;
    }
    else{
      for(let i: number = 0; i < this.slots.length; ++i){
        let availableToday: boolean = false;
        let lastSlot: TimeSlot = Workstation.leftBound;
        for(let j: number = 0; j <= this.slots[i].length; ++j){
          let timeSlot: TimeSlot = this.slots[i][j];
          if(j >= this.slots[i].length){
            timeSlot = Workstation.rightBound;
          }
          
          if(timeSlot.minus(lastSlot) >= 30){
            availableToday = true;
            break;
          }
        }
        this.availability[i] = availableToday;
      }      
    }    
  }
}

export class User{
  name: string
  slots: TimeSlot[][]

  constructor(userName: string){
    this.name = userName;
    this.slots = [[], [], [], [], []];
  }

  public addTimeSlot(slot: TimeSlot, day: number){
    this.slots[day].push(slot);
  }

  public ifDuplicate(slot: TimeSlot, day: number){
    let slots = this.slots[day];
    for(let i: number = 0; i < slots.length; ++i){
      if(slot.ifIntersect(slots[i])){
        return true;
      }
    }
    return false;
  }
}