// utils.js

function showVictoryModal(gameName, scoreText = '') {
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
            generateAndDownloadBadge(gameName);
        });
    }
    
    document.getElementById('victoryBody').innerText = `Completaste el ${gameName} en DOMHE Kids. ${scoreText}`;
    modal.style.display = 'flex';
}

function generateAndDownloadBadge(gameName) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FFE5F0'; // light pink
    ctx.fillRect(0, 0, 600, 600);

    // Border
    ctx.strokeStyle = '#FF98B8';
    ctx.lineWidth = 15;
    ctx.strokeRect(15, 15, 570, 570);

    // Text "¡Reto Completado!"
    ctx.fillStyle = '#E81A63';
    ctx.font = 'bold 40px "Fredoka One", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¡RETO COMPLETADO!', 300, 100);

    // Game text
    ctx.fillStyle = '#73003A';
    ctx.font = '30px Arial';
    ctx.fillText(`Ganador del: ${gameName}`, 300, 160);

    // Load watermark image
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
        // Draw centered logo
        ctx.drawImage(img, 200, 220, 200, 200);

        ctx.fillStyle = '#FF98B8';
        ctx.font = 'italic 24px Arial';
        ctx.fillText('DOMHE Nanny | Kids Zone', 300, 500);
        ctx.fillText('Cuida lo que más amas', 300, 540);

        // Download
        const link = document.createElement('a');
        link.download = `Insignia-DOMHE-${gameName.replace(' ','-')}.jpg`;
        // Convert to jpg to make it lightweight
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    };
    img.src = 'https://res.cloudinary.com/dwoau0ajc/image/upload/v1753327639/WhatsApp_Image_2025-07-23_at_19.59.09_yd4dtt.png';
}
