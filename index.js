class Cat {
    constructor(tiredness, hunger, loneliness, happiness) {
      this._tiredness = tiredness;
      this._hunger = hunger;
      this._loneliness = loneliness;
      this._happiness = happiness;
      this._catTagsList = [
        "normal",
        "killercat",
        "wantsToBeAlone",
        "wantsAttention"
      ];
      this._catBehaviour = this._catTagsList[
        Math.floor(Math.random * this._catTagsList.length)
      ];
      this._foodAvaible = false;
    }
  
    // called
    timePasses() {
      this._hunger += 1;
      this._tiredness += 1;
      if (this._catBehaviour === "wantsToBeAlone") this._happiness += 1;
      else if (this._catBehaviour === "wantsAttention") this._happiness -= 4;
      else this._happiness -= 2;
      this.clearHappiness();
    }
  
    clearHappiness() {
      if (this._happiness > 15) this._happiness = 15;
      else if (this._happiness < 0) this._happiness = 0;
    }
  
    clearTiredness() {
      if (this._tiredness > 10) this._tiredness = 10;
      else if (this._happiness < 0) this._happiness = 0;
    }
  
    // player actions
    giveFood() {
      this._foodAvaible = true;
    }
  
    pet() {
      this.timePasses();
      if (this._catBehaviour === "wantsToBeAlone") {
        this._happiness -= 2;
        window.alert("Cat is hissing");
      } else if (this._catBehaviour === "wantsAttention") {
        this._happiness += 4;
        window.alert("Cat is purring like crazy");
      } else {
        this._happiness += 2;
        window.alert("Cat is purring");
      }
      this.clearHappiness();
    }
  
    leaveAlone() {
      this.timePasses();
      this.catTakesAction();
    }
  
    // cat actions ()
  
    catTakesAction() {
      if (this._foodAvaible) this.eat();
      else if (this._tiredness >= 8) this.sleep();
      else if (this._catBehaviour === "killercat") this.killMouse("for fun");
      else {
        let randomAction = Math.floor(Math.random * 5);
        if (randomAction >= 4) this.doCatStuff();
        else this.killMouse("because of reasons");
      }
    }
    eat() {
      this.hunger -= 6;
      this.happiness += 1;
      this.clearHappiness();
    }
  
    killMouse(reason) {
      if (reason === "for fun") this._happiness += 5;
      else this._happiness += 3;
      if (this._hunger >= 6) this._eat();
      this.clearHappiness();
    }
  
    sleep() {
      this._tiredness -= 5;
      this.clearTiredness();
    }
  
    doCatStuff() {}
  
    // cat random actions
  
    meow() {
      window.alert("Cat says meoooow");
    }
  
    changeBehaviour() {
      this._catBehaviour = [];
    }
  }
  