// puzzle.js
const board = document.getElementById('jigsawBoard');
const gridSize = 3;
let pieces = [];
let selectedPiece = null;

function initPuzzle() {
    board.innerHTML = '';
    pieces = [];
    
    // Create correct ordered pieces
    for(let r=0; r<gridSize; r++) {
        for(let c=0; c<gridSize; c++) {
            pieces.push({
                correctRow: r,
                correctCol: c,
                currentRow: r,
                currentCol: c,
                id: r * gridSize + c
            });
        }
    }
    
    // Shuffle pieces (not perfect, but enough to scatter them)
    // Make sure it is solvable (swap puzzle always solvable)
    pieces.sort(() => Math.random() - 0.5);
    
    // Update current rows and cols based on shuffled index
    pieces.forEach((p, idx) => {
        p.currentRow = Math.floor(idx / gridSize);
        p.currentCol = idx % gridSize;
    });

    renderPieces();
}

function renderPieces() {
    board.innerHTML = '';
    
    // Sort pieces by current position to render top left to bottom right
    const sorted = [...pieces].sort((a,b) => (a.currentRow * gridSize + a.currentCol) - (b.currentRow * gridSize + b.currentCol));

    sorted.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'jigsaw-piece';
        
        // The background position must match the CORRECT row/col
        // Each piece is 100x100 pixels in a 300x300 board
        const bgPosX = -(p.correctCol * 100) + 'px';
        const bgPosY = -(p.correctRow * 100) + 'px';
        div.style.backgroundPosition = `${bgPosX} ${bgPosY}`;
        
        div.dataset.id = p.id;
        
        div.addEventListener('click', () => handlePieceClick(p, div));
        board.appendChild(div);
    });
}

function handlePieceClick(piece, element) {
    if(!selectedPiece) {
        selectedPiece = piece;
        element.style.opacity = '0.5';
        element.style.transform = 'scale(0.9)';
    } else {
        // Swap selected with current
        const tempRow = selectedPiece.currentRow;
        const tempCol = selectedPiece.currentCol;
        
        selectedPiece.currentRow = piece.currentRow;
        selectedPiece.currentCol = piece.currentCol;
        
        piece.currentRow = tempRow;
        piece.currentCol = tempCol;
        
        selectedPiece = null;
        renderPieces();
        
        if(checkWin()) {
            setTimeout(() => {
                showVictoryModal('Rompecabezas Infantíl');
            }, 500);
        }
    }
}

function checkWin() {
    return pieces.every(p => p.currentRow === p.correctRow && p.currentCol === p.correctCol);
}

document.getElementById('resetPuzzle').addEventListener('click', initPuzzle);

initPuzzle();
