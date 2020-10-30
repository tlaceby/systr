const version = document.getElementById('version');
    
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      version.innerText = `version ${arg.version} systr.tech`;
    })

    app.on("update_available", console.log("Update Available! Starting download now!"))

    app.on("update-downloaded", console.log("Update Downloaded! Install to Take Effect"))