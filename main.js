import { questions } from "./questions.js";

let startBtn = document.querySelector(".start-btn");
let nextBtn = document.querySelector(".next-btn");
let questionContainer = document.querySelector(".question-container");
let questionElement = document.querySelector(".question");
let answerButtonsElement = document.querySelector(".question-grid-btns");
let randomQuestion, currentQuestion;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  clearStatusClass(document.body);
  currentQuestion++;
  setNextQuestions();
});

function startGame() {
  startBtn.classList.add("hide");
  questionContainer.classList.remove("hide");
  randomQuestion = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  setNextQuestions();
}

function resetState() {
  nextBtn.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function setNextQuestions() {
  resetState();
  showQuestions(randomQuestion[currentQuestion]);
}

function showQuestions(question) {
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  let selectedBtn = e.target;
  let correct = selectedBtn.dataset.correct;

  setStatusClass(document.body, correct);

  Array.from(answerButtonsElement.children).forEach((btn) => {
    setStatusClass(btn, btn.dataset.correct);
  });

  if (randomQuestion.length > currentQuestion + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startBtn.innerHTML = "Restart";
    startBtn.classList.remove("hide");
  }
}

function setStatusClass(ele, correct) {
  clearStatusClass(ele);
  if (correct) {
    ele.classList.add("correct");
  } else {
    ele.classList.add("wrong");
  }
}

function clearStatusClass(ele) {
  ele.classList.remove("correct");
  ele.classList.remove("wrong");
}
