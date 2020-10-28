
let cpu_name = document.getElementById("cpu-name")
let cpu_manufacturer = document.getElementById("cpu-manufacturer")
let cpu_cores_physical = document.getElementById("cpu-physical-cores")
let cpu_total_cores = document.getElementById("cpu-cores")
let cpu_base_clock = document.getElementById("cpu-base-clock")

ipcRenderer.send("base-cpu-stats", true)

ipcRenderer.on("base-cpu-stats", (events, data) => {
    console.log(data.cpu)
    __cpu_stats.static = data.cpu;
    __memory_stats.static = data.memory;
    __graphics_stats.static = data.graphics;
    __os_stats.static = data.os;
    __network_stats.static = data.network;
    __disk_stats.static = data.network;

    ipcRenderer.removeAllListeners("base-cpu-stats");

    cpu_name.innerHTML = ` ${data.cpu.brand}`
    cpu_manufacturer.innerHTML = ` ${data.cpu.manufacturer}`
    cpu_cores_physical = ` ${data.cpu.physicalCores}`
    cpu_total_cores.innerHTML = ` ${data.cpu.cores}`
    cpu_base_clock.innerHTML = ` ${data.cpu.speed}GHz`
});