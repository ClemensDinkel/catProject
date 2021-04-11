// Declarations
class Cat {
  constructor(name) {
    this._name = name;
    this._tiredness = randomStartValue();
    this._hunger = randomStartValue();
    this._loneliness = randomStartValue();
    this._happiness = randomStartValue();
    this._outputs = document.getElementById("cat-reactions");
    this._meowtput = document.getElementById("meow");
    this._catTagsList = [
      "normal",
      "wantsToMurder",
      "wantsToBeAlone",
      "wantsAttention"
    ];
    this._catBehaviour = this._catTagsList[
      Math.floor(Math.random() * this._catTagsList.length)
    ];
    this._foodAvailable = false;
    this._meows = false;
    this._petted = false;
    this._leftAlone = false;
    this._slept = false;
    this._killed = false;
    this._changedBehaviour = false;
    this.pet = this.pet.bind(this);
    this.leaveAlone = this.leaveAlone.bind(this);
    this.giveFood = this.giveFood.bind(this);
    this._opinion = 6;
    this._moodcolor = "FFC000";
  }

  // called functions
  timePasses() {
    console.log("time is passing");
    this._hunger += 1;
    this._tiredness += 1;
    this._loneliness += 1;
    this.clearHappiness();
    this.clearTiredness();
  }

  clearHappiness() {
    if (this._happiness > 15) this._happiness = 15;
    else if (this._happiness < 0) this._happiness = 0;
  }

  clearTiredness() {
    if (this._tiredness > 10) this._tiredness = 10;
    else if (this._tiredness < 0) this._tiredness = 0;
  }

  decreaseHappiness(value) {
    this._meows = true;
    this._happiness -= value;
  }

  increaseHappiness(value) {
    this._happiness += value;
  }

  meow() {
    this._meows ? this._meowtput.style.display = "block" : this._meowtput.style.display ="none";
  }

  checkNeeds() {
    console.log(this)
    if (!this._slept && !this._killed) {
      const cb = this._catBehaviour;

      if (this._tiredness > 8) {
        this.decreaseHappiness(1);
      }

      if (this._hunger > 8) {
        this.decreaseHappiness(1);
      } else if (this._hunger < 0) {
        this.decreaseHappiness(1);
        console.log(`${this._name} is overfed and threw up!`)
        this._hunger += 5;
      }

      if (this._loneliness > 7 && !this._petted && cb !== "wantsToBeAlone") {
        this.decreaseHappiness(1);
      } else if (this._loneliness < 3 && this._petted && cb === "wantsToBeAlone") {
        this.decreaseHappiness(1);
      }

      this.clearHappiness();
      
    }
    // opinion only changes when certain conditions are fulfilled and kitten isn't sleeping
    if(!this._slept) {
      if (this._happiness > 10) this._opinion++;
        else if (this._happiness < 5) this._opinion--;
        
        if (this._opinion >= 15) console.log(`${this._name} wants to stay with you forever! That's good, isn't it? You won.`);
        else if (this._opinion <= 0) console.log(`${this._name} out of desperation mistook you for a mouse and killed you in your sleep. That's bad. You lost.`)
      }
    
    // kitten can randomly change behaviour if change wasn't forced.
    if (!this._changedBehaviour && randomInt(3) === 0) this.changeBehaviour();

    // set the color of the Name to indicate happiness.
    let nameP = document.getElementById("k-name");
    switch (this._happiness) {
      case 0: 
      this._moodcolor = "FF0000";
      break;
      case 1: 
      this._moodcolor = "FF2000";
      break;
      case 2: 
      this._moodcolor = "FF4000";
      break;
      case 3: 
      this._moodcolor = "FF6000";
      break;
      case 4: 
      this._moodcolor = "FF8000";
      break;
      case 5: 
      this._moodcolor = "FFA000";
      break;
      case 6: 
      this._moodcolor = "FFC000";
      break;
      case 7: 
      this._moodcolor = "FFE000";
      break;
      case 8: 
      this._moodcolor = "E0FF00";
      break;
      case 9: 
      this._moodcolor = "C0FF00";
      break;
      case 10: 
      this._moodcolor = "A0FF00";
      break;
      case 11: 
      this._moodcolor = "80FF00";
      break;
      case 12: 
      this._moodcolor = "60FF00";
      break;
      case 13: 
      this._moodcolor = "40FF00";
      break;
      case 14: 
      this._moodcolor = "20FF00";
      break;
      default: this._moodcolor = "00FF00";
    }
    nameP.style.color = this._moodcolor;

    this.meow();
    this._meows = false;
    this._petted = false;
    this._slept = false;
    this._leftAlone = false;
    this._changedBehaviour = false;
    console.log(this)
  }

