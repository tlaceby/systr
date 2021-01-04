const { ipcRenderer } = require('electron');
let si = require("systeminformation");
let osutil = require("os-utils");
let PythonController = require("node-python-communication").Process;
