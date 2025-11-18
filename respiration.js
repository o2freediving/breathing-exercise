// Variables globales
let cycleCount = 0;
let totalCycles = 5;
let isRunning = false;
let animationInterval;
let gongSound = document.getElementById('gong-sound');
let logo = document.getElementById('breathing-logo');

// Fonction pour démarrer l'exercice
document.getElementById('start-btn').addEventListener('click', function() {
    const inspire = parseInt(document.getElementById('inspire').value);
    const retenue = parseInt(document.getElementById('retenue').value);
    const expire = parseInt(document.getElementById('expire').value);
    totalCycles = parseInt(document.getElementById('repetitions').value);

    if (isRunning) return;
    isRunning = true;
    cycleCount = 0;
    document.getElementById('cycle-counter').textContent = `Cycle ${cycleCount}/${totalCycles}`;
    document.getElementById('phase-info').textContent = "Inspire...";
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('stop-btn').style.display = 'block';

    startBreathingCycle(inspire, retenue, expire);
});

// Fonction pour arrêter l'exercice
document.getElementById('stop-btn').addEventListener('click', function() {
    clearInterval(animationInterval);
    isRunning = false;
    logo.style.animation = 'none';
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('stop-btn').style.display = 'none';
    document.getElementById('phase-info').textContent = "Exercice arrêté.";
});

// Fonction pour lancer un cycle de respiration
function startBreathingCycle(inspire, retenue, expire) {
    if (!isRunning) return;

    // Phase d'inspiration
    logo.style.animation = `breathe-in ${inspire}s linear forwards`;
    setTimeout(() => {
        if (!isRunning) return;
        gongSound.currentTime = 0;
        gongSound.play();
        document.getElementById('phase-info').textContent = "Retiens...";

        // Phase de rétention
        logo.style.animation = `breathe-hold ${retenue}s linear forwards`;
        setTimeout(() => {
            if (!isRunning) return;
            gongSound.currentTime = 0;
            gongSound.play();
            document.getElementById('phase-info').textContent = "Expire...";

            // Phase d'expiration
            logo.style.animation = `breathe-out ${expire}s linear forwards`;
            setTimeout(() => {
                if (!isRunning) return;
                cycleCount++;
                document.getElementById('cycle-counter').textContent = `Cycle ${cycleCount}/${totalCycles}`;

                if (cycleCount < totalCycles) {
                    document.getElementById('phase-info').textContent = "Inspire...";
                    startBreathingCycle(inspire, retenue, expire);
                } else {
                    document.getElementById('phase-info').textContent = "Exercice terminé !";
                    document.getElementById('start-btn').style.display = 'block';
                    document.getElementById('stop-btn').style.display = 'none';
                    isRunning = false;
                }
            }, expire * 1000);
        }, retenue * 1000);
    }, inspire * 1000);
}
