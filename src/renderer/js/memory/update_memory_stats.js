let show_gb_memory_stats = false;
let has_shown_static_mem_stats = false;


/**
 * Used to toggle the value format for the memory page. GB or % Can be toggled and this function simply inverts the values.
 */
function toggle_mem_mode () {

    if (show_gb_memory_stats) document.getElementById("mem-mode-btn").value = "Toggle Metric GB"
    if (!show_gb_memory_stats) document.getElementById("mem-mode-btn").value = "Toggle Metric %"

    show_gb_memory_stats = !show_gb_memory_stats;

    update_main_mem_stats(_memory.recent_data, _memory.totalmem);
}

/**
 * Update and render the memory stats on the DOM.
 */
function update_main_mem_stats (recent_stats, totalmem, profile) {

    if (show_gb_memory_stats)  {
        mem_free_min.innerHTML = ` ${parseFloat(recent_stats.mem_free_bytes[0] / 1000).toFixed(2)}GB`;
        mem_used_min.innerHTML = ` ${parseFloat(recent_stats.mem_used_bytes[0] / 1000).toFixed(2)}GB`;
    } else {
        mem_free_min.innerHTML = ` ${parseFloat(recent_stats.mem_free[0] * 100).toFixed(2)}%`;
        mem_used_min.innerHTML = ` ${parseFloat(recent_stats.mem_used[0] * 100).toFixed(2)}%`;
    }

    draw_chart(parseFloat(recent_stats.mem_free[0] * 100).toFixed(2),memory_free_chart);
    draw_chart(parseFloat(recent_stats.mem_used[0] * 100).toFixed(2), memory_used_chart);
}

let update_mem_interval;
let mem_first_run = true;
let current_mem_interval_to_run = 0;


APP_STATE.on("ready", () => {
    if(startup_finished && mem_first_run == true) {
        if (typeof _memory.totalmem !== "undefined") {
            show_static_mem_stats(_memory);
            mem_first_run = false;
            change_render_interval_mem()
            update_main_mem_stats(_memory.recent_data, _memory.totalmem);
        }
    }
})
/**
 * This function clears the previous interval and creates a new one to replace it. It also creates a new table header row by calling the 
 * function  create_initial_table_timestamp
 */
function change_render_interval_mem () {
    clearInterval(update_mem_interval)
    current_mem_interval_to_run = SystemStats.update_interval;
    create_initial_table_timestamp(SystemStats.update_interval);
    update_mem_interval = setInterval(() => {
        run_on_mem_interval ();
    }, SystemStats.update_interval)

}

/**
 * This function runs every time the interval is needed. If the interval is 3000ms then this function runs evrery 3 seconds.
 * The function also checkes for a new interval valuer and if there is one it will call change_render_interval_mem() to change the interval and reset itself.
 * */
function run_on_mem_interval () {
    if(_memory.allow_rendering_updates) {

        update_main_mem_stats(_memory.recent_data, _memory.totalmem);
        if (current_mem_interval_to_run != SystemStats.update_interval) {
            console.log(`Old Interval: for mem: ${current_mem_interval_to_run}, newInterval: ${SystemStats.update_interval}`)
            change_render_interval_mem()
        }
    }
}

//static functions
/**
 * This function shows the static memory stats then will make a call to IPCMain to show the app window.
 */
function show_static_mem_stats (_memory) {
    mem_total.innerHTML = `${(_memory.totalmem / 1000).toFixed(2)}GB`;
    mem_freq.innerHTML = `${(_memory.lowest_clock)}MHz`;
    mem_module_sizes.innerHTML = `${(_memory.module_size / 1000000000).toFixed(1)}GB`;
    mem_dims_total.innerHTML = ` ${_memory.num_modules} Modules`;
    mem_voltage.innerHTML = ` ${_memory.mem_voltage}`;
    mem_form_factor.innerHTML = `${_memory.formFactor}`;
    console.log(_memory.formFactor)

    // check for wierd or n/a values and replace it with N/A
    if (_memory.mem_voltage - 0) {mem_voltage.innerHTML = ` N/A`;}
    if (_memory.formFactor == "") {mem_form_factor.innerHTML = ` N/A`;}

    // Draw the stationary Bar Charts
    draw_chart(parseFloat(_memory.recent_data.mem_free[0] * 100).toFixed(2),memory_free_chart);
    draw_chart(parseFloat(_memory.recent_data.mem_used[0] * 100).toFixed(2), memory_used_chart);
}

