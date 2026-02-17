// Get all tabs in the current window
browser.tabs.query({ currentWindow: true }).then((tabs) => {
  const tabList = document.getElementById('tab-list');
  tabs.forEach((tab) => {
    const div = document.createElement('div');
    div.className = 'tab-item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = tab.id;
    checkbox.id = `tab-${tab.id}`;
    const label = document.createElement('label');
    label.htmlFor = `tab-${tab.id}`;
    label.textContent = tab.title || tab.url;
    div.appendChild(checkbox);
    div.appendChild(label);
    tabList.appendChild(div);
  });
});

// Handle Save Selected button
document.getElementById('save-selected').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#tab-list input:checked');
  const tabIds = Array.from(checkboxes).map(cb => parseInt(cb.value));
  // We'll handle saving later – for now, just close the popup and log
  console.log('Selected tab IDs:', tabIds);
  window.close();
});

// Handle Save All button
document.getElementById('save-all').addEventListener('click', () => {
  browser.tabs.query({ currentWindow: true }).then((tabs) => {
    const tabIds = tabs.map(t => t.id);
    console.log('All tab IDs:', tabIds);
    window.close();
  });
});