let currentTabs = []; // store tabs for later use


browser.tabs.query({ currentWindow: true }).then((tabs) => {
  currentTabs = tabs;
  document.getElementById('tab-count').textContent = `${tabs.length} tab(s) will be included.`;
});


document.getElementById('modify-set').addEventListener('click', () => {
  // We'll pass the tab list via storage or URL
  browser.storage.local.set({ pendingTabs: currentTabs }).then(() => {
    browser.tabs.create({ url: browser.runtime.getURL('modify/modify.html') });
    window.close(); // close popup
  });
});

document.getElementById('save').addEventListener('click', () => {
  const name = document.getElementById('portfolio-name').value || 'Untitled';
  // For now, just log and close
  console.log('Save with name:', name);
  window.close();
});

document.getElementById('cancel').addEventListener('click', () => {
  window.close();
});