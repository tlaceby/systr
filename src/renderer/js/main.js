
let startup_finished = false;
/**
 * This is a string that contains the name of the current page in view of the renderer.Default is "cpu", however this can change due to settings as well.
 * @global
 */
let current_page = "cpu";
            
    
function startup_other_processes () {
    return new Promise((resolve, reject) => {
        resolve(true);
    })
}

let check_for_finished_interval;


check_for_finished_interval = setInterval(() => {
    console.log(`Settings- ${_settings.ready}. startup - ${startup_finished}. cpu - ${_cpu.ready}. Memory - ${_memory.ready}`)
    if (_settings.ready == true && _cpu.ready == true && _memory.ready == true) {
        console.log(_cpu.ready)
        _cpu.set_new_interval(_settings.settings.cpu_settings.update_interval)
        _memory.set_new_interval(_settings.settings.memory_settings.memory_update_interval)
        startup_finished = true;
        clearInterval(check_for_finished_interval);
        startup_other_processes()
    }


}, 300)
