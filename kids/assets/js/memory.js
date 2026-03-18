// memory.js
const icons = ['🧸', '🍼', '🎨', '🧩', '🎈', '⭐', '🧸', '🍼', '🎨', '🧩', '🎈', '⭐'];
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;

const grid = document.getElementById('memoryGrid');

function initGame() {
    matches = 0;
    grid.innerHTML = '';
    
    // Shuffle
    icons.sort(() => 0.5 - Math.random());

    icons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.icon = icon;
        
        card.innerHTML = `
            <div class="front">?</div>
            <div class="back">${icon}</div>
        `;
        
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === (icons.length / 2)) {
            setTimeout(() => {
                showVictoryModal('Memorama');
            }, 600);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

initGame();
