const home = document.getElementById("home");
const homeNav = document.getElementById("homeNav");
const results = document.getElementById("results")
const resultsNav = document.getElementById("resultsNav")
const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const questionContainerElement = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
let currentQuestionIndex;

const goHome = () => {
  results.classList.add("hide")
  home.style= "display:flex;"
  home.classList.remove("hide")
  startButton.classList.remove("hide")

}
const goResults = () => {
  home.classList.add("hide")
  home.style= "display:none;"
  questionContainerElement.classList.add("hide")
  startButton.classList.add("hide")
  results.classList.remove("hide")
}

const startGame = () => {
  resetState()
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

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion()
})

const setNextQuestion = () => {
  resetState()
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

const resetState = () => {
  nextButton.classList.add("hide")
  answerButtons.innerHTML = ""
}

homeNav.addEventListener("click", goHome)
resultsNav.addEventListener("click", goResults)
startButton.addEventListener("click", startGame);