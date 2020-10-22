class User {
	constructor(name, score = 0) {
		this.name = name;
		this.score = score;
	}

	increaseScore() {
		return ++this.score;
	}

	decreasedScore() {
		return --this.score;
	}
}

class PaidUser extends User {
	constructor(name, score = 0, balance = 0) {
		super(name, score);
		this.balance = balance;
	}

	increaseBalance() {
		return --this.balance;
	}
}
