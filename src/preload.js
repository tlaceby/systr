const { ipcRenderer } = require('electron');
let si = require("systeminformation");
let osutil = require("os-utils");

let ev = require('events');
let APP_STATE = new ev.EventEmitter();

process.on("loaded", (e) => {
    global.si = si;
    global.osutil = osutil;
    global.ipcRenderer = ipcRenderer;
    global.APP_STATE = APP_STATE;
    global.Chart = require("chart.js").Chart;
})