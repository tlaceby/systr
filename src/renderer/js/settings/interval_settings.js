let cpu_interval, gpu_interval, mem_interval;

let cpu_interval_input = document.getElementById("cpu_update_interval");
let gpu_interval_input = document.getElementById("gpu_update_interval");
let mem_interval_input = document.getElementById("memory_update_interval");

/**
 * This function will run when the new settings have to be loaded  into the input fields
 */
function load_initial_interval_settings () {
    cpu_interval = _settings.settings.cpu_settings.update_interval;
    gpu_interval = _settings.settings.gpu_settings.gpu_update_interval;
    mem_interval = _settings.settings.memory_settings.memory_update_interval;


    cpu_interval_input.value = `${cpu_interval}`;
    gpu_interval_input.value = `${gpu_interval}`;
    mem_interval_input.value = `${mem_interval}`;

    //console.log(`${cpu_interval}`)

}

load_initial_interval_settings()


/**
 * 
 * This function will save the new interval settings into localstorage
 */
function save_setting_on_change (interval_to_update) {
    let settings_old = _settings.settings;

    switch (interval_to_update) {
        case 'cpu':
            settings_old.cpu_settings.update_interval = parseInt(cpu_interval_input.value);
            _settings.update_all(settings_old);
            _cpu.set_new_interval(_settings.settings.cpu_settings.update_interval)
            break;
        case 'gpu':
            settings_old.gpu_settings.gpu_update_interval = parseInt(gpu_interval_input.value);
            _settings.update_all(settings_old);
            break;
        case "memory":
            _memory.set_new_interval(_settings.settings.memory_settings.memory_update_interval)
            settings_old.memory_settings.memory_update_interval = parseInt(mem_interval_input.value);
            _settings.update_all(settings_old);
            break;

        default:
            break;
    }
}