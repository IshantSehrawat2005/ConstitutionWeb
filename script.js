document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Quiz functionality
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');

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
        scoreContainer.classList.add('hide');
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
        questionElement.innerText = question.question;
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
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (correct) {
            score++;
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
        scoreContainer.classList.remove('hide');
        scoreElement.innerText = `${score} out of ${shuffledQuestions.length}`;
    }

    const questions = [
        {
            question: 'When was the Constitution of India adopted?',
            answers: [
                { text: '26 January 1950', correct: false },
                { text: '26 November 1949', correct: true },
                { text: '15 August 1947', correct: false },
                { text: '2 October 1948', correct: false }
            ]
        },
        {
            question: 'Who is known as the "Father of the Indian Constitution"?',
            answers: [
                { text: 'Mahatma Gandhi', correct: false },
                { text: 'Jawaharlal Nehru', correct: false },
                { text: 'B.R. Ambedkar', correct: true },
                { text: 'Sardar Patel', correct: false }
            ]
        },
        {
            question: 'How many fundamental rights are guaranteed by the Indian Constitution?',
            answers: [
                { text: '5', correct: false },
                { text: '6', correct: true },
                { text: '7', correct: false },
                { text: '8', correct: false }
            ]
        },
        {
            question: 'Which part of the Indian Constitution deals with Fundamental Rights?',
            answers: [
                { text: 'Part II', correct: false },
                { text: 'Part III', correct: true },
                { text: 'Part IV', correct: false },
                { text: 'Part V', correct: false }
            ]
        },
        {
            question: 'What is the official name of India as per the Constitution?',
            answers: [
                { text: 'India', correct: false },
                { text: 'Bharat', correct: false },
                { text: 'Hindustan', correct: false },
                { text: 'India, that is Bharat', correct: true }
            ]
        }
    ];
});