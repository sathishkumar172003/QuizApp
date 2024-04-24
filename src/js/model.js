import { API_URI, API_TOKEN } from "./config.js";

class Model {
  _questionData;

  constructor() {
    this._questionData = {
      currentQuestion: 0,
      totalQuestions: 0,
      questionBank: [],
      currentScore: 0,
    };
  }
  // getches the data from api and modify the _questionData in place
  async getJson(url = `${API_URI}?category=Linux&limit=5&apiKey=${API_TOKEN}`) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) throw new Error(`${response.status} Fetch Failed`);

      for (let question of data) {
        // const question = question.question;
        const quest = question.question;

        // holds the full option list for the question
        const options = [];
        for (let key in question.answers) {
          let option = question.answers[key];
          if (option) options.push(option);
        }

        const answers = [];
        for (let key in question.correct_answers) {
          const answer = question.correct_answers[key];
          answers.push(answer);
        }

        const questionObj = {
          question: quest,
          options,
          answers,
        };

        this._questionData.questionBank.push({
          question: quest,
          options,
          answers,
        });
      }

      this._questionData.totalQuestions =
        this._questionData.questionBank.length;
      // console.log(this._questionData.totalQuestions);
    } catch (e) {
      throw e;
    }
  }

  // returns the _questionData itself
  getQuestionData() {
    return this._questionData;
  }

  // returns the current question based on current question number
  getCurrentQuestion() {
    let currentIndex = this._questionData.currentQuestion;

    const question = this._questionData.questionBank.find((quest, indx) => {
      if (indx == currentIndex) return quest;
    });

    return question;
  }

  // increasing the current question count
  nextQuestion() {
    const currentIndex = this._questionData.currentQuestion + 1;
    if (currentIndex == this._questionData.totalQuestions) {
      this._questionData.currentQuestion = -1;
      return false;
    }
    this._questionData.currentQuestion = currentIndex;
    return true;
  }

  // generates the report object that contains user score and total score
  scoreReport() {
    const scoreObj = {
      userScore: this._questionData.currentScore,
      totalScore: this._questionData.totalQuestions,
    };

    this._questionData.currentScore = 0;
    return scoreObj;
  }

  // increase the user score by 1 if the user selected option in true
  updateScore(userAnswer) {
    if (userAnswer == "true") {
      this._questionData.currentScore += 1;
    }
  }
}

export default new Model();