  // player actions
  giveFood() {
    this._foodAvailable = true;
    console.log(this)
  }

  pet() {
    console.log(`You pet ${this._name}`);
    this.timePasses();
    this._loneliness -= 4;
    if (this._catBehaviour === "wantsToBeAlone") {
      console.log(`${this._name} is hissing`);
      if(randomInt(2) > 0) this.decreaseHappiness(1)
    } else if (this._catBehaviour === "wantsAttention") {
      this.increaseHappiness(1)
      this.changeBehaviour();
      this._changedBehaviour = true;
      console.log(`${this._name} is purring like crazy`);
    } else {
      console.log(`${this._name} is purring`);
      if(randomInt(2) > 0) this.increaseHappiness(1);
    }
    this._petted = true;
    this.clearHappiness();
    this.checkNeeds();
  }

  leaveAlone() {
    console.log(`${this._name} is left alone`);
    this.timePasses();
    this._loneliness += 1;
    if (this._catBehaviour === "wantsToBeAlone") this._happiness += 1;
    else if (this._catBehaviour === "wantsAttention") this.happiness -=1;
    this._leftAlone = true;
    this.catTakesAction();
    this.checkNeeds();
  }

  // cat actions

  catTakesAction() {
    console.log(`${this._name} takes action:`);
    if (this._foodAvailable) this.eat("fodder");
    else if (this._tiredness >= 8) this.sleep();
    else if (this._catBehaviour === "wantsToMurder") this.killMouse("out of bloodlust");
    else {
      Math.floor(randomInt(5)) > 0 ? this.doCatStuff() : this.killMouse("because of reasons")
    }
  }
  eat(food) {
    console.log(`${this._name} is eating`);
    this._hunger -= 5;
    this.increaseHappiness(1);
    this.clearHappiness();
    if (food === "fodder") this._foodAvailable = false;
  }

  killMouse(reason) {
    console.log(`${this._name} is killing ${reason}`);
    if (reason === "out of bloodlust") {
      this.increaseHappiness(2);
      this.changeBehaviour();
      this._changedBehaviour = true;
    } else this.increaseHappiness(1);
    if (this._hunger >= 6) this.eat("mouse");
    this.clearHappiness();
  }

  sleep() {
    console.log(`${this._name} is sleeping`);
    this._tiredness -= 5;
    this._hunger += 3;
    this.clearTiredness();
    this._slept = true;
  }

  doCatStuff() {
    console.log(`${this._name} is just doing some cat stuff`);
    if (randomInt(2) > 0) this.increaseHappiness(1);
    this.clearHappiness();
  }

  // cat random actions

  changeBehaviour() {
    this._catBehaviour = this._catTagsList[
      Math.floor(Math.random() * this._catTagsList.length)
    ];
  }
}

// maths
const randomInt = max => Math.floor(Math.random()*max);  
const randomStartValue = () => Math.floor(Math.random() * (6 - 2) + 2);

// starting input
const nameInput = document.getElementById("name-input");
const nameKittenButton = document.getElementById("name-btn");

// namingFunction
function nameKitten () {
  // input and buttons
  const giveFoodButton = document.getElementById("give-food");
  const petButton = document.getElementById("pet");
  const leaveAloneButton = document.getElementById("leave-alone");
  // the kitten section
  const kittyFrame = document.getElementById("k-frame");
  const kittyName = document.getElementById("k-name");
  const kittyImage = document.getElementById("k-img");
  // assignments

  if (nameInput.value != "") {
    kittyName.textContent = nameInput.value;
    const kitten = new Cat(nameInput.value);
    nameInput.style.display = "none";
    nameKittenButton.style.display = "none";
    kittyFrame.style.display = "block"
    let randpic = Math.floor(Math.random() * (300 - 200) + 200) + "/" + Math.floor(Math.random() * (250 - 150) + 150);
    kittyImage.src = `http://placekitten.com/${randpic}`
    kittyImage.setAttribute("width", "naturalWidth");
    kittyImage.setAttribute("height", "naturalHeight");
    document.getElementById("buttons").style.display = "block";
    
    giveFoodButton.addEventListener("click", kitten.giveFood);
    petButton.addEventListener("click", kitten.pet);
    leaveAloneButton.addEventListener("click", kitten.leaveAlone);
    console.log(kitten)
  }
} 

//naming event
nameKittenButton.addEventListener("click", nameKitten);
nameInput.addEventListener("keyup", (e)=>{
    (e.key === "Enter" ? nameKitten(e) : null);
})


//nerf leave alone
//color isn't working