const home = document.getElementById("home");
const homeNav = document.getElementById("homeNav");
const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const questionContainerElement = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");

let currentQuestionIndex;
const startGame = () => {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
};

let questions = [];
axios
  .get(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  )
  .then((res) => (questions = res.data.results))
  .catch((err) => console.error(err));

const showQuestion = (question) => {
  questionElement.innerHTML = question.question;
  const answers = [];
  answers.push({ text: question.correct_answer, correct: true });
  question.incorrect_answers.forEach((element) => {
    answers.push({ text: element, correct: false });
    answers.sort(function () {
      return Math.random() - 0.5
    })
  });
  console.log(answers)
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    if (answer.correct === true) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer)
    answerButtons.appendChild(button);
  });
};

const setNextQuestion = () => {
  showQuestion(questions[currentQuestionIndex]);
};

const setStatusClass = (element, correct) => {
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

const selectAnswer = () => {
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true")
  })
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
  } else {
    startButton.innerHTML = "Restart"
    startButton.classList.remove("hide")
  }
}

startButton.addEventListener("click", startGame);
// const hideView = () => {
//   home.classList.add("hide")
// }

// const goHome = () => {
//   hideView()
//   home.classList.remove("hide")
// }

// const goAbout = () => {
//   hideView()
//   about.classList.remove("hide")
// }

// homeNav.addEventListener("click", goHome)

// let users = [];
// axios
//   .get(
//     "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
//   )
//   .then((users) => console.log(users))
//   .catch((err) => console.error(err));
// console.log(axios);
