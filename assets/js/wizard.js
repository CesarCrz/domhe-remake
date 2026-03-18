// domhe-interactive-form/script.js

let currentStep = 1;
const totalSteps = 4;

function updateProgress() {
    // Calculate width to fill
    const fillWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progress-fill').style.width = `${fillWidth}%`;

    // Process step dots/bears
    document.querySelectorAll('.progress-step').forEach((stepEl) => {
        const stepNum = parseInt(stepEl.getAttribute('data-step'));
        stepEl.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            stepEl.classList.add('completed');
        } else if (stepNum === currentStep) {
            stepEl.classList.add('active');
        }
    });
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach((el) => {
        el.classList.remove('active');
    });
    
    const stepEl = document.getElementById(`step-${step}`);
    if(stepEl){
        stepEl.classList.add('active');
    }
    currentStep = step;
    updateProgress();
}

function validateStep(step) {
    const stepEl = document.getElementById(`step-${step}`);
    const inputs = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    // Quick validation just to ensure fields aren't completely empty
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });

    if(step === 1) {
        // specifically check radios
        const checked = stepEl.querySelector('input[type="radio"]:checked');
        if(!checked) {
            isValid = false;
        }
    }

    return isValid;
}

function nextStep(step) {
    if (validateStep(currentStep)) {
        if(step === 4) {
            populateSummary();
        }
        showStep(step);
    } else {
        alert("Por favor, llena todos los campos necesarios. 😊");
    }
}

function prevStep(step) {
    showStep(step);
}

function changeCount(fieldId, delta) {
    const el = document.getElementById(fieldId);
    let val = parseInt(el.value);
    const min = parseInt(el.getAttribute('min'));
    val += delta;
    if (val < min) val = min;
    el.value = val;
}

function populateSummary() {
    const serviceRadio = document.querySelector('input[name="service"]:checked');
    const service = serviceRadio ? serviceRadio.value : '';
    
    document.getElementById('summary-service').innerText = service;
    
    const date = document.querySelector('input[name="date"]').value;
    const time = document.querySelector('input[name="time"]').value;
    document.getElementById('summary-datetime').innerText = `${date} a las ${time}`;
    
    const hours = document.getElementById('hours').value;
    document.getElementById('summary-hours').innerText = hours;
    
    const kids = document.getElementById('kids').value;
    document.getElementById('summary-kids').innerText = kids;
    
    const ages = document.querySelector('input[name="ages"]').value;
    document.getElementById('summary-ages').innerText = ages;
    
    const loc = document.querySelector('input[name="location"]').value;
    document.getElementById('summary-location').innerText = loc;
}

function submitForm() {
    const serviceRadio = document.querySelector('input[name="service"]:checked');
    const service = serviceRadio ? serviceRadio.value : '';
    const date = document.querySelector('input[name="date"]').value;
    const time = document.querySelector('input[name="time"]').value;
    const hours = document.getElementById('hours').value;
    const kids = document.getElementById('kids').value;
    const ages = document.querySelector('input[name="ages"]').value;
    const loc = document.querySelector('input[name="location"]').value;
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const extra = document.querySelector('textarea[name="extra"]').value;
    
    const phoneNumber = "5213334978486"; // DOMHE number from original site

    const template = `💖 *Hola DOMHE Nanny!* 💖
Soy *${name}*, me encantaría pedir información para un servicio. 

🧸 *Servicio:* ${service}
📅 *Fecha:* ${date}
⏰ *Horario:* ${time} (${hours} horas)
👶 *Niños:* ${kids} (Edades: ${ages})
🏠 *Ubicación:* ${loc}
📱 *Mi Teléfono:* ${phone}

${extra ? `📝 *Detalles Extras:* ${extra}` : ''}

¡Quedo a la espera de su respuesta! 🥰`;

    const encodedText = encodeURIComponent(template);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
}

// Initialize
updateProgress();
