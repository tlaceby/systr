const version = document.getElementById('version');
    
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      version.innerText = `version ${arg.version} systr.tech`;
    })

    app.on("update_available", (e) => {
      console.log("Update Found We will let you know when it is finished")
      alert("Update Found We will let you know when it is finished")
    })

    app.on("update-downloaded", (e) => {
      console.log("Update Downloaded! Install to Take Effect")
      alert("Update Has finished downloading! Restart the app to make changes final.")
    })