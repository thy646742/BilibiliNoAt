window.onload = () => {
    const logSwitch = document.getElementById('enablelog');
    chrome.storage.sync.get({ 'enablelog': false }, result => logSwitch.checked = result.enablelog);
    logSwitch.addEventListener('change', event => {
        chrome.storage.sync.set({ enablelog: event.target.checked });
    });
};