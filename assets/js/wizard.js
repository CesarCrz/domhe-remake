// domhe-interactive-wizard - Updated for index.html wizard
document.addEventListener('DOMContentLoaded', function() {
    // Wizard elements
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-container .step');
    const serviceOptions = document.querySelectorAll('.service-option');
    
    // State
    let currentStep = 1;
    const totalSteps = 4;
    let selectedService = '';
    
    // Update progress bar
    function updateProgress() {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        progressSteps.forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNum < currentStep) {
                step.classList.add('completed');
            } else if (stepNum === currentStep) {
                step.classList.add('active');
            }
        });
    }
    
    // Show specific step
    function showStep(step) {
        wizardSteps.forEach(s => s.classList.remove('active'));
        const targetStep = document.getElementById(`step${step}`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
        currentStep = step;
        updateProgress();
    }
    
    // Service option selection
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedService = this.getAttribute('data-value');
            
            // Hide error message
            const errorMsg = document.getElementById('err-step1');
            if (errorMsg) errorMsg.style.display = 'none';
        });
    });
    
    // Counter controls
    document.querySelectorAll('.counter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (!input) return;
            
            let value = parseInt(input.value) || 1;
            const min = parseInt(input.getAttribute('min')) || 1;
            const max = parseInt(input.getAttribute('max')) || 99;
            
            if (this.classList.contains('plus')) {
                value = Math.min(value + 1, max);
            } else if (this.classList.contains('minus')) {
                value = Math.max(value - 1, min);
            }
            
            input.value = value;
        });
    });
    
    // Next button handlers
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Validate current step
            if (currentStep === 1) {
                if (!selectedService) {
                    const errorMsg = document.getElementById('err-step1');
                    if (errorMsg) errorMsg.style.display = 'block';
                    return;
                }
            }
            
            if (currentStep === 3) {
                const userName = document.getElementById('userName').value.trim();
                const userLocation = document.getElementById('userLocation').value.trim();
                
                if (!userName || !userLocation) {
                    const errorMsg = document.getElementById('err-step3');
                    if (errorMsg) errorMsg.style.display = 'block';
                    return;
                }
                
                // Update summary
                updateSummary();
            }
            
            if (currentStep < totalSteps) {
                showStep(currentStep + 1);
            }
        });
    });
    
    // Previous button handlers
    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });
    
    // Update summary for step 4
    function updateSummary() {
        const summaryName = document.getElementById('summaryName');
        const summaryService = document.getElementById('summaryService');
        const summaryKids = document.getElementById('summaryKids');
        const summaryHours = document.getElementById('summaryHours');
        const summaryLocation = document.getElementById('summaryLocation');
        
        const userName = document.getElementById('userName').value.trim();
        const userLocation = document.getElementById('userLocation').value.trim();
        const kidsCount = document.getElementById('kidsCount').value;
        const hoursCount = document.getElementById('hoursCount').value;
        
        if (summaryName) summaryName.textContent = userName;
        if (summaryService) summaryService.textContent = selectedService;
        if (summaryKids) summaryKids.textContent = kidsCount;
        if (summaryHours) summaryHours.textContent = hoursCount;
        if (summaryLocation) summaryLocation.textContent = userLocation;
    }
    
    // WhatsApp send button
    const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');
    if (sendWhatsappBtn) {
        sendWhatsappBtn.addEventListener('click', function() {
            const userName = document.getElementById('userName').value.trim();
            const userLocation = document.getElementById('userLocation').value.trim();
            const kidsCount = document.getElementById('kidsCount').value;
            const hoursCount = document.getElementById('hoursCount').value;
            
            const message = `💖 *Hola DOMHE Nanny!* 💖
Soy *${userName}*, me gustaría agendar un servicio.

🧸 *Servicio:* ${selectedService}
👶 *Niños a cuidar:* ${kidsCount}
⏰ *Horas estimadas:* ${hoursCount}
🏠 *Zona:* ${userLocation}

¡Quedo atenta a su respuesta! 🥰`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/5213334978486?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Initialize
    updateProgress();
});
