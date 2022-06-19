"use strict";
const questionsForGame = [...questions];

let apiQ = []; //This array stores the questions from the API call
apiCall(); //This calls the async function that fetches the questions

(async function shuff() {
  questionsForGame.sort((a, b) => Math.random() - Math.random());
})(); //This Immediately Invoked function randomly shuffles the local questions array once

//This array contains the test cash prizes to be won
const cashToWin = [
  0, 5000, 7500, 10000, 15000, 20000, 30000, 45000, 70000, 120000, 250000,
  500000, 1000000, 2000000, 5000000, 10000000,
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
let qnA = []; //The qnA variable stores the current game questions array
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
  const y = decode(currentSelection.correct_answer);
  const everyOther = [...allOptionTextEl].filter((x) => x.textContent !== y); //Selects every other option
  for (let i = 0; i < 2; i++) {
    let j = Math.floor(Math.random() * everyOther.length);
    everyOther[j].textContent = "";
    everyOther[j].parentElement.removeEventListener("click", checker);
    everyOther.splice(j, 1);
  } //Loop randomly removes any two options
  lifelineToggle();
  listenerToggle(dropCloseBtn, "remove", lifelineToggle); //remove listener from toggle button
  this.removeEventListener("click", lifeLineUsed); //remove listener from used lifeline
}

//This function checks the hasPlayerWon state (whether a player lost, won or walked away)
const hasPlayerWon = function (win = true, walkaway = false) {
  pause("hasPlayerWon");
  cashWonEl.parentElement.classList.add("hidden");
  //The above code will executes regardless of the hasPlayerWon state

  //These conditionals execute based on the hasPlayerWon state
  if (win) {
    questionNumber.textContent = `YOU HAVE WON \u20A6${cashToWin[15].toLocaleString()}`;
  } else if (walkaway) {
    questionNumber.textContent = `YOU WALKED AWAY WITH \u20A6${cashWon.toLocaleString()}`;
  } else {
    const y = [...allOptionTextEl].find(
      (x) => x.textContent === decode(currentSelection.correct_answer)
    );
    y.parentElement.style.backgroundColor = "green";
    const amountWon = cashWon >= 250000 ? 250000 : cashWon >= 20000 ? 20000 : 0;
    questionNumber.textContent = `YOU HAVE WON \u20A6${amountWon.toLocaleString()}`;
  }
  //Change the event listener function from 'walk' to 'begin' so as to restart game
  //This will execute regardless of hasPlayerWon state
  startButton.removeEventListener("click", walk);
  startButton.childNodes[0].textContent = "RESTART GAME";
  startButton.addEventListener("click", begin);
  apiCall();
};

//This function turns of all event listeners when a user selects an option or when the game ends
const pause = function (event) {
  listenerToggle(dropCloseBtn, "remove", lifelineToggle);
  allOptionButtonEl.forEach((btns) => listenerToggle(btns, "remove", checker)); //IMPORTANT
  if (event === "checker") {
    listenerToggle(startButton, "remove", walk);
  }
};

//This function is in charge of most of the game's view
//It takes three parameters: current qnA, if the game is still on and if user has walked
function renderQ(selection, gameplay = true, walkaway = false) {
  //This if block only runs when there is still a question, game is still on and user did not walk
  if (selection && selection.question && gameplay && !walkaway) {
    cashWon = cashToWin[qIndex]; //Stores the amount that has been won
    cashWonEl.textContent = cashToWin[qIndex + 1].toLocaleString(); //Displays the amount about to be won
    //Adds a specific styling if amount to be won is a guaranteed sum
    if (qIndex === 4 || qIndex === 9 || qIndex === 14) {
      cashWonEl.parentElement.classList.add("guaranteed");
    } else cashWonEl.parentElement.classList.remove("guaranteed");
    qIndex++; //Increments the current question number
    questionNumber.textContent = qIndex; //update the dom with the current question number
    questionEL.textContent = decode(selection.question); //update the current question
    listenerToggle(dropCloseBtn, "add", lifelineToggle); //add an event handler to the lifeline dropdown
    listenerToggle(startButton, "add", walk); //Add the start button event listener back

    const options = [...selection.incorrect_answers, selection.correct_answer];
    for (const op of allOptionTextEl) {
      const randomIndex = Math.trunc(Math.random() * options.length);
      op.textContent = decode(options.splice(randomIndex, 1)[0]);
      op.parentElement.style.backgroundColor = "";
      op.parentElement.addEventListener("click", checker);
    } //This loop randomly distributes options and adds an event listener to each one
  }
  if (walkaway) {
    hasPlayerWon(false, true); //Call hasPlayerWon function if player walke away
  } else if (!(selection && selection.question)) {
    hasPlayerWon(); //if the questions are exhausted, player has won!!
  } else {
    console.log("Smooth"); //For debugging
  }
}

