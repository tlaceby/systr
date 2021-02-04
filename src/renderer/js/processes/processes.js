let si = require("systeminformation")
require("chart.js")
let ALL_PROCESSES = []
let is_viewing_process = false;
let update_graph_interval;

let current_viewed_process = {
    mem_data: [],
    cpu_data: [],
    old: []};
    
let process_update_interval;
const MAX_LENGTH_OF_RECENT_PROCESSES = 16;

let TRACKED_PROCESSES = [];
let PROCESS_INTERVAL = localStorage.getItem("process-update-interval");
const known_windows_mac_processes_pids = [976, 816, 644, 0, 4, 888, 896, 6188];


if ( typeof PROCESS_INTERVAL != "string") {
    localStorage.setItem("process-update-interval", "3500");
    PROCESS_INTERVAL = 3500;
} else {
    PROCESS_INTERVAL = parseInt(PROCESS_INTERVAL);
}

let ev = require('events');
let STATE = new ev.EventEmitter();
