// Load saved settings and populate fields
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['danswerHost', 'danswerToken','danswerConnectorId','danswerAssistantId','scrapRoot','scrapRegex'], function(data) {
    document.getElementById('host').value = data.danswerHost || '';
    document.getElementById('token').value = data.danswerToken || '';
    document.getElementById('assistantId').value = data.danswerAssistant !== undefined ? data.danswerAssistantId : '';
    document.getElementById('connectorId').value = data.danswerConnectorId !== undefined ? data.danswerConnectorId : '';
    document.getElementById('scrapRoot').value = data.scrapRoot || '';
    document.getElementById('scrapRegex').value = data.scrapRegex || '.*';
  });
})

// Save settings on button click
document.getElementById('save').addEventListener('click', function() {
  const host = document.getElementById('host').value;
  const token = document.getElementById('token').value;
  const assistantId = document.getElementById('assistantId').value;
  const connectorId = document.getElementById('connectorId').value;
  const scrapRoot = document.getElementById('scrapRoot').value;
  const scrapRegex = document.getElementById('scrapRegex').value;

  chrome.storage.sync.set({
    danswerHost: host,
    danswerToken: token,
    danswerAssistantId: assistantId,
    danswerConnectorId: connectorId,
    scrapRoot: scrapRoot,
    scrapRegex: scrapRegex
  }, function() {
    if (host && token) {
      chrome.runtime.sendMessage({ action: 'initDanswer' });
    }
    alert('Configuration saved');
  });
});
