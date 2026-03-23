// utils.js

// Get kid's name from localStorage
function getKidName() {
    return localStorage.getItem('domhe_kid_name') || 'Campeón';
}

function showVictoryModal(gameName, scoreText = '') {
    const kidName = getKidName();

    // Generate the modal HTML dynamically if it doesn't exist
    let modal = document.getElementById('victoryModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'victoryModal';
        modal.className = 'victory-modal';
        modal.innerHTML = `
            <div class="victory-content">
                <div class="victory-icon"><i class="fas fa-crown"></i></div>
                <h2 id="victoryTitle">¡Felicidades!</h2>
                <p id="victoryBody">Has completado el juego.</p>
                <button id="downloadBadgeBtn" class="btn"><i class="fas fa-download"></i> Descargar Insignia</button>
                <a href="index.html" class="btn btn-secondary"><i class="fas fa-home"></i> Volver al Menú</a>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('downloadBadgeBtn').addEventListener('click', () => {
            generateAndDownloadBadge(gameName, kidName);
        });
    } else {
        // Update the download button click handler with current data
        const downloadBtn = document.getElementById('downloadBadgeBtn');
        downloadBtn.onclick = () => {
            generateAndDownloadBadge(gameName, kidName);
        };
    }

    document.getElementById('victoryTitle').innerText = `¡Felicidades, ${kidName}!`;
    document.getElementById('victoryBody').innerText = `Completaste el ${gameName} en DOMHE Kids. ${scoreText}`;

    modal.style.display = 'flex';
}

function generateAndDownloadBadge(gameName, kidName) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FFE5F0'; // light pink
    ctx.fillRect(0, 0, 600, 700);

    // Border
    ctx.strokeStyle = '#FF98B8';
    ctx.lineWidth = 15;
    ctx.strokeRect(15, 15, 570, 670);

    // Stars decoration at top
    ctx.fillStyle = '#FFD700';
    ctx.font = '30px Arial';
    ctx.fillText('⭐', 150, 60);
    ctx.fillText('⭐', 300, 45);
    ctx.fillText('⭐', 450, 60);

    // Text "¡Reto Completado!"
    ctx.fillStyle = '#E81A63';
    ctx.font = 'bold 38px "Fredoka One", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¡RETO COMPLETADO!', 300, 110);

    // Kid's name - personalized
    ctx.fillStyle = '#793AB8';
    ctx.font = 'bold 42px "Fredoka One", sans-serif';
    ctx.fillText(kidName, 300, 170);

    // Game text
    ctx.fillStyle = '#73003A';
    ctx.font = '26px Arial';
    ctx.fillText(`Ganador del: ${gameName}`, 300, 220);

    // Load watermark image
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
        // Draw centered logo
        ctx.drawImage(img, 200, 260, 200, 200);

        // Date
        const today = new Date();
        const dateStr = today.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
        ctx.fillStyle = '#666';
        ctx.font = '20px Arial';
        ctx.fillText(dateStr, 300, 500);

        ctx.fillStyle = '#FF98B8';
        ctx.font = 'italic 24px Arial';
        ctx.fillText('DOMHE Nanny | Kids Zone', 300, 580);
        ctx.fillText('Cuida lo que más amas', 300, 620);

        // Trophy decoration
        ctx.font = '40px Arial';
        ctx.fillText('🏆', 300, 660);

        // Download
        const link = document.createElement('a');
        link.download = `Insignia-${kidName}-${gameName.replace(/ /g,'-')}.jpg`;
        // Convert to jpg to make it lightweight
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    };
    img.onerror = () => {
        // Fallback if image fails
        ctx.fillStyle = '#FF98B8';
        ctx.font = 'italic 24px Arial';
        ctx.fillText('DOMHE Nanny | Kids Zone', 300, 500);
        ctx.fillText('Cuida lo que más amas', 300, 540);

        const link = document.createElement('a');
        link.download = `Insignia-${kidName}-${gameName.replace(/ /g,'-')}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    };
    img.src = 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1753327639/WhatsApp_Image_2025-07-23_at_19.59.09_yd4dtt.png';
}
