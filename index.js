// Declarations
class Cat {
  constructor(name) {
    this._name = name;
    this._tiredness = randomStartValue();
    this._hunger = randomStartValue();
    this._loneliness = randomStartValue();
    this._happiness = randomStartValue();
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
    this._opionion = 6;
    this._petted = false;
  }

  // called
  timePasses() {
    console.log("time is passing");
    this._hunger += 1;
    this._tiredness += 1;
    this._loneliness += 1;
    if (this._catBehaviour === "wantsToBeAlone") this._happiness += 1;
    else if (this._catBehaviour === "wantsAttention") this._happiness -= 1;
    this.clearHappiness();
    this.clearTiredness();
  }

  clearHappiness() {
    if (this._happiness > 15) this._happiness = 15;
    else if (this._happiness < 0) this._happiness = 0;
  }

  clearTiredness() {
    if (this._tiredness > 10) this._tiredness = 10;
    else if (this._happiness < 0) this._happiness = 0;
  }

  meow() {
    document.getElementById("meow").textContent = "Meooowww!"
    this._meows = false;
  }

  checkNeeds() {
  }

  // player actions
  giveFood() {
    this._foodAvailable = true;
  }

  pet() {
    console.log(`You pet ${this._name}`);
    this.timePasses();
    this._loneliness -= 3;
    if (this._catBehaviour === "wantsToBeAlone") {
      console.log(`${this._name} is hissing`);
    } else if (this._catBehaviour === "wantsAttention") {
      this._happiness += 2;
      console.log(`${this._name} is purring like crazy`);
    } else {
      this._happiness += 1;
      console.log(`${this._name} is purring`);
    }
    this.clearHappiness();
    this.checkNeeds();
  }

  leaveAlone() {
    console.log(`${this._name} is left alone`);
    this._loneliness += 1;
    this.timePasses();
    this.catTakesAction();
    this.checkNeeds();
  }

  // cat actions ()

  catTakesAction() {
    console.log(`${this._name} takes action:`);
    if (this._foodAvaible) this.eat("fodder");
    else if (this._tiredness >= 8) this.sleep();
    else if (this._catBehaviour === "wantsToMurder") this.killMouse("for fun");
    else {
      let randomAction = Math.floor(Math.random() * 5);
      if (randomAction >= 0) this.doCatStuff();
      else this.killMouse("because of reasons");
    }
  }
  eat(food) {
    console.log(`${this._name} is eating`);
    this.hunger -= 6;
    this.happiness += 2;
    this.clearHappiness();
    if (food === "fodder") this._foodAvaible = false;
  }

  killMouse(reason) {
    console.log(`${this._name} is killing`);
    if (reason === "for fun") {
      this._happiness += 4;
      this._catBehaviour = "normal";
    } else this._happiness += 2;
    if (this._hunger >= 6) this.eat("mouse");
    this.clearHappiness();
  }

  sleep() {
    console.log(`${this._name} cat is sleeping`);
    this._tiredness -= 5;
    this._hunger += 3;
    this.clearTiredness();
  }

  doCatStuff() {
    console.log(`${this._name} is just doing some cat stuff`);
    this._happiness += 1;
    this.clearHappiness();
  }

  // cat random actions

  changeBehaviour() {
    this._catBehaviour = this._catTagsList[
      Math.floor(Math.random() * this._catTagsList.length)
    ];
  }
}

// starting values
const randomStartValue = () => {
  return Math.floor(Math.random() * (6 - 2) + 2);
};

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
  // outputs
  const meow = document.getElementById("meow");
  const textbox = document.getElementById("textbox")
  // assignments

  if (nameInput.value != "") {
    kittyName.textContent = nameInput.value;
    const kitten = new Cat(nameInput.value);
    nameInput.style.display = "none";
    nameKittenButton.style.display = "none";
    kittyFrame.style.display = "block"
    let randpic = Math.floor(Math.random() * (250 - 150) + 150) + "/" + Math.floor(Math.random() * (250 - 150) + 150);
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

//events
nameKittenButton.addEventListener("click", nameKitten);
nameInput.addEventListener("keyup", (e)=>{
    (e.keyCode === 13 ? nameKitten(e) : null);
})


/* //testing
const kitten = new Cat("Muschi")
console.log(kitten);
kitten.leaveAlone();
console.log(kitten);
kitten.giveFood();
console.log(kitten);
kitten.pet();
console.log(kitten);
*/