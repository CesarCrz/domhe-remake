// domhe-interactive-wizard
document.addEventListener('DOMContentLoaded', function() {

    // ── Elements ─────────────────────────────────────────────
    const wizardSteps   = document.querySelectorAll('.wizard-step');
    const progressFill  = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-container .step');
    const serviceOptions = document.querySelectorAll('.service-option');

    // ── State ────────────────────────────────────────────────
    let currentStep     = 1;
    const totalSteps    = 4;
    let selectedService = '';
    let selectedDays    = [];

    // ── Toast ─────────────────────────────────────────────────
    function showToast(message, type = 'error') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = { error: '❗', warning: '⚠️', success: '✅', info: 'ℹ️' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || '❗'}</span>
            <span class="toast-msg">${message}</span>
        `;

        container.appendChild(toast);
        requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 380);
        }, 4200);
    }

    // ── Progress bar ─────────────────────────────────────────
    function updateProgress() {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        if (progressFill) progressFill.style.width = `${progress}%`;

        progressSteps.forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            if (stepNum < currentStep)      step.classList.add('completed');
            else if (stepNum === currentStep) step.classList.add('active');
        });
    }

    // ── Show step ────────────────────────────────────────────
    function showStep(step) {
        wizardSteps.forEach(s => s.classList.remove('active'));
        const targetStep = document.getElementById(`step${step}`);
        if (targetStep) targetStep.classList.add('active');
        currentStep = step;
        updateProgress();
    }

    // ── Step 2 UI adaptada al servicio seleccionado ──────────
    function updateStep2ForService(service) {
        const fixedDaysGroup = document.getElementById('fixedDaysGroup');
        const eventosNote    = document.getElementById('eventosNote');
        const kidsAgesLabel  = document.getElementById('kidsAgesLabel');
        const kidsAgesInput  = document.getElementById('kidsAges');

        // Reset días seleccionados
        selectedDays = [];
        document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));

        if (service === 'Fijo') {
            if (fixedDaysGroup) fixedDaysGroup.style.display = 'block';
            if (eventosNote)    eventosNote.style.display    = 'none';
            if (kidsAgesLabel)  kidsAgesLabel.textContent    = 'Edad de los peques';
            if (kidsAgesInput)  kidsAgesInput.placeholder    = 'Ej. 2 años, 5 años';
        } else if (service === 'Eventos') {
            if (fixedDaysGroup) fixedDaysGroup.style.display = 'none';
            if (eventosNote)    eventosNote.style.display    = 'flex';
            if (kidsAgesLabel)  kidsAgesLabel.textContent    = 'Rango aproximado de los peques invitados';
            if (kidsAgesInput)  kidsAgesInput.placeholder    = 'Ej. 1 a 8 años';
        } else {
            if (fixedDaysGroup) fixedDaysGroup.style.display = 'none';
            if (eventosNote)    eventosNote.style.display    = 'none';
            if (kidsAgesLabel)  kidsAgesLabel.textContent    = 'Edad de los peques';
            if (kidsAgesInput)  kidsAgesInput.placeholder    = 'Ej. 2 años, 5 años';
        }
    }

    // ── Service selection ────────────────────────────────────
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedService = this.getAttribute('data-value');

            const errorMsg = document.getElementById('err-step1');
            if (errorMsg) errorMsg.style.display = 'none';
        });
    });

    // ── Day pills ────────────────────────────────────────────
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            if (selectedDays.includes(day)) {
                selectedDays = selectedDays.filter(d => d !== day);
                this.classList.remove('selected');
            } else {
                selectedDays.push(day);
                this.classList.add('selected');
            }
        });
    });

    // ── Counter controls ─────────────────────────────────────
    document.querySelectorAll('.counter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (!input) return;

            let value = parseInt(input.value) || 1;
            const min = parseInt(input.getAttribute('min')) || 1;
            const max = parseInt(input.getAttribute('max')) || 99;

            if (this.classList.contains('plus'))       value = Math.min(value + 1, max);
            else if (this.classList.contains('minus')) value = Math.max(value - 1, min);

            input.value = value;
        });
    });

    // ── Next button ──────────────────────────────────────────
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', function() {

            if (currentStep === 1) {
                if (!selectedService) {
                    const errorMsg = document.getElementById('err-step1');
                    if (errorMsg) errorMsg.style.display = 'block';
                    return;
                }
                // Preparar step 2 según servicio elegido
                updateStep2ForService(selectedService);
            }

            if (currentStep === 2) {
                const serviceDate      = document.getElementById('serviceDate').value;
                const serviceTimeStart = document.getElementById('serviceTimeStart').value;
                const serviceTimeEnd   = document.getElementById('serviceTimeEnd').value;
                const kidsAges         = document.getElementById('kidsAges').value.trim();

                if (!serviceDate || !serviceTimeStart || !serviceTimeEnd || !kidsAges) {
                    showToast('Por favor completa todos los campos: fecha, horario y edades de los peques.', 'error');
                    return;
                }

                if (serviceTimeEnd <= serviceTimeStart) {
                    showToast('La hora de fin debe ser después de la hora de inicio.', 'warning');
                    return;
                }

                if (selectedService === 'Fijo' && selectedDays.length === 0) {
                    showToast('Por favor selecciona al menos un día de la semana para el servicio fijo.', 'error');
                    return;
                }
            }

            if (currentStep === 3) {
                const userName     = document.getElementById('userName').value.trim();
                const userLocation = document.getElementById('userLocation').value.trim();

                if (!userName || !userLocation) {
                    const errorMsg = document.getElementById('err-step3');
                    if (errorMsg) errorMsg.style.display = 'block';
                    return;
                }

                updateSummary();
            }

            if (currentStep < totalSteps) showStep(currentStep + 1);
        });
    });

    // ── Previous button ──────────────────────────────────────
    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentStep > 1) showStep(currentStep - 1);
        });
    });

    // ── Summary ──────────────────────────────────────────────
    function updateSummary() {
        const userName         = document.getElementById('userName').value.trim();
        const userLocation     = document.getElementById('userLocation').value.trim();
        const kidsCount        = document.getElementById('kidsCount').value;
        const kidsAges         = document.getElementById('kidsAges').value.trim();
        const hoursCount       = document.getElementById('hoursCount').value;
        const serviceDate      = document.getElementById('serviceDate').value;
        const serviceTimeStart = document.getElementById('serviceTimeStart').value;
        const serviceTimeEnd   = document.getElementById('serviceTimeEnd').value;

        const summaryName     = document.getElementById('summaryName');
        const summaryService  = document.getElementById('summaryService');
        const summaryDaysRow  = document.getElementById('summaryDaysRow');
        const summaryDays     = document.getElementById('summaryDays');
        const summaryKids     = document.getElementById('summaryKids');
        const summaryAges     = document.getElementById('summaryAges');
        const summaryHours    = document.getElementById('summaryHours');
        const summaryDate     = document.getElementById('summaryDate');
        const summaryTime     = document.getElementById('summaryTime');
        const summaryLocation = document.getElementById('summaryLocation');

        if (summaryName)     summaryName.textContent     = userName;
        if (summaryService)  summaryService.textContent  = selectedService;
        if (summaryKids)     summaryKids.textContent     = kidsCount;
        if (summaryAges)     summaryAges.textContent     = kidsAges;
        if (summaryHours)    summaryHours.textContent    = hoursCount;
        if (summaryDate)     summaryDate.textContent     = serviceDate;
        if (summaryTime)     summaryTime.textContent     = `${serviceTimeStart} – ${serviceTimeEnd}`;
        if (summaryLocation) summaryLocation.textContent = userLocation;

        // Días solo para Fijo
        if (summaryDaysRow && summaryDays) {
            if (selectedService === 'Fijo' && selectedDays.length > 0) {
                summaryDays.textContent  = selectedDays.join(', ');
                summaryDaysRow.style.display = '';
            } else {
                summaryDaysRow.style.display = 'none';
            }
        }
    }

    // ── WhatsApp ─────────────────────────────────────────────
    const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');
    if (sendWhatsappBtn) {
        sendWhatsappBtn.addEventListener('click', function() {
            const userName         = document.getElementById('userName').value.trim();
            const userLocation     = document.getElementById('userLocation').value.trim();
            const kidsCount        = document.getElementById('kidsCount').value;
            const kidsAges         = document.getElementById('kidsAges').value.trim();
            const hoursCount       = document.getElementById('hoursCount').value;
            const serviceDate      = document.getElementById('serviceDate').value;
            const serviceTimeStart = document.getElementById('serviceTimeStart').value;
            const serviceTimeEnd   = document.getElementById('serviceTimeEnd').value;

            const daysLine = (selectedService === 'Fijo' && selectedDays.length > 0)
                ? `\n🗓️ *Días:* ${selectedDays.join(', ')}` : '';

            const message = `💖 *Hola DOMHE Nanny!* 💖
Soy *${userName}*, me gustaría agendar un servicio.

🧸 *Servicio:* ${selectedService}${daysLine}
👶 *Niños a cuidar:* ${kidsCount} (${kidsAges})
⏰ *Horas estimadas:* ${hoursCount}
📅 *Fecha:* ${serviceDate}
🕐 *Horario:* ${serviceTimeStart} – ${serviceTimeEnd}
🏠 *Zona:* ${userLocation}

¡Quedo atent@ a su respuesta! 🥰`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/5213334978486?text=${encodedMessage}`, '_blank');
        });
    }

    // ── Init ─────────────────────────────────────────────────
    updateProgress();
});
