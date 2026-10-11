// ============================================
// 1. SELECT HTML ELEMENTS
// ============================================

const landingScreen = document.querySelector(".landing-screen");
const gameScreen = document.querySelector(".game-screen");
const startButton = document.querySelector(".start-button");

const questionNumber = document.querySelector("#question-number");
const scoreDisplay = document.querySelector("#score");
const questionTitle = document.querySelector(".question-text");
const codeBlock = document.querySelector(".question-card pre code");
const answerOptions = document.querySelector(".answer-options");

// ============================================
// 2. GAME VARIABLES
// ============================================

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// ============================================
// 3. START THE GAME
// ============================================

startButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    score = 0;

    landingScreen.style.display = "none";
    gameScreen.style.display = "block";

    showQuestion();
});

// ============================================
// 4. DISPLAY A QUESTION
// ============================================

function showQuestion() {
    // Check whether all questions are completed.
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    answered = false;

    const currentQuestion = questions[currentQuestionIndex];

    // Update question text and code.
    questionNumber.textContent = currentQuestionIndex + 1;
    scoreDisplay.textContent = score;

    questionTitle.textContent = currentQuestion.question;
    codeBlock.textContent = currentQuestion.code;

    // Remove the previous answer options.
    answerOptions.innerHTML = "";

    // Create a button for every answer option.
    currentQuestion.options.forEach(function (option) {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(option, button);
        });

        answerOptions.appendChild(button);
    });
}

// ============================================
// 5. CHECK THE SELECTED ANSWER
// ============================================

function checkAnswer(selectedAnswer, selectedButton) {
    // Prevent answering the same question multiple times.
    if (answered) {
        return;
    }

    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const allButtons = answerOptions.querySelectorAll(".answer-button");

    const isCorrect = selectedAnswer === currentQuestion.answer;

    // Disable all answer buttons after selection.
    allButtons.forEach(function (button) {
        button.disabled = true;

        // Highlight the correct answer.
        if (button.textContent === currentQuestion.answer) {
            button.style.backgroundColor = "#166534";
            button.style.borderColor = "#22c55e";
        }
    });

    if (isCorrect) {
        score += 10;

        selectedButton.style.backgroundColor = "#166534";
        selectedButton.style.borderColor = "#22c55e";
    } else {
        selectedButton.style.backgroundColor = "#991b1b";
        selectedButton.style.borderColor = "#ef4444";
    }

    scoreDisplay.textContent = score;

    // ============================================
    // 6. SHOW ANSWER FEEDBACK
    // ============================================

    const feedback = document.createElement("div");

    feedback.className = "answer-feedback";

    if (isCorrect) {
        feedback.innerHTML =
            "<strong>✅ Correct! +10 points</strong><br>" +
            currentQuestion.explanation;
    } else {
        feedback.innerHTML =
            "<strong>❌ Not quite!</strong><br>" +
            "Correct answer: " +
            currentQuestion.answer +
            "<br>" +
            currentQuestion.explanation;
    }

    answerOptions.appendChild(feedback);

    // ============================================
    // 7. CREATE THE NEXT BUTTON
    // ============================================

    const nextButton = document.createElement("button");

    nextButton.className = "next-button";

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "VIEW RESULTS →";
    } else {
        nextButton.textContent = "NEXT QUESTION →";
    }

    nextButton.addEventListener("click", function () {
        currentQuestionIndex++;
        showQuestion();
    });

    answerOptions.appendChild(nextButton);
}

// ============================================
// 8. DISPLAY FINAL RESULTS
// ============================================

function showResults() {
    // Clear the previous question card.
    gameScreen.innerHTML = "";

    const resultsCard = document.createElement("div");
    resultsCard.className = "question-card";

    const heading = document.createElement("h2");
    heading.textContent = "🏆 Game Completed!";

    const scoreResult = document.createElement("p");
    scoreResult.textContent =
        "Your score: " + score + " / " + (questions.length * 10);

    const percentage = Math.round(
        (score / (questions.length * 10)) * 100
    );

    const message = document.createElement("p");

    if (percentage === 100) {
        message.textContent = "Perfect score! You're a coding champion! ⚡";
    } else if (percentage >= 60) {
        message.textContent = "Great job! Keep sharpening your coding skills!";
    } else {
        message.textContent = "Good effort! Practice makes progress. Try again!";
    }

    const restartButton = document.createElement("button");

    restartButton.className = "next-button";
    restartButton.textContent = "PLAY AGAIN ↻";

    restartButton.addEventListener("click", function () {
        location.reload();
    });

    resultsCard.appendChild(heading);
    resultsCard.appendChild(scoreResult);
    resultsCard.appendChild(message);
    resultsCard.appendChild(restartButton);

    gameScreen.appendChild(resultsCard);
}
