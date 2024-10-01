let assistants = [];

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



function updateAssistants() {
    chrome.runtime.sendMessage({ action: 'getAssistants' }, (response) => {
      assistants = response.assistants || [];
      populateAssistantDropdown();
    });
}


// Fonction pour remplir le dropdown avec les assistants
function populateAssistantDropdown() {
  const assistantSelect = document.getElementById('assistantSelect');

  // Vider le dropdown avant de le remplir
  assistantSelect.innerHTML = '<option value="">Select Assistant</option>';

  assistants.forEach(assistant => {
      console.log(assistant)
      const option = document.createElement('option');
      option.value = assistant.id; // Utiliser l'assistantId comme valeur
      option.textContent = assistant.name; // Afficher le nom de l'assistant
      assistantSelect.appendChild(option);
  });
}

// Écouter les changements dans le dropdown
document.getElementById('assistantSelect').addEventListener('change', (event) => {
  const selectedId = event.target.value;
  document.getElementById('assistantId').value = selectedId; // Conserver l'assistantId
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

  // Appeler la fonction pour remplir le dropdown lorsque le popup est ouvert
  updateAssistants();

  // Écouter les messages du background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'updateDocCount') {
          updateDocCount();
      } else if (request.action === 'updateAssistants') {
        updateAssistants();
      }
  });
});
