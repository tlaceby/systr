const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const si = require('systeminformation');
const main = require('electron-reload');
const path = require('path');
const storage = require('electron-json-storage');
const startup = require("./startup")
const system = require("./system")
const { autoUpdater } = require('electron-updater');

var os 	= require('os-utils');
const { start } = require('repl');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//require('electron-reload')(__dirname);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minHeight: 635,
    minWidth: 670,
    width: 982,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    height: 668,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '/renderer/index.html'));

  const loading_window = new BrowserWindow({
    minHeight: 170,
    minWidth: 170,
    width: 230,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    height: 230,
  });

  loading_window.loadFile(path.join(__dirname, '/renderer/loading.html'));
  
  loading_window.on("ready-to-show", (e) => {
    autoUpdater.checkForUpdatesAndNotify();
    setTimeout(() => {
      loading_window.show()
    }, 200)
  })

  ipcMain.on("show_main", (events, args) => {
    loading_window.hide()
    mainWindow.show()
    setTimeout(() => {
      mainWindow.focus()
    }, 1000)

    setTimeout(() => {
      loading_window.destroy()
    }, 3000)
  })

  ipcMain.on("minimize-btn", (events, args) => {
    mainWindow.minimize()
  });

  
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
  system.get_cpu_usage(si)
    .then(data => {
      events.reply("cpu-data", data)
    })
    .catch(err => console.log(err))
});

ipcMain.on("base-cpu-stats", (events, args) => {
  system.get_system_info_static(si).then((system_stats) => {
    events.reply("base-cpu-stats", system_stats)
  }).catch((err) => console.log(err))
})

ipcMain.on("get-user-settings", (events, args) => {
  startup.get_initial_settings(storage).then(settings => {
    events.reply( "recieved-settings",{settings: settings});
    events.reply( "ready-to-render",{settings: settings});
  }).catch(err => {
    events.reply(err);
  });
});


// App updating
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  autoUpdater.autoInstallOnAppQuit()
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});