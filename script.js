// Fonction pour vérifier quelle section est visible
function onScroll() {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('nav a');

  let currentSection = '';

  // Vérifie chaque section
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      currentSection = section.id;
    }
  });

  // Met à jour la classe active dans la navigation
  links.forEach(link => {
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Ajout de l'événement de scroll
window.addEventListener('scroll', onScroll);
