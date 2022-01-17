// Questions stored in one array
const quizQuestions = [
    {
        question: "Commonly used data types DO Not Include",
        answers: {
            1: "1. strings",
            2: "2. booleans",
            3: "3. alerts",
            4: "4. numbers",
        },
        answer: 3
    },    
    {
        question: "The condition in an if/else statement is enclosed with ________.",
        answers: {
            1: "1. quotes",
            2: "2. curly brackets",
            3: "3. parenthesis",
            4: "4. square brackets",
        },
        answer: 3
    },    
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answers: {
            1: "1. numbers and strings",
            2: "2. other arrays",
            3: "3. booleans",
            4: "4. all of the above",
        },
        answer: 4
    },    
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: {
            1: "1. quotes",
            2: "2. curly brackets",
            3: "3. commas",
            4: "4. parenthesis",
        },
        answer: 1
    },    
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            1: "1. JavaScript",
            2: "2. console.log",
            3: "3. for loops",
            4: "4. terminal/bash",
        },
        answer: 2
    }
]
// Query selectors
const bodyEl = document.querySelector("body");
const mainContentEl = document.querySelector(".page-content");
const buttonEl = document.querySelector("#start-game");

// global variables
let questionCounter = 0;
let currentQuestion = quizQuestions[questionCounter];
let acceptingAnswers = true;
let score = 76;
let availableQuestions = [];
let timing;

// Starting game with Start Quiz button, triggering timer and render functions
let start = buttonEl.addEventListener("click", function() {
    timer();
    render();
})

// function for rendering the questions pages
function render() {
    mainContentEl.innerHTML = `
        <h2>${quizQuestions[questionCounter].question}</h2>
    `
    for (const key in quizQuestions[questionCounter].answers) {
        mainContentEl.innerHTML += `
            <div>
                <button class="button-styles" onclick="nextQuestion(${key})">${quizQuestions[questionCounter].answers[key]}</button>
            </div>
        `;
    }
}

// function to scroll the questions
function nextQuestion(key) {
    if(key != quizQuestions[questionCounter].answer) {
        score = score - 10;
    }
    questionCounter++;
    
    if(questionCounter === quizQuestions.length) {
        finishQuestions();
    } else{
        render();
    }
}

// timer function
function timer() {
        timing = setInterval(function(){
            score--;
            document.getElementById("timer").innerHTML = (score + " seconds");
            if (score < 0) {
                clearInterval(timing);
                alert("Time is over. You lost");
                document.location.reload();
            }
    }, 1000);
}

// function to show user's score
function finishQuestions() {
    mainContentEl.innerHTML = `
        <h2>All done!</h2>
        <p>Your final score is ${score}</p>
        <form>
        <label for="initials">Enter initials</label>
        <input type="text" id="initials">
        <button class="button-styles" onclick="saveResults()">Submit</button>
        </form>
    `
    clearInterval(timing);
}

// saving results to the local storage
function saveResults() {
    let userInitials = document.getElementById("initials");
    if(userInitials.value.length < 2) {
        alert("Please, enter your initials");
    } else {
        localStorage.setItem(userInitials.value.toUpperCase(), score);
        showUserScores();
    }
}

// retrieving and printing results from local storage
function showUserScores() {
    let items = [];
    for(let i = 0; i < Object.keys(localStorage).length; i++) {
        let key = Object.keys(localStorage)[i];
        items.push({ name: key, score: localStorage[key] })
    }
    
    // sorting the scores from high to low
    items = items.sort((a,b) => +b.score - +a.score);

    // table created to show the results as a list
    let table = '<table>';

    items.forEach(item => {
        table += `
            <tr><td>${item.name} </td><td> ${item.score}</td></tr>
        `
    })
    table += '</table>'

    mainContentEl.innerHTML = `
        <h2>High scores</h2>
        <div id="getResults">${table}</div>
        <button class="button-styles" id="home-page">Go back</button>
        <button class="button-styles" onclick="clearStorage()">Clear high scores</button>
    `

    // starting the quiz from the main page
    let home = document.getElementById("home-page");
        home.addEventListener("click", function() {
            document.location.reload();
        })
}

// deleting local storage key:value pairs by clicking 'clear high scores' button
function clearStorage() {
    localStorage.clear();
    showUserScores();
}