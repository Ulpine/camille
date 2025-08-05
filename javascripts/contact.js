document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Animation du bouton
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.style.background = '#95a5a6';

    // Simulation d'envoi
    setTimeout(() => {
        // Afficher le message de succès
        document.getElementById('successMessage').style.display = 'block';

        // Réinitialiser le formulaire
        this.reset();

        // Réinitialiser le bouton
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

        // Faire défiler vers le haut
        document.querySelector('.container').scrollIntoView({
            behavior: 'smooth'
        });

        // Masquer le message après 5 secondes
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);

    }, 2000);
});

// Animation des champs au focus
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Animation des liens sociaux
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
