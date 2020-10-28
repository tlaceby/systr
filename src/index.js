const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const main = require('electron-reload');
const path = require('path');
const storage = require('electron-json-storage');
const startup = require("./startup")
const system = require("./system")

var os 	= require('os-utils');
const { start } = require('repl');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

require('electron-reload')(__dirname);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minHeight: 635,
    minWidth: 670,
    width: 782,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    height: 568,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.on("ready-to-show", (e) => {
    setTimeout(() => {
      mainWindow.show()
    }, 1000)
  })

  ipcMain.on("minimize-btn", (events, args) => {
    mainWindow.minimize()
  });

  

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '/renderer/index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


ipcMain.on("close-btn", (events, args) => {
  console.log(args)
  app.quit()
});


ipcMain.on('get-cpu-usage', (events, args) => {
  let free;
  let used;
  let cpus = os.cpuCount()
  os.cpuUsage(function(v){
    used = v * 100;
    os.cpuFree(function(v){
      free = v * 100;
      events.reply("cpu-data", {
        free: free,
        used: used
      })
    });
  });
});

ipcMain.on("get-user-settings", (events, args) => {
  startup.get_initial_settings(storage).then(settings => {
    events.reply( "recieved-settings",{settings: settings});
    events.reply( "ready-to-render",{settings: settings});
  }).catch(err => {
    events.reply(err);
  });
});