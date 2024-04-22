// importing objects
import viewObj from "./view.js";
import modelObj from "./model.js";

class App {
  async getInitialData() {
    try {
      await modelObj.getJson();
      const data = modelObj.getCurrentQuestion();
      viewObj.render(data);

      // events
      viewObj.clickEventHandler(this.handleUserSelection);
      viewObj.nextQUestionEvent(this.nextQuestionHandle);
    } catch (e) {
      console.log(e);
    }
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

    return shouldDisplay;
  }
}

const app = new App();

(async () => {
  await app.getInitialData();
})();
