

ipcRenderer.on('use-minimal-usage', () => {
    APP_STATE.emit("use-minimal-usage");
});


ipcRenderer.on('resume-normal-usage', () => {
    APP_STATE.emit("resume-normal-usage");
});
