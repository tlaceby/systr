var AutoLaunch = require('auto-launch');
const {ipcMain } = require('electron');

let num_calls_made_debug = 0;
 
var launch_systr = new AutoLaunch({
    name: 'systr'
});
 
 
launch_systr.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        console.log("app launches on startup")
        return;
    } else {
        console.log('app does not launch on startup')
    }
})
.catch(function(err){
    console.log(err)
})

ipcMain.on("set-auto-start", (events, data) => {
    num_calls_made_debug += 1;
    console.log("startup call #" + num_calls_made_debug)
    console.log('setting autostart to ::' + data)
    if (data == true) {
        launch_systr.enable();
    } else {
        launch_systr.disable();
    }
})

ipcMain.on("get-launch-settings", (events, args) => {
    launch_systr.isEnabled()
    .then(function(isEnabled){
        if(isEnabled){
            events.reply('get-launch-settings', true);
        } else {
            events.reply('get-launch-settings', false);
        }
    })
    .catch(function(err){
        console.log(err)
    })
})