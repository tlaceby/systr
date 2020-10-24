
function close_app () {
    ipcRenderer.send("close-btn", true);
}


function minimize_app () {
    ipcRenderer.send("minimize-btn", true);
}
