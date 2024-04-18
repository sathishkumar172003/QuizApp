export const questionData = {
  currentQuestion: 0,
  totalQuestions: 3,
  questionBank: [
    {
      question: "Which the oldest Programming Language ?",
      options: ["Java", "C", "C++", "Python"],

      answers: [false, true, false, false],
    },
    {
      question: "Which the best language in the world  ?",
      options: ["Java", "C", "C++", "Python"],

      answers: [false, false, false, true],
    },
    {
      question: "Which the scripting language ?",
      options: ["Java", "C", "C++", "Python"],
      answers: [false, false, false, true],
    },
  ],
  currentScore: 0,
};

export const getCurrentQuestion = function () {
  let currentIndex = questionData.currentQuestion;
  let question = questionData.questionBank.find((question, index) => {
    if (index == currentIndex) {
      return question;
    }
  });

  return question;
};

export const nextQuestion = function () {
  let currentIndex = questionData.currentQuestion + 1;
  if (currentIndex == questionData.questionBank.length) {
    questionData.currentQuestion = -1;
    return false;
  }

  questionData.currentQuestion = currentIndex;
  return true;
};

export const updateScore = function (userAnswer) {
  console.log(questionData.currentScore);
  if (userAnswer == "true") questionData.currentScore += 1;
};

export const scoreReport = function () {
  // returns the score object includes current score and total score
  const scoreObj = {
    userScore: questionData.currentScore,
    totalScore: questionData.totalQuestions,
  };
  questionData.currentScore = 0;
  return scoreObj;
};
