/* team_puzzle.js */

const nanniesData = [
    {
        id: 1,
        name: "Val",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1774489775/WhatsApp_Image_2026-03-25_at_19.47.30_ovggwo.jpg",
        traits: "Activa, Responsable y Paciente",
        ages: "Recién nacidos a 10 años",
        activities: "Primeros Auxilios, Cambios de pañales, Baño a RN, Actividades recreativas, Apoyo en tareas escolares",
        education: "Químico Farmacobiólogo en C.U.C.E.I.",
        references: [
            { family: "Familia Martínez", stars: 5, text: "Val fue increíble con nuestro bebé de 8 meses. Muy profesional, cariñosa y siempre pendiente de cada detalle." },
            { family: "Familia Hernández", stars: 5, text: "Nuestra hija la adora. Es muy divertida y al mismo tiempo muy responsable. La recomendamos sin dudar." },
            { family: "Familia Ríos", stars: 5, text: "Desde el primer día nos dio mucha confianza. Val conoce perfectamente las rutinas y los niños la quieren mucho." }
        ]
    },
    {
        id: 2,
        name: "Lulú Hernández",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1774488719/WhatsApp_Image_2026-03-25_at_19.25.19_lhch42.jpg",
        traits: "Responsable, Activa con los peques, Gran experiencia profesional",
        ages: "Recién nacidos a 12 años",
        activities: "Cambio de pañales, Baño a RN, Actividades recreativas y lúdicas, Apoyo en tareas escolares",
        education: "Lic. en Educación Preescolar",
        references: [
            { family: "Familia Ramírez", stars: 5, text: "Lulú es súper dinámica y creativa. Nuestro hijo siempre llegaba feliz y emocionado contando lo que habían hecho." },
            { family: "Familia Torres", stars: 5, text: "Muy puntual, responsable y cariñosa. Lulú se ganó la confianza de toda la familia desde la primera semana." },
            { family: "Familia Salazar", stars: 5, text: "Tiene una energía increíble para jugar con los niños. Su formación en educación preescolar se nota en cada actividad." }
        ]
    },
    {
        id: 3,
        name: "Mady",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1774489369/WhatsApp_Image_2026-03-25_at_19.36.27_hesdhr.jpg",
        traits: "Responsabilidad, Creatividad y Paciencia",
        ages: "Recién nacidos a 10 años",
        activities: "Primeros auxilios, Cambio de pañales, Baño a RN",
        education: "Lic. Médico Cirujano y Partero",
        references: [
            { family: "Mamá de A.", stars: 5, text: "Mady es una chava súper tierna, transmite mucha paz, súper puntual esa cualidad me encanta!!! Muy responsable, atenta y respetuosa. la paz que transmite por sur tan tranquila me encanta para que esté con mi niña de 1 año y medio 💖 me deja muy tranquila !!. ¡Excelente!" },
            { family: "Familia Morales", stars: 5, text: "Su formación en psicología la hace única. Ayudó mucho a nuestro hijo con sus rutinas de sueño y emociones." },
            { family: "Familia Peña", stars: 5, text: "Nos sentimos muy seguros dejando a nuestros hijos con Mady. Muy creativa y siempre pendiente de su bienestar." }
        ]
    },
    {
        id: 4,
        name: "Sam",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1774489369/WhatsApp_Image_2026-03-25_at_19.37.56_dlnj5p.jpg",
        traits: "Responsable, Paciente, Creativa y Versátil",
        ages: "Recién nacidos a 10 años",
        activities: "Cambio de pañales, baño a RN, Actividades recreativas, Apoyo en tareas escolares",
        education: "Lic. Nutrición",
        references: [
            { family: "Familia Jiménez", stars: 5, text: "Los conocimientos de enfermería de Sam nos dan una tranquilidad enorme. Muy recomendable para bebés y niños pequeños." },
            { family: "Familia Castro", stars: 5, text: "Sam es súper proactiva y organizada. Mejoró las rutinas de nuestros hijos en tiempo récord. ¡La adoramos!" },
            { family: "Familia Vargas", stars: 5, text: "Sabe manejar cualquier situación con mucha calma. Su conocimiento en primeros auxilios nos da mucha paz." }
        ]
    },
    {
        id: 5,
        name: "Karen",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1774936203/WhatsApp_Image_2026-03-30_at_14.26.44_rzbcch.jpg",
        traits: "Creatividad, Responsabilidad y Paciencia",
        ages: "Recién nacidos a 10 años",
        activities: "Primeros Auxilios, Cambios a RN, Baño a RN, Apoyo en Tareas",
        education: "Lic. Psicología",
        references: [
            { family: "Familia Vega", stars: 5, text: "Karen practica inglés con nuestra hija de manera natural y divertida. Una joya de niñera, muy empática y cálida." },
            { family: "Familia Núñez", stars: 5, text: "Se ganó la confianza de nuestros hijos desde el primer día. Muy responsable y siempre comunicando cómo estuvo la jornada." },
            { family: "Familia Ibarra", stars: 5, text: "El apoyo emocional que le brinda a los niños es excepcional. Notamos un cambio muy positivo en nuestro hijo." }
        ]
    },
    {
        id: 6,
        name: "Lupita",
        photo: "https://res.cloudinary.com/dwoau0ajc/image/upload/v1774936204/WhatsApp_Image_2026-03-30_at_14.35.21_fgq64z.jpg",
        traits: "Responsable, Divertida, Dinámcia",
        ages: "Recién Nacidos a 10 años",
        activities: "Primeros Auxilios, Cambio de pañales, Baño a RN, Actividades Lúdicas y Recreativas",
        education: "Lic. Médico cirujano y Partero",
        references: [
            { family: "Familia Mendoza", stars: 5, text: "Lupita es especialista en lactantes. Nos enseñó técnicas de estimulación increíbles y nuestro bebé la adora." },
            { family: "Familia Reyes", stars: 5, text: "Con Lupita nuestro bebé estuvo en las mejores manos. Muy confiable, ternurosa y siempre muy pendiente." },
            { family: "Familia Aguilar", stars: 5, text: "La certificación en estimulación temprana se nota en todo lo que hace. Sin duda la mejor decisión que tomamos." }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('puzzleGrid');
    const modal = document.getElementById('nannyModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const flipper = document.getElementById('nannyCardFlipper');
    const flipToRefsBtn = document.getElementById('flipToRefs');
    const flipToProfileBtn = document.getElementById('flipToProfile');

    // Populate the puzzle
    nanniesData.forEach((nanny, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.classList.add(`jig-${(index % 3) + 1}`);

        piece.innerHTML = `
            <img src="${nanny.photo}" alt="${nanny.name}">
            <div class="puzzle-hint"><i class="fas fa-hand-pointer"></i><br>¡Haz clic!</div>
        `;

        piece.addEventListener('click', () => {
            piece.classList.add('colored');
            piece.classList.add('colored-permanent');
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

    // Flip to references (button OR clicking anywhere on front face)
    flipToRefsBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        flipper.classList.add('flipped');
    });

    document.querySelector('.card-front')?.addEventListener('click', () => {
        flipper.classList.add('flipped');
    });

    // Flip back to profile (button OR clicking anywhere on back face)
    flipToProfileBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        flipper.classList.remove('flipped');
    });

    document.querySelector('.card-back')?.addEventListener('click', () => {
        flipper.classList.remove('flipped');
    });
});

function openNannyModal(nanny) {
    // Reset flip state
    document.getElementById('nannyCardFlipper').classList.remove('flipped');

    // Populate front face
    document.getElementById('modalPhoto').src = nanny.photo;
    document.getElementById('modalName').textContent = nanny.name;
    document.getElementById('modalTraits').textContent = nanny.traits;
    document.getElementById('modalAges').textContent = nanny.ages;
    document.getElementById('modalActivities').textContent = nanny.activities;
    document.getElementById('modalEdu').textContent = nanny.education;

    // Populate back face
    document.getElementById('modalPhotoBack').src = nanny.photo;
    document.getElementById('modalNameBack').textContent = nanny.name;

    const refsList = document.getElementById('modalRefs');
    refsList.innerHTML = '';
    nanny.references.forEach(ref => {
        const stars = '★'.repeat(ref.stars) + '☆'.repeat(5 - ref.stars);
        refsList.innerHTML += `
            <div class="ref-item">
                <div class="ref-family">${ref.family}</div>
                <div class="ref-stars">${stars}</div>
                <p class="ref-text">"${ref.text}"</p>
            </div>
        `;
    });

    document.getElementById('nannyModal').classList.add('active');
}
