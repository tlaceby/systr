
const version = document.getElementById('version-num');

ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    version.innerText = 'v' + arg.version + "-u";
  });
  ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    version.innerHTML = `A Update was found! It will be installed on next startup.`
  });
    
ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, arg) => {
    ipcRenderer.removeAllListeners('app_version');
    version.innerText = 'v' + arg.version;
});
