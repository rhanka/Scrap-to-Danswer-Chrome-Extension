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
