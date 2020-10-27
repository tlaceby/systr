const { ipcRenderer } = require("electron");

let __cpu_stats = {
    recent_minute: {
        free: [],
        used: [],
    }
};
let __memory_stats = {};
let __network_stats = {};