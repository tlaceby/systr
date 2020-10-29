const { ipcRenderer } = require('electron');
let ApexCharts = require("apexcharts");
console.time("startup")
let __cpu_stats = {
    recent_minute: {
        free: [],
        used: [],
    },static: {}
};
let __memory_stats = {
    recent_minute: {
        free: [],
        used: [],
    },static: {}};
let __graphics_stats = {
    recent_minute: {
        free: [],
        used: [],
    },static: {}
};

let __os_stats = {
    recent_minute: {
        free: [],
        used: [],
    },static: {}};

let __network_stats = {
    recent_minute: {
        free: [],
        used: [],
    },static: {}
};

let __disk_stats = {
    recent_minute: {
        free: [],
        used: [],
    },static: {}
};

let current_page = "cpu";