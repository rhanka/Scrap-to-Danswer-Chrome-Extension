document.getElementById('collect-links').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['contentScript.js']
    });
  });
});

document.getElementById('download').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'createZip', method: 'download' });
});

document.getElementById('upload').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'createZip', method: 'upload' });
});

document.getElementById('reset').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'reset'});
});

document.addEventListener('DOMContentLoaded', () => {
  // Fonction pour mettre à jour le nombre de documents
  function updateDocCount() {
      chrome.runtime.sendMessage({ action: 'getDataCollection' }, (response) => {
          const dataCollection = response.dataCollection || [];
          const docCount = dataCollection.length;
          
          // Afficher le nombre de documents dans le popup
          document.getElementById('docCount').textContent = `Number of documents: ${docCount}`;
      });
  }

  // Initialiser le nombre de documents
  updateDocCount();

  // Écouter les messages du background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'updateDocCount') {
          updateDocCount();
      }
  });
});
