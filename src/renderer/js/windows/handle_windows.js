
function show_processes_window () {
    ipcRenderer.send("create-process-window", true)
}