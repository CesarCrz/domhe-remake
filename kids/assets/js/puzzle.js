// puzzle.js
const board = document.getElementById('jigsawBoard');
const gridSize = 3;
let pieces = [];
let selectedPiece = null;

// Array de imágenes del rompecabezas (agrégalas aquí)
const puzzleImages = [
    {
        url: 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1753327639/WhatsApp_Image_2025-07-23_at_19.59.09_yd4dtt.png',
        name: 'Osito DOMHE'
    },
    {
        url: 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1774297954/pato_cyjvmu.jpg',
        name: 'Pato'
    },
    {
        url: 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1774297954/tortuga_kidl7a.jpg',
        name: 'Tortuga'
    },
    {
        url: 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1774297954/conejo_r3hoti.jpg',
        name: 'Conejo'
    },
    {
        url: 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1774297954/cocodrilo_o1qmye.jpg',
        name: 'Cocodrilo'
    },
    {
        url: 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1774297954/gato_ihngey.jpg',
        name: 'Gato'
    }
    // Agrega más imágenes aquí:
    // {
    //     url: 'URL_DE_IMAGEN_2',
    //     name: 'Nombre Imagen 2'
    // },
    // {
    //     url: 'URL_DE_IMAGEN_3',
    //     name: 'Nombre Imagen 3'
    // }
];

let currentImageIndex = 0;

function initPuzzle() {
    board.innerHTML = '';
    pieces = [];

    // Create correct ordered pieces
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
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

    // Obtener imagen actual
    const currentImage = puzzleImages[currentImageIndex % puzzleImages.length];

    // Sort pieces by current position to render top left to bottom right
    const sorted = [...pieces].sort((a, b) => (a.currentRow * gridSize + a.currentCol) - (b.currentRow * gridSize + b.currentCol));

    sorted.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'jigsaw-piece';

        // Usar imagen actual
        div.style.backgroundImage = `url('${currentImage.url}')`;
        div.style.backgroundSize = '300px 300px';

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
    if (!selectedPiece) {
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

        if (checkWin()) {
            setTimeout(() => {
                // Avanzar automáticamente al siguiente rompecabezas sin mostrar insignia
                nextPuzzleImage();
            }, 500);
        }
    }
}

function checkWin() {
    return pieces.every(p => p.currentRow === p.correctRow && p.currentCol === p.correctCol);
}

// Función para avanzar al siguiente rompecabezas
function nextPuzzleImage() {
    currentImageIndex++;
    // Si llegamos al final, volver al inicio (ciclo)
    if (currentImageIndex >= puzzleImages.length) {
        currentImageIndex = 0;
    }
    initPuzzle();
}

document.getElementById('resetPuzzle').addEventListener('click', initPuzzle);

initPuzzle();
