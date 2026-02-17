// Default settings
const defaultSettings = {
  limitThumbnail: false,
  thumbnailSize: 160,
  honourScroll: true,
  includePinned: false,
  layoutMode: 'fixed', // 'auto' or 'fixed'
  numColumns: 6,
  fontFamily: 'Default',
  titleFontSize: 'medium',
  titleLines: 1
};

// Load settings when page opens
browser.storage.local.get('portfolioSettings').then(result => {
  const settings = result.portfolioSettings || defaultSettings;
  
  // Thumbnail section
  document.getElementById('limitThumbnailCheck').checked = settings.limitThumbnail;
  document.getElementById('limitThumbnailPx').value = settings.thumbnailSize;
  document.getElementById('limitThumbnailPx').disabled = !settings.limitThumbnail;
  document.getElementById('honourScroll').checked = settings.honourScroll;
  document.getElementById('includePinned').checked = settings.includePinned;
  
  // Layout section
  if (settings.layoutMode === 'auto') {
    document.getElementById('layoutAuto').checked = true;
  } else {
    document.getElementById('layoutFixed').checked = true;
  }
  document.getElementById('numColumns').value = settings.numColumns;
  toggleColumnsField(settings.layoutMode === 'fixed');
  
  // Font section
  document.getElementById('fontFamily').value = settings.fontFamily;
  
  // Tab title section
  document.getElementById('titleFontSize').value = settings.titleFontSize;
  document.getElementById('titleLines').value = settings.titleLines;
});

// Enable/disable columns field based on layout mode
function toggleColumnsField(enable) {
  document.getElementById('numColumns').disabled = !enable;
}

document.getElementById('layoutAuto').addEventListener('change', (e) => {
  if (e.target.checked) toggleColumnsField(false);
});
document.getElementById('layoutFixed').addEventListener('change', (e) => {
  if (e.target.checked) toggleColumnsField(true);
});

// Enable/disable thumbnail size input based on checkbox
document.getElementById('limitThumbnailCheck').addEventListener('change', (e) => {
  document.getElementById('limitThumbnailPx').disabled = !e.target.checked;
});

// Save button
document.getElementById('save').addEventListener('click', () => {
  const settings = {
    limitThumbnail: document.getElementById('limitThumbnailCheck').checked,
    thumbnailSize: parseInt(document.getElementById('limitThumbnailPx').value, 10),
    honourScroll: document.getElementById('honourScroll').checked,
    includePinned: document.getElementById('includePinned').checked,
    layoutMode: document.getElementById('layoutAuto').checked ? 'auto' : 'fixed',
    numColumns: parseInt(document.getElementById('numColumns').value, 10),
    fontFamily: document.getElementById('fontFamily').value,
    titleFontSize: document.getElementById('titleFontSize').value,
    titleLines: parseInt(document.getElementById('titleLines').value, 10)
  };
  
  browser.storage.local.set({ portfolioSettings: settings }).then(() => {
    // Optionally close the tab or show a confirmation
    alert('Settings saved!');
    // window.close(); // if this was opened as a tab, you can close it
  });
});

// Cancel button
document.getElementById('cancel').addEventListener('click', () => {
  window.close(); // close the tab
});