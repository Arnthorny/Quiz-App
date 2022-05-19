"use strict";

// import questions from "./questions.js";

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

const cashToWin = [
  0, 5000, 7500, 10000, 15000, 20000, 30000, 45000, 70000, 120000,
];

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

let qIndex;
let qnA;
let cashWon;

let currentSelection;
let randomIndex;

function listenerToggle(domEl, removeOrAdd, funcName) {
  if (removeOrAdd == "add") {
    domEl.addEventListener("click", funcName);
  } else if (removeOrAdd == "remove") {
    domEl.removeEventListener("click", funcName);
  }
}

const lifelineToggle = function () {
  dropIcons[0].classList.toggle("hidden");
  dropIcons[1].classList.toggle("hidden");
  lifeLinesBox.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  console.log("toggleChek");
};

function lifeLineUsed() {
  this.classList.add("used");
  let y = currentSelection.options[1];
  let everyOther = [...allOptionTextEl].filter((x) => x.textContent !== y);
  for (let i = 0; i < 2; i++) {
    let j = Math.floor(Math.random() * everyOther.length);
    everyOther[j].textContent = "";
    everyOther[j].parentElement.removeEventListener("click", checker);
    everyOther.splice(j, 1);
  }
  lifelineToggle();
  listenerToggle(dropCloseBtn, "remove", lifelineToggle);
  this.removeEventListener("click", lifeLineUsed);
}

//   // lifeLinesBox.style.display = dropIcons[0].classList.contains("hidden")
//   //   ? "block"
//   //   : "none";
// });

const hasWon = function (win = true, walkaway = false) {
  listenerToggle(dropCloseBtn, "remove", lifelineToggle);
  for (const btns of allOptionButtonEl) {
    listenerToggle(btns, "remove", checker);
  }
  cashWonEl.parentElement.classList.add("hidden");
  if (win) {
    questionNumber.textContent = `YOU HAVE WON \u20A6${cashWon.toLocaleString()}`;
  } else if (walkaway) {
    questionNumber.textContent = `YOU WALKED AWAY WITH \u20A6${cashWon.toLocaleString()}`;
  } else {
    let amountWon = cashWon >= 250000 ? 250000 : cashWon >= 10000 ? 10000 : 0;
    console.log(amountWon);
    questionNumber.textContent = `YOU HAVE WON \u20A6${amountWon.toLocaleString()}`;
  }
  startButton.removeEventListener("click", walk);
  startButton.childNodes[0].textContent = "RESTART GAME";
  startButton.addEventListener("click", begin);
};

function renderQ(selection, gameplay = true, walkaway = false) {
  if (selection && selection.question && gameplay && !walkaway) {
    cashWon = cashToWin[qIndex];
    cashWonEl.textContent = cashWon.toLocaleString();
    qIndex++;
    questionNumber.textContent = qIndex;
    questionNumber.classList.remove("hidden");
    questionEL.textContent = selection.question;
    listenerToggle(dropCloseBtn, "add", lifelineToggle);

    const options = [...selection.options];
    for (const x of allOptionTextEl) {
      const randomIndex = Math.trunc(Math.random() * options.length);
      x.textContent = options[randomIndex];
      x.parentElement.style.backgroundColor = "";
      options.splice(randomIndex, 1);
      x.parentElement.addEventListener("click", checker);
    }
  } else {
  }
  if (walkaway) {
    hasWon(false, true);
  } else if (!(selection && selection.question)) {
    hasWon();
  } else {
    console.log("Smooth");
  }
}

// optionList.classList();

const nextQuestion = function () {
  randomIndex = Math.trunc(Math.random() * qnA.length);
  currentSelection = { ...qnA.splice(randomIndex, 1)[0] };

  return currentSelection;
};

function checker() {
  const ansPick = this.children.item(1).textContent;
  const randomFlash = Math.trunc(Math.random() * 4000);

  this.classList.add("flash");
  setTimeout(() => {
    console.log(randomFlash);
    this.classList.remove("flash");
    let correctOrNot = ansPick === currentSelection.options[1];
    this.style.backgroundColor = correctOrNot ? "green" : "red";

    if (correctOrNot) {
      setTimeout(() => {
        renderQ(nextQuestion(), correctOrNot);
      }, 1000);
    } else hasWon(false);
  }, randomFlash);
}

// const optionCopy = [...options];

function walk() {
  renderQ(null, false, true);
  for (const op of allOptionTextEl) {
    if (op.textContent === currentSelection.options[1]) {
      op.parentElement.style.backgroundColor = "green";
      break;
    }
  }
}

function begin() {
  qnA = [...questionsForGame];
  questionNumber.textContent = qIndex = 0;

  renderQ(nextQuestion());

  for (const btns of allOptionButtonEl) {
    listenerToggle(btns, "add", checker);
  }
  for (const lifeline of lifeLines) {
    listenerToggle(lifeline, "add", lifeLineUsed);
    lifeline.classList.remove("used");
  }
  dropCloseBtn.addEventListener("click", lifelineToggle);

  startButton.removeEventListener("click", begin);
  startButton.childNodes[0].textContent = "WALK AWAY";

  startButton.addEventListener("click", walk);
  console.log("done");
}

startButton.addEventListener("click", begin);
