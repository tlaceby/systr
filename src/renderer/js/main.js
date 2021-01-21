
let startup_finished = false;
/**
 * This is a string that contains the name of the current page in view of the renderer.Default is "cpu", however this can change due to settings as well.
 * @global
 */
let current_page = "cpu";
            
    
function startup_other_processes () {
    return new Promise((resolve, reject) => {
        APP_STATE.emit("ready");
        resolve(true);
    })
}

let check_for_finished_interval;


check_for_finished_interval = setInterval(() => {
    
    if (SystemStats.ready) {
        startup_finished = true;
        clearInterval(check_for_finished_interval);
        startup_other_processes()
        APP_STATE.emit("startup-finished")
    }

}, 300)
