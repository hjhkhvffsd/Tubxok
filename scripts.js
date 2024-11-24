document.addEventListener('DOMContentLoaded', () => {
    // Affiche un message de confirmation dans la console
    console.log('Page chargée et prête.');

    // Initialisation des fonctionnalités du site
    initializeNavigation();
    initializeSearchBar();
    setupVideoCardHoverEffects();
});

/**
 * Initialise la navigation en ajoutant des comportements interactifs.
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Ajouter une classe active sur le lien cliqué
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Supprime la classe active des autres liens
            navLinks.forEach(l => l.classList.remove('active'));
            // Ajoute la classe active au lien cliqué
            link.classList.add('active');
            
            // Faites défiler jusqu'à la section correspondante
            const targetSection = document.querySelector(link.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Initialise la barre de recherche avec un comportement basique.
 */
function initializeSearchBar() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    // Ajouter un événement au clic du bouton
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Recherche lancée pour : ${query}`);
            // Ajoutez ici une logique de recherche, comme appeler une API ou filtrer les vidéos affichées
        } else {
            alert('Veuillez entrer un terme de recherche.');
        }
    });

    // Gérer la recherche via la touche "Entrée"
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });
}

/**
 * Ajoute des effets au survol des cartes vidéo.
 */
function setupVideoCardHoverEffects() {
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    });
}
