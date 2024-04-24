import { API_URI, API_TOKEN } from "./config.js";

// importing objects
import viewObj from "./view.js";
import modelObj from "./model.js";

class App {
  constructor() {
    viewObj.userPreferenceClickEvent(this.getInitialData);
    this.initialOps();
  }
  async getInitialData(dataObj) {
    try {
      const url = `${API_URI}?category=${dataObj.category}&limit=${dataObj.limit}&difficulty=${dataObj.difficulty}&apiKey=${API_TOKEN}`;
      await modelObj.getJson(url);
      // this.initialOps();
      const data = modelObj.getCurrentQuestion();
      viewObj.render(data);
    } catch (e) {
      console.log(e);
    }
  }

  initialOps() {
    // events
    viewObj.clickEventHandler(this.handleUserSelection);
    viewObj.nextQUestionEvent(this.nextQuestionHandle);
  }

  handleUserSelection(userAnswer) {
    modelObj.updateScore(userAnswer);
    viewObj.disableClickEvent();
  }

  nextQuestionHandle() {
    let shouldDisplay = false;

    const hasNext = modelObj.nextQuestion();

    if (hasNext) {
      const data = modelObj.getCurrentQuestion();
      viewObj.render(data);
      viewObj.enableClickEvent();

      // enable the click event
    } else {
      // I need to dipaly the score
      const scoreData = modelObj.scoreReport();
      shouldDisplay = true;
      viewObj.render(scoreData, true);
    }

    return hasNext;
  }
}

const app = new App();
