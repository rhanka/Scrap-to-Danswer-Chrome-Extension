// Load saved settings and populate fields
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['danswerHost', 'danswerToken'], function(data) {
    document.getElementById('host').value = data.danswerHost || '';
    document.getElementById('token').value = data.danswerToken || '';
    document.getElementById('connectorId').value = data.danswerConnectorId !== undefined ? data.danswerConnectorId : '';
  });
})

// Save settings on button click
document.getElementById('save').addEventListener('click', function() {
  const host = document.getElementById('host').value;
  const token = document.getElementById('token').value;
  const connectorId = document.getElementById('connectorId').value;

  chrome.storage.sync.set({
    danswerHost: host,
    danswerToken: token,
    danswerConnectorId: connectorId
  }, function() {
    alert('Configuration saved');
  });
});
