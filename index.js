// Declarations
class Cat {
  constructor(name) {
    this._name = name;
    this._tiredness = randomStartValue();
    this._hunger = randomStartValue();
    this._loneliness = randomStartValue();
    this._happiness = 6;
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
    this._slept = false;
    this._killed = false;
    this._changedBehaviour = false;
    this._opinion = 7;
    this.pet = this.pet.bind(this);
    this.leaveAlone = this.leaveAlone.bind(this);
    this.giveFood = this.giveFood.bind(this);
    
  }

  // called methods
  addOutput(string) {
    let newP = document.createElement("p");
    newP.innerText = `${string}`;
    this._outputs.appendChild(newP)
  }

  clearOutput() {
    while (this._outputs.firstChild) {
      this._outputs.removeChild(this._outputs.lastChild);
    }
  }
  
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
        this.addOutput(`${this._name} is overfed and threw up!`)
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
        
        if (this._opinion >= 15) {
          this.clearOutput();
          this.addOutput(`${this._name} wants to stay with you forever! That's good, isn't it? You won.`);
          this.endGame();
        }
        else if (this._opinion <= 0) {
          this.clearOutput();
          this.addOutput(`${this._name} out of desperation mistook you for a mouse and killed you in your sleep. That's bad. You lost.`)
          this.endGame();
        }
      }
    
    // kitten can randomly change behaviour if change wasn't forced.
    if (!this._changedBehaviour && randomInt(3) === 0) this.changeBehaviour();

    // set the color of the Name to indicate happiness.
    let nameP = document.getElementById("k-name");
    switch (this._happiness) {
      case 0: 
      nameP.style.color = "rgb(255,0,0)"
      break;
      case 1: 
      nameP.style.color = "rgb(255,32,0)"
      break;
      case 2: 
      nameP.style.color = "rgb(255,64,0)"
      break;
      case 3: 
      nameP.style.color = "rgb(255,96,0)"
      break;
      case 4: 
      nameP.style.color = "rgb(255,128,0)"
      break;
      case 5: 
      nameP.style.color = "rgb(255,160,0)"
      break;
      case 6: 
      nameP.style.color = "rgb(255,192,0)"
      break;
      case 7: 
      nameP.style.color = "rgb(255,224,0)"
      break;
      case 8: 
      nameP.style.color = "rgb(224,255,0)"
      break;
      case 9: 
      nameP.style.color = "rgb(192,255,0)"
      break;
      case 10: 
      nameP.style.color = "rgb(160,255,0)"
      break;
      case 11: 
      nameP.style.color = "rgb(128,255,0)"
      break;
      case 12: 
      nameP.style.color = "rgb(96,255,0)"
      break;
      case 13: 
      nameP.style.color = "rgb(64,255,0)"
      break;
      case 14: 
      nameP.style.color = "rgb(32,255,0)"
      break;
      case 15:
      nameP.style.color = "rgb(0,255,0)"
    }

    this.meow();
    this._meows = false;
    this._petted = false;
    this._slept = false;
    this._leftAlone = false;
    this._changedBehaviour = false;
  }

  endGame() {
    console.log("the end")
    document.getElementById("start-new").style.display = "block";
    document.getElementById("give-food").style.display = "none";
    document.getElementById("pet").style.display = "none";
    document.getElementById("leave-alone").style.display = "none";
  }

  newGame() {
    location.reload();
  }

  // player actions
  giveFood() {
    this._foodAvailable = true;
    document.getElementById("give-food").disabled = true;
  }

  pet() {
    this.clearOutput();
    this.addOutput(`You pet ${this._name}`)
    this.timePasses();
    this._loneliness -= 4;
    if (this._catBehaviour === "wantsToBeAlone") {
      this.addOutput(`${this._name} is hissing`);
      if(randomInt(2) === 0) this.decreaseHappiness(1)
    } else if (this._catBehaviour === "wantsAttention") {
      this.increaseHappiness(1)
      this.changeBehaviour();
      this._changedBehaviour = true;
      this.addOutput(`${this._name} is purring like crazy`);
    } else {
      this.addOutput(`${this._name} is purring`);
      if(randomInt(2) === 0) this.increaseHappiness(1);
    }
    this._petted = true;
    this.clearHappiness();
    this.checkNeeds();
  }

  leaveAlone() {
    this.clearOutput();
    this.addOutput(`${this._name} is left alone`);
    this.timePasses();
    this._loneliness += 1;
    if (this._catBehaviour === "wantsToBeAlone") {
      if(randomInt(3) === 0) this.increaseHappiness(1);
    }
    else if (this._catBehaviour === "wantsAttention") this.decreaseHappiness(1);
    this.catTakesAction();
    this.checkNeeds();
  }

  // cat actions

  catTakesAction() {
    if (this._foodAvailable) this.eat("fodder");
    else if (this._tiredness >= 8) this.sleep();
    else if (this._catBehaviour === "wantsToMurder") this.killMouse("out of bloodlust");
    else {
      Math.floor(randomInt(5)) > 0 ? this.doCatStuff() : this.killMouse("because of reasons")
    }
  }
  eat(food) {
    this.addOutput(`${this._name} is eating`);
    this._hunger -= 5;
    this.increaseHappiness(1);
    this.clearHappiness();
    if (food === "fodder") {
      this._foodAvailable = false;
      document.getElementById("give-food").disabled = false;
    }
  }

  killMouse(reason) {
    this.addOutput(`${this._name} is killing ${reason}`);
    if (reason === "out of bloodlust") {
      this.increaseHappiness(1);
      if(randomInt(2) === 0) this.increaseHappiness(1);
      this.changeBehaviour();
      this._changedBehaviour = true;
    } else this.increaseHappiness(1);
    if (this._hunger >= 6) this.eat("mouse");
    this.clearHappiness();
  }

  sleep() {
    this.addOutput(`${this._name} is sleeping`);
    this._tiredness -= 5;
    this._hunger += 3;
    this.clearTiredness();
    this._slept = true;
  }

  doCatStuff() {
    this.addOutput(`${this._name} is just doing some cat stuff`);
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
  const newGameButton = document.getElementById("start-new");
  // the kitten section
  const kittyFrame = document.getElementById("k-frame");
  const kittyName = document.getElementById("k-name");
  const kittyImage = document.getElementById("k-img");
  // assignments

  if (nameInput.value != "") {
    //create object and change display of page
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
    document.getElementById("instructions").style.display = "block"
    giveFoodButton.addEventListener("click", kitten.giveFood);
    petButton.addEventListener("click", kitten.pet);
    leaveAloneButton.addEventListener("click", kitten.leaveAlone);
    newGameButton.addEventListener("click", kitten.newGame)
    console.log(kitten)
  }
} 

//naming event
nameKittenButton.addEventListener("click", nameKitten);
nameInput.addEventListener("keyup", (e)=>{
    (e.key === "Enter" ? nameKitten(e) : null);
})
