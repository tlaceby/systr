const { ipcRenderer } = require('electron');
let si = require("systeminformation");
let osutil = require("os-utils");
let Settings;
let CPU;
let startup_finished = false;
/**
 * This is a string that contains the name of the current page in view of the renderer.Default is "cpu", however this can change due to settings as well.
 * @global
 */
let current_page = "cpu";

// startup cvall this before running anything else
Settings = new _Settings(ipcRenderer)
    .then((settings) => {
    CPU = new _CPU(si, osutil, settings.cpu_settings.update_interval).then(() => {
        startup_other_processes().then(() => {
            ipcRenderer.send('show-app', true)  
        })
    })
}).catch(err => console.log(err))
            
    
function startup_other_processes () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            startup_finished = true;
            resolve(true);
        }, 1000)
    })
}

//static functions

function show_static_cpu_stats (data) {
    cpu_name_full.innerHTML = ` ${data.manufacturer} ${data.name}`;
    cpu_brand.innerHTML = ` ${data.manufacturer}`;
    utilization_tag.innerHTML = ` ${data.used}%`;
    cpu_cores_full.innerHTML = ` Physical ${data.physical_cores}, Logical ${data.cores}`;
    base_clock.innerHTML = ` ${data.base_clock}GHz`;
    console.log(data.base_clock)
}
