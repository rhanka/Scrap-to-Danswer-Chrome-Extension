(function() {
  const container = document.createElement('div');
  container.id = 'deepChatContainer';
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.width = '400px';
  container.style.height = '500px';
  container.style.zIndex = '20000';
  container.style.background = '#fff';
  container.style.border = '1px solid #ccc';
  container.style.borderRadius = '8px';
  container.style.overflow = 'hidden';

  container.innerHTML = `
    <div id="deepChatHeader" style="text-align:right;padding:4px;">
      <span id="deepChatClose" style="cursor:pointer">✖️</span>
    </div>
    <div id="deepChatWrapper" style="height:calc(100% - 30px);"></div>
    <div id="deepChatConfig" style="display:none;padding:8px;">
      <label>OpenAI API Key</label>
      <input type="text" id="openaiKeyInput" style="width:100%;"/>
      <button id="saveKeyBtn">Save</button>
    </div>
  `;

  document.body.appendChild(container);

  const wrapper = container.querySelector('#deepChatWrapper');
  const config = container.querySelector('#deepChatConfig');

  function loadDeepChat(apiKey) {
    const deepChat = document.createElement('deep-chat');
    deepChat.setAttribute('style', 'height:100%;');
    deepChat.setAttribute('directConnection', JSON.stringify({
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: '{{MESSAGE}}' }]
      }
    }));
    wrapper.innerHTML = '';
    wrapper.appendChild(deepChat);
  }

  chrome.storage.sync.get(['openaiKey'], (data) => {
    const key = data.openaiKey;
    if (key) {
      loadDeepChat(key);
    } else {
      config.style.display = 'block';
    }
  });

  container.querySelector('#saveKeyBtn').addEventListener('click', () => {
    const key = container.querySelector('#openaiKeyInput').value;
    if (!key) return;
    chrome.storage.sync.set({ openaiKey: key }, () => {
      config.style.display = 'none';
      loadDeepChat(key);
    });
  });

  container.querySelector('#deepChatClose').addEventListener('click', () => {
    container.remove();
  });

  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://cdn.jsdelivr.net/npm/deep-chat@1.6.3/dist/deep-chat.esm.js';
  document.head.appendChild(script);
})();
