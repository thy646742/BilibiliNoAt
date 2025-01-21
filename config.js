window.onload = () => {
    const logSwitch = document.getElementById('enablelog');
    chrome.storage.sync.get({ 'enablelog': false }, result => logSwitch.checked = result.enablelog);
    logSwitch.addEventListener('change', event => {
        chrome.storage.sync.set({ enablelog: event.target.checked });
    });
    
    const pluginSwitch = document.getElementById('enableplugin');
    chrome.storage.sync.get({ 'enableplugin': true }, result => pluginSwitch.checked = result.enableplugin);
    pluginSwitch.addEventListener('change', event => {
        chrome.storage.sync.set({ enableplugin: event.target.checked });
    });
};