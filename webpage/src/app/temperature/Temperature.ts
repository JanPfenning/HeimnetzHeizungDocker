export class Temperature {
  private value: number;
  constructor(temperature: number) {
    if(temperature>25 || temperature<16){
      throw new Error("illegal temperature")
    }
    this.value = temperature
  }
}
