class Quiz {
	constructor(quizzes) {
		this.quizzes = quizzes;
		this.score = 0;
		this.currentActiveQuizIndex = 0;
	}

	incrementScore() {
		return ++this.score;
	}

	next() {
		if (this.currentActiveQuizIndex >= this.quizzes.length - 1) return;
		return ++this.currentActiveQuizIndex;
	}

	prev() {
		if (this.currentActiveQuizIndex <= 0) return;
		return --this.currentActiveQuizIndex;
	}

	isQuizOver() {
		if (this.quizzes.length === this.quizzes.filter((ques) => ques.isCompleted).length) {
			console.log("Game Over");
		}
	}

	getCurrentQuiz() {
		return this.quizzes[this.currentActiveQuizIndex];
	}

	render() {
		root.innerHTML = "";
		score.innerText = this.score;
		this.getCurrentQuiz().createUI();
		document.querySelector(".options").addEventListener("click", this.optionHandler.bind(this), { once: true });
	}

	optionHandler(e) {
		if (!e.target.classList.contains("option")) return;

		const options = document.querySelectorAll(".option");
		const selection = [...options].indexOf(e.target);
		const question = this.getCurrentQuiz();

		question.userAnswered = selection;
		question.isCompleted = true;

		if (question.isAnswerCorrect(selection)) {
			options[selection].classList.add("correct");
			score.innerText = ++this.score;
		} else {
			options[selection].classList.add("incorrect");
			options[question.correctAnswer].classList.add("correct");
		}
		console.log(question);
		localStorage.setItem("quizData", JSON.stringify(this.quizzes));
		this.isQuizOver();
	}
}

class Question {
	constructor(question, options, correctAnswer) {
		this.question = question;
		this.options = options;
		this.correctAnswer = correctAnswer;
		this.isCompleted = false;
		this.userAnswered = null;
	}

	isAnswerCorrect(index) {
		return this.correctAnswer === index;
	}

	createUI() {
		const p = document.createElement("p");
		p.innerText = this.question;
		const options = document.createElement("div");
		options.classList.add("options");
		const option = this.options.map((opt) => `<p class="option">${opt}</p>`).join("");
		options.innerHTML = option;
		root.append(p, options);
	}
}

const root = document.querySelector(".question");
const score = document.querySelector(".score");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const ques = questions.map((obj) => new Question(obj.question, obj.options, obj.correctAnswer));
const quizzer = new Quiz(ques);

quizzer.render();

prev.addEventListener("click", function () {
	quizzer.prev();
	quizzer.render();
});

next.addEventListener("click", function () {
	quizzer.next();
	quizzer.render();
});
