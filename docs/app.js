"use strict";

//This a test array for the questions and answers
const questionsForGame = [
  {
    question:
      "Who is the current president of the federal republic and sovereign states of the west African country Nigeria?",
    options: ["Sanwo Olu", "Buhari", "Goodluck Ebele Jonathan", "Tinubu"],
  },

  {
    question: "Who is the current governor of Lagos?",
    options: ["Buhari", "Sanwo Olu", "Goodluck Ebele Jonathan", "Tinubu"],
  },

  {
    question: "Which of these was a former governor of Lagos",
    options: ["Sanwo Olu", "Tinubu", "Buhari", "Goodluck Ebele Jonathan"],
  },

  {
    question: "Which of these politicians was a former president?",
    options: ["Sanwo Olu", "Goodluck Ebele Jonathan", "Buhari", "Tinubu"],
  },
];

//This array contains the test cash prizes to be won
const cashToWin = [
  0, 5000, 7500, 10000, 15000, 20000, 30000, 45000, 70000, 120000,
];

//The DOM elements to be used are selected here
const startButton = document.querySelector(".gameStart");
const dropCloseBtn = document.querySelector(".dropbtn");
const dropIcons = document.querySelectorAll(".drop");
const lifeLinesBox = document.querySelector(".dropdown-lifelines");
const lifeLines = document.querySelectorAll(".lifeline");
const overlay = document.querySelector(".overlay");
const questionEL = document.querySelector(".question");
const allOptionTextEl = document.querySelectorAll(".op");
const allOptionButtonEl = document.querySelectorAll(".option");
const questionNumber = document.querySelector(".questionNo");
const cashWonEl = document.querySelector(".money");

//Global variables are declared
let qIndex;
let qnA;
let cashWon;
let currentSelection;
let randomIndex;

//This function adds or removes event listeners
function listenerToggle(domEl, removeOrAdd, funcName) {
  if (removeOrAdd == "add") {
    domEl.addEventListener("click", funcName);
  } else if (removeOrAdd == "remove") {
    domEl.removeEventListener("click", funcName);
  }
}

