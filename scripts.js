document.addEventListener('DOMContentLoaded', () => {
    console.log('Page entièrement chargée et prête.');

    // Initialisation des fonctionnalités principales du site
    initializeNavigation();
    initializeSearchBar();
    setupVideoCardHoverEffects();
});

/**
 * Initialise la navigation avec des comportements interactifs et un défilement fluide.
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Gestion de la classe active
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Défilement fluide vers la section ciblée
            const targetSection = document.querySelector(link.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialise la barre de recherche avec des comportements utilisateurs.
 */
function initializeSearchBar() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Recherche lancée pour : "${query}"`);
            // Ajoutez une logique de recherche (ex. appel API ou filtrage local)
        } else {
            alert('Veuillez entrer un terme de recherche.');
        }
    };

    // Recherche au clic du bouton
    searchButton.addEventListener('click', performSearch);

    // Recherche via la touche "Entrée"
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}

/**
 * Ajoute des effets au survol des cartes vidéo pour une meilleure interactivité.
 */
function setupVideoCardHoverEffects() {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * Fonction générique : Détecte la fin d'une animation CSS (utile pour améliorer les transitions si nécessaire).
 * @param {HTMLElement} element - L'élément sur lequel écouter l'événement.
 * @param {Function} callback - La fonction à exécuter une fois l'animation terminée.
 */
function onAnimationEnd(element, callback) {
    element.addEventListener('animationend', callback, { once: true });
}
