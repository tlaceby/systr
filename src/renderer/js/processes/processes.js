
let ALL_PROCESSES = []

let TRACKED_PROCESSES = [];
let PROCESS_INTERVAL = localStorage.getItem("process-update-interval");
const known_windows_mac_processes_pids = [976, 816, 644, 0, 4, 888, 896, 6188];


if ( typeof PROCESS_INTERVAL != "string") {
    localStorage.setItem("process-update-interval", "4000");
    PROCESS_INTERVAL = 4000;
} else {
    PROCESS_INTERVAL = parseInt(PROCESS_INTERVAL);
}

let ev = require('events');
let STATE = new ev.EventEmitter();