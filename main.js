const home = document.getElementById("home");
const homeNav = document.getElementById("homeNav");
const results = document.getElementById("results");
// const resultsNav = document.getElementById("resultsNav");
const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const questionContainerElement = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const cardContainer = document.getElementById("cardContainer");
const resultsContainer = document.getElementById("resultsContainer");
const answerComprobation = document.getElementById("answerComprobation")
const incorrectAnswer = document.getElementById("incorrectAnswer")
const correctAnswer = document.getElementById("correctAnswer")
const resultCard = document.getElementById("resultCard")
const feedback1 = document.getElementById("feedback1")
const feedback2 = document.getElementById("feedback2")
const questionStatement = document.getElementById("questionStatement")
let currentQuestionIndex;
let correctAnswersArr = []

const goHome = () => {
  results.classList.add("hide");
  questionContainerElement.classList.add("hide");
  nextButton.classList.add("d-flex");
  cardContainer.classList.replace("d-none", "d-flex");
  results.style = "display: none";
  home.style = "display:flex;";
  home.classList.remove("hide");
  startButton.classList.remove("hide");
  resultCard.classList.add("d-none")
};
const goResults = () => {
  home.classList.add("hide");
  home.style = "display:none;";
  results.style = "display: flex";
  cardContainer.classList.add("d-none");
  questionContainerElement.classList.add("hide");
  startButton.classList.add("hide");
  results.classList.remove("hide");
  resultCard.classList.remove("hide");
  resultCard.classList.add("d-none")
  showResults()
  printResult()
};
const showResults = () => {
  home.classList.add("hide");
  home.style = "display:none;";
  results.style = "display: flex";
  cardContainer.classList.add("d-none");
  questionContainerElement.classList.add("hide");
  startButton.classList.add("hide");
  results.classList.remove("hide");
  resultsContainer.classList.remove("hide")
  resultCard.classList.replace("d-none", "d-flex")
}

const startGame = () => {
  resetState();
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  cardContainer.classList.add("d-none");
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
  questionStatement.innerHTML = `Question ${currentQuestionIndex + 1}:`
  const answers = [];
  answers.push({ text: question.correct_answer, correct: true });
  question.incorrect_answers.forEach((element) => {
    answers.push({ text: element, correct: false });
    answers.sort(function () {
      return Math.random() - 0.5;
    });
  });
  console.log(answers);
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-outline-light");
    button.innerHTML = answer.text;
    if (answer.correct === true) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", (e) => {
      if (e.target.dataset.correct === "true") {
        answerComprobation.classList.remove("hide")
        answerComprobation.innerHTML = "Excelent!"
        const result = answerComprobation.value
        correctAnswersArr.push(result)
        // las anteriores dos lineas traté de mostrar las respuestas correctas, resultado undefined y muestra las 10 respuestas
        correctAnswer.play()
      } else {
        answerComprobation.classList.remove("hide")
        answerComprobation.innerHTML = "You choose the wrong answer!"
        incorrectAnswer.play()
      }
      selectAnswer();
    });
    answerButtons.appendChild(button);
  });
};

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
  if (currentQuestionIndex === 9) {
      setTimeout(goResults, 5000)
    }
});

const setNextQuestion = () => {
  resetState();
  answerComprobation.classList.add("hide")
  showQuestion(questions[currentQuestionIndex]);
};

const setStatusClass = (element, correct) => {
  if (correct) {
    element.classList.add("correct", "disabled");
    element.classList.replace("btn-outline-light", "btn-success");
  } else {
    element.classList.add("wrong", "disabled");
    element.classList.replace("btn-outline-light", "btn-danger");
  }
};

const selectAnswer = () => {
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.replace("d-none", "d-flex");
  } else {
    // startButton.innerHTML = "Restart";
    startButton.classList.add("hide");
    cardContainer.classList.add("d-none");
  }
};
const printResult = () => {
  showResults()
  feedback1.innerHTML = "Respuestas correctas:"
  feedback2.innerHTML =  
  console.log("Respuestas correctas: ", correctAnswersArr)
  // esta funcion sirve, no sirve el array "correctAnswersArr"
}

const resetState = () => {
  nextButton.classList.add("d-none");
  answerButtons.innerHTML = "";
};

homeNav.addEventListener("click", goHome);
// resultsNav.addEventListener("click", goResults);
startButton.addEventListener("click", startGame);
