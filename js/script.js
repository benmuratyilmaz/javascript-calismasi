const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const questionCount = 5;
let questions = [];
let currentQuestionIndex = 0;
let answeredQuestions = [];
let randomNumber = 0;
let randomIndeks = 0;
async function fetchQuestions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    questions = data.slice(0, questionCount).map((question) => ({
      question: question.body,
      questionId: question.id,
      choices: [
        "A) " + question.body.substring(0, 10),
        "B)" + question.body.substring(10, 20),
        "C)" + question.body.substring(20, 30),
        "D)" + question.body.substring(30, 40),
      ],
      correctAnswer: choices[randomIndeks],
    }));
    displayQuestion();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function displayQuestion() {
  randomNumber = Math.random() * 4;
  randomIndeks = Math.floor(randomNumber);
  console.log("Index" + currentQuestionIndex);
  if (currentQuestionIndex < questionCount) {
    questions[currentQuestionIndex].correctAnswer =
      questions[currentQuestionIndex].choices[randomIndeks];

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;

    const choicesList = document.getElementById("choices");
    choicesList.innerHTML = "";
    currentQuestion.choices.forEach((choice) => {
      let checkbox = document.createElement("input");
      checkbox.type = "radio";
      checkbox.name = "choice";
      checkbox.value = choice;
      checkbox.id = "choiceId";

      let label = document.createElement("label");

      label.htmlFor = "id";

      label.appendChild(document.createTextNode(choice));

      checkbox.addEventListener("click", () => handleChoice(choice));
      choicesList.appendChild(checkbox);
      choicesList.appendChild(label);
    });
    console.log("choicesList" + choicesList);
    disableChoices();
    setTimeout(() => {
      enableChoices();
    }, 10000);
  }
}

function handleChoice(selectedChoice) {
  const currentQuestion = questions[currentQuestionIndex];
  var timerControl = false;
  if (
    answeredQuestions.find(
      (e) => e.questionId === currentQuestion.questionId
    ) == undefined
  ) {
    answeredQuestions.push({
      question: currentQuestion.question,
      questionId: currentQuestion.questionId,
      selectedAnswer: selectedChoice,
      correctAnswer: currentQuestion.correctAnswer,
    });
  } else {
    answeredQuestions[currentQuestionIndex].selectedAnswer = selectedChoice;
    timerControl = true;
  }
  console.log(answeredQuestions);
  console.log("console.log(" + currentQuestionIndex);
  if (!timerControl) {
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questionCount) {
      } else {
        displayResults();
      }
      displayQuestion();
    }, 20000);
  }
}

function enableChoices() {
  const choices = document.querySelectorAll("#choices #choiceId");
  console.log(choices);
  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto";
  });
}

function disableChoices() {
  const choices = document.querySelectorAll("#choices #choiceId");
  choices.forEach((choice) => {
    choice.style.pointerEvents = "none";
  });
}

function displayResults() {
  const resultsTable = document.getElementById("results");
  resultsTable.innerHTML = "";
  answeredQuestions.forEach((answer) => {
    const tr = document.createElement("tr");
    const questionTd = document.createElement("td");
    questionTd.innerText = answer.question;
    tr.appendChild(questionTd);
    const selectedAnswerTd = document.createElement("td");
    selectedAnswerTd.innerText = answer.selectedAnswer;
    tr.appendChild(selectedAnswerTd);
    const correctAnswerTd = document.createElement("td");
    correctAnswerTd.innerText = answer.correctAnswer;
    tr.appendChild(correctAnswerTd);
    resultsTable.appendChild(tr);
  });
}

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

fetchQuestions();
