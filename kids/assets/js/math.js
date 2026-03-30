// math.js — DOMHE Kids Zone

const TOTAL_BEARS = 10;

let correctCount = 0;
let wrongCount   = 0;
let currentQ     = {};
let locked       = false; // evita doble respuesta mientras se muestra feedback

// ─── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    buildBears();
    nextQuestion();

    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('mathInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    document.getElementById('resetBtn').addEventListener('click', resetGame);
});

// ─── Construir barra de ositos ────────────────────────────────────────────────
function buildBears() {
    const track = document.getElementById('bearsTrack');
    track.innerHTML = '';
    for (let i = 0; i < TOTAL_BEARS; i++) {
        const bear = document.createElement('span');
        bear.className = 'bear-unit';
        bear.textContent = '🐻';
        bear.dataset.index = i;
        track.appendChild(bear);
    }
}

// ─── Generar pregunta ────────────────────────────────────────────────────────
function generateQuestion() {
    const ops = ['+', '-', '×'];
    // Más probabilidad de suma en los primeros 3, mezcla total después
    const weights = correctCount < 3
        ? ['+', '+', '+', '-', '×']
        : ops;
    const op = weights[Math.floor(Math.random() * weights.length)];

    let a, b, answer;

    if (op === '+') {
        a = rand(1, 15);
        b = rand(1, 15);
        answer = a + b;
    } else if (op === '-') {
        a = rand(5, 20);
        b = rand(1, a);          // resultado siempre ≥ 0
        answer = a - b;
    } else {                     // ×
        a = rand(2, 10);
        b = rand(2, 10);
        answer = a * b;
    }

    return { a, b, op, answer };
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── Mostrar pregunta ────────────────────────────────────────────────────────
function nextQuestion() {
    currentQ = generateQuestion();
    locked   = false;

    document.getElementById('opA').textContent    = currentQ.a;
    document.getElementById('opSign').textContent = currentQ.op;
    document.getElementById('opB').textContent    = currentQ.b;
    document.getElementById('mathFeedback').className = 'math-feedback';
    document.getElementById('mathFeedback').innerHTML = '';
    document.getElementById('mathCard').classList.remove('shake');

    const input = document.getElementById('mathInput');
    input.value = '';
    setTimeout(() => input.focus(), 100);
}

// ─── Comprobar respuesta ─────────────────────────────────────────────────────
function checkAnswer() {
    if (locked) return;

    const input = document.getElementById('mathInput');
    const val   = parseInt(input.value, 10);

    if (isNaN(val)) {
        pulseInput();
        return;
    }

    locked = true;

    if (val === currentQ.answer) {
        handleCorrect();
    } else {
        handleWrong();
    }
}

function handleCorrect() {
    correctCount++;
    updateBears();
    updateScore();
    showFeedback(true);

    if (correctCount >= TOTAL_BEARS) {
        setTimeout(() => {
            showVictoryModal('Juego de Matemáticas', `¡Respondiste ${TOTAL_BEARS} preguntas correctamente! 🎉`);
        }, 900);
    } else {
        setTimeout(nextQuestion, 1100);
    }
}

function handleWrong() {
    wrongCount++;
    updateScore();
    showFeedback(false);

    // Sacude la tarjeta
    const card = document.getElementById('mathCard');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);

    setTimeout(nextQuestion, 2000);
}

// ─── Actualizar barra de ositos ───────────────────────────────────────────────
function updateBears() {
    document.querySelectorAll('.bear-unit').forEach((bear, i) => {
        if (i < correctCount) bear.classList.add('filled');
    });
    document.getElementById('bearsLabel').textContent = `${correctCount} / ${TOTAL_BEARS} correctas`;
}

// ─── Marcador ────────────────────────────────────────────────────────────────
function updateScore() {
    document.getElementById('scoreCorrect').textContent = correctCount;
    document.getElementById('scoreWrong').textContent   = wrongCount;
}

// ─── Feedback ────────────────────────────────────────────────────────────────
function showFeedback(isCorrect) {
    const fb = document.getElementById('mathFeedback');
    if (isCorrect) {
        const msgs = ['¡Excelente! 🎉', '¡Muy bien! 🌟', '¡Correcto! 🎊', '¡Genial! ✨', '¡Así se hace! 🏆'];
        fb.innerHTML = msgs[Math.floor(Math.random() * msgs.length)];
        fb.className = 'math-feedback feedback-correct show';
    } else {
        fb.innerHTML = `¡Casi! La respuesta era <strong>${currentQ.answer}</strong> 💪`;
        fb.className = 'math-feedback feedback-wrong show';
    }
}

function pulseInput() {
    const input = document.getElementById('mathInput');
    input.classList.add('pulse');
    setTimeout(() => input.classList.remove('pulse'), 400);
}

// ─── Reset ───────────────────────────────────────────────────────────────────
function resetGame() {
    correctCount = 0;
    wrongCount   = 0;
    locked       = false;
    buildBears();
    updateScore();
    document.getElementById('bearsLabel').textContent = '0 / 10 correctas';
    nextQuestion();
}
