document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('content');

  // Fonction pour charger et afficher un fichier HTML dans la div
  function loadContent(file) {
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur : ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        contentDiv.innerHTML = html; // Insère le contenu chargé dans la div
      })
      .catch(error => {
        contentDiv.innerHTML = `<p class="text-danger">Erreur lors du chargement : ${error.message}</p>`;
      });
  }

  // Fonction pour gérer le hash et charger le contenu correspondant
  function handleHashChange() {
    let hash = window.location.hash.substring(1); // Récupère le hash sans le #

    // Si aucun hash n'est présent, on définit "accueil" comme par défaut
    if (!hash) {
      hash = 'accueil';
      history.replaceState(null, '', '#accueil'); // Met à jour l'URL sans changer l'historique
    }

    const pageMap = {
      accueil: 'accueil.html',
      apropos: 'apropos.html',
      skills: 'skills.html',
      projects: 'projects.html',
      contact: 'contact.html',
      formations: 'formation.html'
    };

    const file = pageMap[hash] || 'accueil.html'; // Par défaut, charge "accueil.html"
    loadContent(file);

    // Met à jour le lien actif
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${hash}`);
    });
  }

  // Écoute des clics sur les liens pour mettre à jour l'URL
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // Empêche le rechargement de la page
      const hash = link.getAttribute('href').substring(1); // Récupère le hash sans le #
      const file = link.getAttribute('data-file'); // Récupère le fichier associé au lien

      history.pushState(null, '', `#${hash}`); // Met à jour l'URL
      loadContent(file); // Charge le contenu
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${hash}`);
      });
    });
  });

  // Charge le contenu correspondant au hash actuel ou la page par défaut
  handleHashChange();

  // Écoute les changements de hash dans l'URL
  window.addEventListener('hashchange', handleHashChange);
});
