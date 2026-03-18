/* team_puzzle.js */

const nanniesData = [
    {
        id: 1,
        name: "Val",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1753299129/Copia_de_IMG_5735_netcy4.jpg",
        traits: "99% Cariñosa, 99% Preventiva, 100% Divertida",
        ages: "Lactante, Toddler, Preescolar y Escolar",
        activities: "Rutinas, Alimentación, Baño, Apoyo en tareas y Juegos interactivos",
        education: "Químico Farmacobiólogo en C.U.C.E.I."
    },
    {
        id: 2,
        name: "Andy",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1753299128/Copia_de_IMG_5751_ylq2zi.jpg",
        traits: "100% Dinámica, 99% Paciente, 99% Alegre",
        ages: "Lactante, Toddler, Preescolar",
        activities: "Desarrollo motriz, Cuentacuentos, Juegos al aire libre",
        education: "Lic. en Educación Preescolar"
    },
    {
        id: 3,
        name: "Gaby",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1753299130/Copia_de_IMG_5668_aq6shb.jpg",
        traits: "99% Observadora, 100% Protectora, 99% Creativa",
        ages: "Toddler, Preescolar y Escolar",
        activities: "Manualidades, Refuerzo escolar, Rutinas de sueño",
        education: "Lic. en Psicología Infantil"
    },
    {
        id: 4,
        name: "Fer",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1753299129/IMG_5838_g79nzo.png",
        traits: "100% Proactiva, 99% Energética, 99% Cuidada",
        ages: "Todas las edades",
        activities: "Organización, Primeros auxilios, Nutrición",
        education: "Enfermería Pediátrica"
    },
    {
        id: 5,
        name: "Caro",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1753299657/Copia_de_IMG_5700_ee5ocj.jpg",
        traits: "99% Empática, 100% Responsable, 99% Cálida",
        ages: "Escolar y Preescolar",
        activities: "Idiomas (Inglés), Apoyo emocional, Juegos didácticos",
        education: "Lic. en Lenguas Modernas"
    },
    {
        id: 6,
        name: "Sofi",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1753299127/IMG_7886_pcsyht.jpg",
        traits: "100% Segura, 99% Confiable, 100% Ternura",
        ages: "Lactante",
        activities: "Estimulación temprana, Masajes, Alimentación complementaria",
        education: "Estimulación Temprana Certificada"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('puzzleGrid');
    const modal = document.getElementById('nannyModal');
    const closeBtn = document.getElementById('closeModalBtn');

    // Populate the puzzle
    nanniesData.forEach((nanny, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        // Add random jigsaw slight styles (1, 2, or 3) just for a slightly quirky look if enabled in css
        piece.classList.add(`jig-${(index % 3) + 1}`);

        piece.innerHTML = `
            <img src="${nanny.photo}" alt="${nanny.name}">
            <div class="puzzle-hint"><i class="fas fa-hand-pointer"></i><br>¡Tócame!</div>
        `;

        piece.addEventListener('click', () => {
            // Color it permanently
            piece.classList.add('colored');
            piece.classList.add('colored-permanent');
            
            // Wait a tiny bit then open modal
            setTimeout(() => {
                openNannyModal(nanny);
            }, 400);
        });

        if(grid) grid.appendChild(piece);
    });

    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close on outside click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

function openNannyModal(nanny) {
    document.getElementById('modalPhoto').src = nanny.photo;
    document.getElementById('modalName').textContent = nanny.name;
    document.getElementById('modalTraits').textContent = nanny.traits;
    document.getElementById('modalAges').textContent = nanny.ages;
    document.getElementById('modalActivities').textContent = nanny.activities;
    document.getElementById('modalEdu').textContent = nanny.education;
    
    document.getElementById('nannyModal').classList.add('active');
}
