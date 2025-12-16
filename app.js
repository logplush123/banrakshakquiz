

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array

function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i = 0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}
// set question number and question and optiona
function getNewQuestion(){
    // set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //set the positin of 'questionIndex' from the availableQuestion Array;
    const index1= availableQuestions.indexOf(questionIndex);
    //remove the 'question index'from the availableQuestion Array; so that the question does not repeted
    availableQuestions.splice(index1,1);
    
    // set options 
    // get the length of option
    const optionLen = currentQuestion.options.length
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    //create options in html
    for(let i=0; i<optionLen; i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optionIndex' from the availableOptions array
        const index2 = availableOptions.indexOf(optionIndex);
        // remove the 'optionIndex' from the availableOption array  , so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }

    questionCounter++
}
// get the result of current attempt question 
function getResult(Element){
    const id = parseInt(Element.id);
    // get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        // set the green color to the correct option
        Element.classList.add("correct");
        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;

    }
    else{
        // set the red color to the wrong option
        Element.classList.add("wrong");

        // add the indicator to wrong mark
        updateAnswerIndicator("wrong");
        
        // if the answered is incorrect the show the correct option by adding green color the coller option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }

    }
    attempt++;
    unclickableOptions();
}
// make all the option unclickable once the user select a option (RESTRACT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");

    }
}

function answerIndicator(){
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}
function quizOver(){
    // hide quiz quizBox
    quizBox.classList.add("hide");
    // show result box 
    resultBox.classList.remove("hide");
    quizResult();
}
// get the quiz Result 
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const Persantage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".Persantage").innerHTML = Persantage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;

}

function tryAgainQuiz(){
    // hide the result box
    resultBox.classList.add("hide");
    //show the quia box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
function goToHome(){
    // hide result box 
    resultBox.classList.add("hide");
    // show home bos
    homeBox.classList.remove("hide");
    resetQuiz();
}
// ### staring point ###
function startQuiz(){
    // hide home box 
    homeBox.classList.add("hide");
    // show quiz box
    quizBox.classList.remove("hide")

    // first i will set all questions in availableQuestion Array
    setAvailableQuestions();
    //second we will call getNewQuestion();  function
    getNewQuestion();
//to creat indicator of answer
    answerIndicator();

}





window.onload = function (){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
