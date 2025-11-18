// Global variables
let cycleCount = 0;
let totalCycles = 5;
let isRunning = false;
let gongSound = document.getElementById('gong-sound');
let breathingLogo = document.getElementById('breathing-logo');
let phaseInfo = document.getElementById('phase-info');
let cycleCounter = document.getElementById('cycle-counter');

// Start exercise
document.getElementById('start-btn').addEventListener('click', function() {
    const inhale = parseInt(document.getElementById('inhale').value);
    const hold = parseInt(document.getElementById('hold').value);
    const exhale = parseInt(document.getElementById('exhale').value);
    totalCycles = parseInt(document.getElementById('cycles').value);

    if (isRunning) return;
    isRunning = true;
    cycleCount = 0;
    cycleCounter.textContent = `Cycle ${cycleCount}/${totalCycles}`;
    phaseInfo.textContent = "Inhale...";

    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('stop-btn').style.display = 'block';

    startBreathingCycle(inhale, hold, exhale);
});

// Stop exercise
document.getElementById('stop-btn').addEventListener('click', function() {
    isRunning = false;
    breathingLogo.style.animation = 'none';
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('stop-btn').style.display = 'none';
    phaseInfo.textContent = "Exercise stopped.";
});

// Start a breathing cycle
function startBreathingCycle(inhale, hold, exhale) {
    if (!isRunning) return;

    // Inhale phase
    breathingLogo.style.animation = `breathe-in ${inhale}s ease-in-out forwards`;
    setTimeout(() => {
        if (!isRunning) return;
        gongSound.currentTime = 0;
        gongSound.play();
        phaseInfo.textContent = "Hold...";

        // Hold phase
        breathingLogo.style.animation = `breathe-hold ${hold}s linear forwards`;
        setTimeout(() => {
            if (!isRunning) return;
            gongSound.currentTime = 0;
            gongSound.play();
            phaseInfo.textContent = "Exhale...";

            // Exhale phase
            breathingLogo.style.animation = `breathe-out ${exhale}s ease-in-out forwards`;
            setTimeout(() => {
                if (!isRunning) return;
                cycleCount++;
                cycleCounter.textContent = `Cycle ${cycleCount}/${totalCycles}`;

                if (cycleCount < totalCycles) {
                    phaseInfo.textContent = "Inhale...";
                    startBreathingCycle(inhale, hold, exhale);
                } else {
                    phaseInfo.textContent = "Exercise completed!";
                    document.getElementById('start-btn').style.display = 'block';
                    document.getElementById('stop-btn').style.display = 'none';
                    isRunning = false;
                }
            }, exhale * 1000);
        }, hold * 1000);
    }, inhale * 1000);
}