//This function returns the next auestion in the array
const nextQuestion = function () {
  currentSelection = qnA.splice(0, 1)[0];
  return currentSelection;
};

//This function checks the player's answer
function checker() {
  pause("checker");
  const ansPick = this.children.item(1).textContent; //This stores the user's selection
  const randomFlash = Math.trunc(Math.random() * 4000); //count for yellow flash
  this.classList.add("flash"); //This adds the flashing background

  //Execute this function after randomFlash count
  setTimeout(() => {
    this.classList.remove("flash");
    const correctOrNot = ansPick === decode(currentSelection.correct_answer); //check option picked
    this.style.backgroundColor = correctOrNot ? "green" : "red"; //set color accordingly

    if (correctOrNot) {
      setTimeout(() => {
        renderQ(nextQuestion(), correctOrNot);
      }, 1000); //Move to next question after 1 second
    } else hasPlayerWon(false); //else call hasPlayerWon function with false parameter after flashing
  }, randomFlash);
}

//Call this function if the player walks away
function walk() {
  renderQ(undefined, false, true); //render based on parameters
  for (const op of allOptionTextEl) {
    if (op.textContent === decode(currentSelection.correct_answer)) {
      op.parentElement.style.backgroundColor = "green";
      break;
    } //show the user the correct option
  }
}

//This function starts or restarts the game
function begin() {
  apiOrLocal(); //Calls the function to determine where questions are to be gotten from
  questionNumber.textContent = qIndex = 0; //set current question number to 0
  questionNumber.classList.remove("hidden");
  renderQ(nextQuestion()); //display next question and options

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

//This function handles errors from api calls
function manageErr(response) {
  if (!response.ok) {
    throw Error(`Server error: ${response.status}`);
  }
  return response;
}

//This async function retrieves questions from Opentdb database
async function apiCall() {
  apiQ = [];
  try {
    const fetchEasy = await fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    ).then(manageErr);

    const fetchMedium = await fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
    ).then(manageErr);

    const fetchHard = await fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple"
    ).then(manageErr);

    const fetchedAll = await Promise.all([fetchEasy, fetchMedium, fetchHard]);

    //Only push questions if api response is valid
    for (const res of fetchedAll) {
      if (res.ok) {
        const drop = await res.json();
        if (drop.response_code == 0) {
          apiQ.push(...drop.results);
        }
      } else throw new Error("failed");
    }
  } catch (error) {
    console.log(`Failed this error: ${error}`);
  }
}

//Decode encoded html text
function decode(text) {
  return new DOMParser().parseFromString(text, "text/html").documentElement
    .textContent;
}

//REFILL BASE FUNCTION
//This function returns questions based on a certain dfficulty type and undefined if type is not found
const refiller = (source, type) => {
  const ind = source.findIndex((x) => x.difficulty === type);
  if (ind === -1) {
    return undefined;
  }
  return source.splice(ind, 1)[0];
};

//This function retrieves questions from the available source(API or Local)
//It only return the specific amount of questions needed for each difficulty
function retrieve(n, source) {
  let qNeeded = 15 - n; //This calculates how many questions have already been answered by the user
  if (qNeeded < 0 || qNeeded > 15) return "Not Valid";
  /*This array stores the exact amount of hard, medium and easy questions respectively 
  required to be retrieved*/
  const fillArr = [0, 0, 0].map((x, i) => {
    const reducer = 15 - 5 * (i + 1);
    const val = qNeeded > reducer ? qNeeded - reducer : 0;
    qNeeded -= val;
    return val;
  });

  function sanitizeArr(arr) {
    return arr
      .filter((x) => x !== undefined)
      .sort((a, b) => Math.random() - Math.random());
  } //This shuffles the retrieved questions and filters undefined values

  /*These three variables (easyFill, medFill, hardFill) are created to store the questions 
  returned by the refiller function*/

  const easyFill = Array.from(
    { length: fillArr[2] },
    refiller.bind({}, source, "easy")
  );

  const medFill = Array.from(
    { length: fillArr[1] },
    refiller.bind({}, source, "medium")
  );

  const hardFill = Array.from(
    { length: fillArr[0] },
    refiller.bind({}, source, "hard")
  );

  const allArr = [easyFill, medFill, hardFill];

  //The three arrays are returned by the function
  return allArr.flatMap((x) => (x.length > 0 ? sanitizeArr(x) : x));
}

//This function determines the source of the questions to be used by the player
function apiOrLocal() {
  if (apiQ.length === 15) {
    console.log("API");
    qnA = [...retrieve(0, apiQ)]; //Use up all questions from API call
    apiCall(); //Call api to retrieve new questions
  } else {
    qnA.unshift(...retrieve(qnA.length, questionsForGame)); //destructure array of questions of object and store here
    //if block to reload page for when local storage is depleted
    if (qnA.length !== 15) {
      window.location.reload(true); //
    }
  }
}
