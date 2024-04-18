import {
  getCurrentQuestion,
  nextQuestion,
  updateScore,
  scoreReport,
} from "./model.js";

// importing objects
import viewObj from "./view.js";

class App {
  constructor() {
    const data = getCurrentQuestion();
    viewObj.render(data);

    // add events
    viewObj.clickEventHandler(this.handleUserSelection);
    viewObj.nextQUestionEvent(this.nextQuestionHandle);
  }

  handleUserSelection(userAnswer) {
    updateScore(userAnswer);
    viewObj.disableClickEvent();
  }

  nextQuestionHandle() {
    const hasNext = nextQuestion();
    if (hasNext) {
      const data = getCurrentQuestion();
      viewObj.render(data);
      viewObj.enableClickEvent();
      // enable the click event
    } else {
      // I need to dipaly the score
      const scoreData = scoreReport();
      viewObj.render(scoreData, true);
    }
  }
}

const app = new App();