//This function toggles the display of the lifeline buttons and container
const lifelineToggle = function () {
  dropIcons[0].classList.toggle("hidden");
  dropIcons[1].classList.toggle("hidden");
  lifeLinesBox.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

//This function executes when a lifeline button is clicked on
function lifeLineUsed() {
  this.classList.add("used");
  const y = currentSelection.options[1];
  const everyOther = [...allOptionTextEl].filter((x) => x.textContent !== y); //Selects all other options
  for (let i = 0; i < 2; i++) {
    let j = Math.floor(Math.random() * everyOther.length);
    everyOther[j].textContent = "";
    everyOther[j].parentElement.removeEventListener("click", checker);
    everyOther.splice(j, 1);
  } //Loop removes any two random options
  lifelineToggle();
  listenerToggle(dropCloseBtn, "remove", lifelineToggle);
  this.removeEventListener("click", lifeLineUsed); //remove listener from used lifeline
}

//This function checks the hasWon state (whether a player lost, won or walked away)
const hasWon = function (win = true, walkaway = false) {
  listenerToggle(dropCloseBtn, "remove", lifelineToggle);
  for (const btns of allOptionButtonEl) {
    listenerToggle(btns, "remove", checker);
  }
  cashWonEl.parentElement.classList.add("hidden");
  //The above code will executes regardless of the hasWon state

  //These conditionals execute based on the hasWon state
  if (win) {
    questionNumber.textContent = `YOU HAVE WON \u20A6${cashWon.toLocaleString()}`;
  } else if (walkaway) {
    questionNumber.textContent = `YOU WALKED AWAY WITH \u20A6${cashWon.toLocaleString()}`;
  } else {
    const y = [...allOptionTextEl].find(
      (x) => x.textContent === currentSelection.options[1]
    );
    y.parentElement.style.backgroundColor = "green";
    const amountWon = cashWon >= 250000 ? 250000 : cashWon >= 10000 ? 10000 : 0;
    questionNumber.textContent = `YOU HAVE WON \u20A6${amountWon.toLocaleString()}`;
  }
  //Change the event listener function from 'walk' to 'begin' so as to restart game
  //This will execute regardless of hasWon state
  startButton.removeEventListener("click", walk);
  startButton.childNodes[0].textContent = "RESTART GAME";
  startButton.addEventListener("click", begin);
};

//This function is in charge of most of display on game page
//It takes three parameters: current qnA, if the game is still on, if user has walked
function renderQ(selection, gameplay = true, walkaway = false) {
  if (selection && selection.question && gameplay && !walkaway) {
    cashWon = cashToWin[qIndex]; //Displays the amount that has been won
    cashWonEl.textContent = cashWon.toLocaleString();
    qIndex++;
    questionNumber.textContent = qIndex; //update current question number
    questionNumber.classList.remove("hidden");
    questionEL.textContent = selection.question; //update current question
    listenerToggle(dropCloseBtn, "add", lifelineToggle); //add an event handler to the lifeline dropdown

    const options = [...selection.options];
    for (const x of allOptionTextEl) {
      const randomIndex = Math.trunc(Math.random() * options.length);
      x.textContent = options[randomIndex];
      x.parentElement.style.backgroundColor = "";
      options.splice(randomIndex, 1);
      x.parentElement.addEventListener("click", checker);
    } //This loop randomly distributes options and adds an event listener to their buttons
  }
  if (walkaway) {
    hasWon(false, true); //Call hasWon function if player walke away
  } else if (!(selection && selection.question)) {
    hasWon(); //if the questions are exhausted, player has won!!
  } else {
    console.log("Smooth"); //For debugging
  }
}

//This function generates a random index for the next question
const nextQuestion = function () {
  randomIndex = Math.trunc(Math.random() * qnA.length);
  currentSelection = { ...qnA.splice(randomIndex, 1)[0] };

  return currentSelection;
};

//This function checks the player's answer
function checker() {
  const ansPick = this.children.item(1).textContent;
  const randomFlash = Math.trunc(Math.random() * 4000); //count for yellow flash
  this.classList.add("flash"); //This adds the flashing background

  //Execute this function after randomFlash count
  setTimeout(() => {
    this.classList.remove("flash");
    const correctOrNot = ansPick === currentSelection.options[1]; //check option picked
    this.style.backgroundColor = correctOrNot ? "green" : "red"; //set color accordingly

    if (correctOrNot) {
      setTimeout(() => {
        renderQ(nextQuestion(), correctOrNot);
      }, 1000); //Move to next question after 1 second
    } else hasWon(false); //else call hasWon function after flashing
  }, randomFlash);
}

//Call this function if the player walks away
function walk() {
  renderQ(null, false, true); //render based on parameters
  for (const op of allOptionTextEl) {
    if (op.textContent === currentSelection.options[1]) {
      op.parentElement.style.backgroundColor = "green";
      break;
    } //show the user the correct option
  }
}

//This function starts or restarts the game
function begin() {
  qnA = [...questionsForGame]; //destructure array of questions of object and store here
  questionNumber.textContent = qIndex = 0; //set current question number to 0

  renderQ(nextQuestion()); //display question and options

  // add event listeners to all options, lifelines and lifelines dropdown.
  for (const btns of allOptionButtonEl) {
    listenerToggle(btns, "add", checker);
  }
  for (const lifeline of lifeLines) {
    listenerToggle(lifeline, "add", lifeLineUsed);
    lifeline.classList.remove("used");
  }
  dropCloseBtn.addEventListener("click", lifelineToggle);

  cashWonEl.parentElement.classList.remove("hidden");
  //Change event listener of start button to 'walk' function
  startButton.removeEventListener("click", begin);
  startButton.childNodes[0].textContent = "WALK AWAY";

  startButton.addEventListener("click", walk);
  console.log("done"); //for debugging
}

//This sets the ball rolling
startButton.addEventListener("click", begin);
