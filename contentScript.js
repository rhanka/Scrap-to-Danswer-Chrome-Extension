// contentScript.js

(function() {
  chrome.storage.sync.get(["scrapRoot", "scrapRegex"], (data) => {
    const scrapRoot = data.scrapRoot || '';
    const scrapRegex = new RegExp(data.scrapRegex || '.*');

    // Fonction pour vérifier si un lien est interne
    function isInternalLink(href) {
   
        // Ignorer les liens JavaScript ou vides
        if (!href || href.startsWith('javascript:') || href.startsWith('#')) {
          return false;
        }
    
        // Résoudre le lien par rapport à l'URL actuelle
        let url;
        try {
          url = new URL(href, location.href);
        } catch (e) {
          // Si le href n'est pas une URL valide, l'ignorer
          return false;
        }
        console.log(`Analyzing ${url}`)

        // Vérifier que le protocole est HTTP ou HTTPS
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          return false;
        }

        if (!url.href.startsWith(scrapRoot) || !scrapRegex.test(url.href)) {
          console.log(`Rejected ${url} scraRoot: ${url.href.startsWith(scrapRoot)} scrapRegex ${scrapRegex.test(url.href)}`)
          return false;
        }
    
        // Vérifier que le domaine est le même que celui de la page actuelle
        return url.hostname === location.hostname;

    }
  
    // Fonction pour normaliser les URL
    function normalizeUrl(url) {
      let normalizedUrl = url.split('#')[0]; // Enlever le fragment
      normalizedUrl = normalizedUrl.endsWith('/') ? normalizedUrl.slice(0, -1) : normalizedUrl;
      return normalizedUrl;
    }
  
    // Récupérer tous les liens sur la page
    const links = Array.from(document.querySelectorAll('a[href]'))
      .map(link => link.getAttribute('href'))
      .filter(href => isInternalLink(href))
      .map(href => new URL(href, location.href).href)
      .map(normalizeUrl);
  
    // Supprimer les doublons
    const uniqueLinks = [...new Set(links)];
  
    // Envoyer les liens au background script
    chrome.runtime.sendMessage({ action: 'collectLinks', links: uniqueLinks });

  });
})();