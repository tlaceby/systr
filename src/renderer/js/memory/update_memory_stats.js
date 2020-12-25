
let has_shown_static_mem_stats = false;


/**
 * 
 */
function update_main_mem_stats (recent_stats) {

}

let update_mem_interval;
let wait_for_mem_init_interval;
let mem_first_run = true;
let current_mem_interval_to_run = 0;

/**
 * This interval runns every 300ms and checks for the _memory class to be ready.
 * It will then pre-render the statis memory stats that never change and then it will make a ipc call to show ther app.
 * This function will also start the timer used for the duration of the apps lifecyckle.
 */
wait_for_mem_init_interval = setInterval(() => {
    if(startup_finished && mem_first_run == true) {
        if (typeof _memory.totalmem !== "undefined") {
            show_static_mem_stats(_memory)
            mem_first_run = false;
            clearInterval(wait_for_init_interval)
            change_render_interval_mem()
        }
    }
}, 300)

/**
 * This function clears the previous interval and creates a new one to replace it. It also creates a new table header row by calling the 
 * function  create_initial_table_timestamp
 */
function change_render_interval_mem () {
    clearInterval(update_mem_interval)
    current_mem_interval_to_run = _memory.interval;
    create_initial_table_timestamp(_memory.interval);
    update_mem_interval = setInterval(() => {
        run_on_mem_interval ();
    }, _memory.interval)

}

/**
 * This function runs every time the interval is needed. If the interval is 3000ms then this function runs evrery 3 seconds.
 * The function also checkes for a new interval valuer and if there is one it will call change_render_interval_mem() to change the interval and reset itself.
 * */
function run_on_mem_interval () {

    if(_memory.allow_rendering_updates) {
        

        update_main_mem_stats(_memory.recent);
        if (current_mem_interval_to_run != _memory.interval) {
            console.log(`Old Interval: for mem: ${current_mem_interval_to_run}, newInterval: ${_memory.interval}`)
            change_render_interval_mem()
        }
    }
}

//static functions
/**
 * This function shows the static memory stats then will make a call to IPCMain to show the app window.
 */
function show_static_mem_stats (_memory) {

}
