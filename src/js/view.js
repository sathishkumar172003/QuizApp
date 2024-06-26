class View {
  _quizContainerBodyEl = document.querySelector(".quiz_container_body");
  _quizOptionListEl = document.querySelector(".quiz_option_list");
  _formEl = document.querySelector(".quiz_form");
  _quizQuestionTitleEl = document.querySelector(".quiz_question");
  _submitButton = document.querySelector(".submit_button");
  _userPreferenceFormEl = document.querySelector(".user_preference_form");
  _mainEl = document.querySelector(".main");

  render(data, result = false) {
    // data contains current question to be displayed
    this._data = data;

    if (result) {
      this._generateResultMarkup();
      return;
    }
    this._setTitle(this._data.question);
    this._generateMarkup();
  }

  _generateMarkup() {
    console.log(this._data);
    const innerMarkup = this._data.options
      .map(
        (opt, indx) =>
          `<li class="quiz_option_list_item" data-result="${this._data.answers[indx]}">${opt}</li>`
      )
      .join("");

    // i will clear the list and then insert the new list
    this._clear();
    this._quizOptionListEl.insertAdjacentHTML("afterbegin", innerMarkup);
  }

  _setTitle(value) {
    this._quizQuestionTitleEl.innerText = "";
    this._quizQuestionTitleEl.innerText = value;
  }

  _clear() {
    this._quizOptionListEl.innerText = "";
  }

  clickEventHandler(handler) {
    this._quizOptionListEl.addEventListener("click", (e) => {
      if (!e.target.classList.contains("quiz_option_list_item")) return;
      this._submitButton.classList.remove("hidden");

      const userChoiceEl = e.target;
      const userAnswer = e.target.dataset.result;

      let computerChoice = Array.from(
        document.querySelectorAll(".quiz_option_list_item")
      );

      console.log(computerChoice);

      computerChoice = computerChoice.filter(
        (el) => el.dataset.result == "true"
      )[0];

      if (userChoiceEl.dataset.result === "true") {
        userChoiceEl.classList.add("correct_answer");
      } else {
        userChoiceEl.classList.add("wrong_answer");
        computerChoice.classList.add("correct_answer");
      }

      // handle the model logic
      //
      handler(userAnswer);
    });
  }

  nextQUestionEvent(handler) {
    this._formEl.addEventListener("submit", (e) => {
      // prevent it from submittting
      e.preventDefault();

      const shouldDisplay = handler();
      // if should display is false, the if statement will be executed.
      if (shouldDisplay) this._submitButton.innerText = "Next";
    });
  }

  userPreferenceClickEvent(handler) {
    this._userPreferenceFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(this._userPreferenceFormEl);
      const dataObj = Object.fromEntries(data);
      this._mainEl.classList.add("hidden");
      this._quizContainerBodyEl
        .closest(".quiz_container")
        .classList.remove("hidden");
      handler(dataObj);
    });
  }

  // disable the click event to prevent the user from clicking again
  disableClickEvent() {
    this._quizOptionListEl.style.pointerEvents = "none";
  }

  enableClickEvent() {
    this._quizOptionListEl.style.pointerEvents = "auto";
  }

  _generateResultMarkup() {
    const message = `You scored ${this._data.userScore} out of ${this._data.totalScore}`;
    this._setTitle(message);
    this._clear();
    this._submitButton.innerText = "PlayAgain";
  }
}

export default new View();
