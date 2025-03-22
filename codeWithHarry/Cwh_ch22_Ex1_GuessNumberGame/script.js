const winner = document.getElementById("winner");
const guessNum = document.getElementById("guess_num");
const guessCount = document.getElementById("guess_count");
const point = document.getElementById("Points");
const startGame = document.getElementById("start_btn");


function guessRandNumber () {
    let guess;
    let count = 0;
    const randomNum = Math.floor(Math.random() * 100 + 1);

    do {
        guess = Number.parseInt(prompt("Enter 1 to 100 any Number:"));
        guessNum.textContent = `Your Guess Number is: ${guess}`;

        if (isNaN(guess)) {
            alert("Plz enter valid Number:");
            continue;
        } else if (guess < 1 || guess > 100) {
            alert("Plz enter btwn 1 to 100.");
            continue;
        }

        if (guess < randomNum) {
            alert("Too low! Try again.");
        } else if (guess > randomNum) {
            alert("Too high! Try again.");
        }

        count++;
        guessCount.textContent = `Your Guess Count: ${count}`
    } while (guess !== randomNum);

    point.textContent = `Your Points is: ${100 - count}`;
    winner.textContent = `Congratulations! You Win.`
}


startGame.addEventListener('click', () => {
    guessRandNumber();
});
