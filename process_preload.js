const { ipcRenderer } = require('electron');
let si = require("systeminformation");
let osutil = require("os-utils");

let ev = require('events');
let State = new ev.EventEmitter();

process.on("loaded", (e) => {
    global.si = si;
    global.osutil = osutil;
    global.ipcRenderer = ipcRenderer;
    global.STATE = State
    global.Chart = require("chart.js").Chart;
})