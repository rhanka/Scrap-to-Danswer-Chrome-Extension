// Load saved settings and populate fields
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['openaiKey','assistantId','scrapRoot','scrapRegex'], function(data) {
    document.getElementById('openaiKey').value = data.openaiKey || '';
    document.getElementById('assistantId').value = data.assistantId || '';
    document.getElementById('scrapRoot').value = data.scrapRoot || '';
    document.getElementById('scrapRegex').value = data.scrapRegex || '.*';
  });
})

// Save settings on button click
document.getElementById('save').addEventListener('click', function() {
  const openaiKey = document.getElementById('openaiKey').value;
  const assistantId = document.getElementById('assistantId').value;
  const scrapRoot = document.getElementById('scrapRoot').value;
  const scrapRegex = document.getElementById('scrapRegex').value;

  chrome.storage.sync.set({
    openaiKey: openaiKey,
    assistantId: assistantId,
    scrapRoot: scrapRoot,
    scrapRegex: scrapRegex
  }, function() {
    alert('Configuration saved');
  });
});
