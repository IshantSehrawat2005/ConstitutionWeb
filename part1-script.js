document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('feedback');
    questionContainerElement.after(feedbackElement);

    let shuffledQuestions, currentQuestionIndex, score;

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', startQuiz);

    function startQuiz() {
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        score = 0;
        questionContainerElement.classList.remove('hide');
        answerButtonsElement.classList.remove('hide');
        scoreContainer.classList.add('hide');
        feedbackElement.textContent = '';
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion(shuffledQuestions[currentQuestionIndex]);
        } else {
            showScore();
        }
    }

    function showQuestion(question) {
        questionContainerElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        feedbackElement.textContent = '';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        setStatusClass(selectedButton, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
            button.disabled = true;
        });
        if (correct) {
            score++;
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'green';
        } else {
            feedbackElement.textContent = 'Wrong answer. Try again!';
            feedbackElement.style.color = 'red';
        }
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showScore() {
        questionContainerElement.classList.add('hide');
        answerButtonsElement.classList.add('hide');
        nextButton.classList.add('hide');
        scoreContainer.classList.remove('hide');
        scoreElement.innerText = `${score} out of ${shuffledQuestions.length}`;
    }

    const questions = [
        {
            question: 'What is the official name of India according to the Constitution?',
            answers: [
                { text: 'India', correct: false },
                { text: 'Bharat', correct: false },
                { text: 'Hindustan', correct: false },
                { text: 'India, that is Bharat', correct: true }
            ]
        },
        {
            question: 'Who has the power to form new States in India?',
            answers: [
                { text: 'President', correct: false },
                { text: 'Prime Minister', correct: false },
                { text: 'Parliament', correct: true },
                { text: 'Supreme Court', correct: false }
            ]
        },
        {
            question: 'How many Union Territories are there in India as of 2023?',
            answers: [
                { text: '6', correct: false },
                { text: '7', correct: false },
                { text: '8', correct: true },
                { text: '9', correct: false }
            ]
        },
        {
            question: 'Which article of the Constitution deals with the admission or establishment of new States?',
            answers: [
                { text: 'Article 1', correct: false },
                { text: 'Article 2', correct: false },
                { text: 'Article 3', correct: true },
                { text: 'Article 4', correct: false }
            ]
        },
        {
            question: 'What is the southernmost point of Indian territory called?',
            answers: [
                { text: 'Kanyakumari', correct: false },
                { text: 'Indira Point', correct: true },
                { text: 'Port Blair', correct: false },
                { text: 'Lakshadweep', correct: false }
            ]
        },
        {
            question: 'Which of the following is NOT a Union Territory of India?',
            answers: [
                { text: 'Ladakh', correct: false },
                { text: 'Puducherry', correct: false },
                { text: 'Goa', correct: true },
                { text: 'Andaman and Nicobar Islands', correct: false }
            ]
        },
        {
            question: 'Which article of the Constitution provides for the formation of new States and alteration of areas, boundaries or names of existing States?',
            answers: [
                { text: 'Article 1', correct: false },
                { text: 'Article 2', correct: false },
                { text: 'Article 3', correct: true },
                { text: 'Article 4', correct: false }
            ]
        },
        {
            question: 'What is the term used for the division of powers between the Centre and the States?',
            answers: [
                { text: 'Unitary system', correct: false },
                { text: 'Federal system', correct: true },
                { text: 'Presidential system', correct: false },
                { text: 'Parliamentary system', correct: false }
            ]
        }
    ];
});