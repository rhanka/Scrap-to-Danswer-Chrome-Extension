// contentScriptExtract.js

(function() {
  // Extraire le contenu souhaité
  const content = document.documentElement.outerHTML;

  // Envoyer les données au background script
  chrome.runtime.sendMessage({
    action: 'extractData',
    url: window.location.href,
    content: content
  });

  // Fermer l'onglet après l'extraction
  chrome.runtime.sendMessage({ action: 'closeTab' });
})();
