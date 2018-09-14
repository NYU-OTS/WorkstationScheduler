export class Workstation {
  location: string
  slots: [string, string][][]
  availability: boolean[]

  constructor(location: string){
    this.location = location
    this.slots = [[], [], [], [], []]
    this.availability = [true, true, true, true, true]
  }

  public recalculateAvailability(){

  }
}