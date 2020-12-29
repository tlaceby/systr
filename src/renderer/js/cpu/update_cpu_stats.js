let cpu_current_layout = undefined;
let has_shown_static_cpu_stats = false;
let used_tr = document.getElementById("used-tr")
let available_tr = document.getElementById("available-tr");
let time_tr = document.getElementById("time-tr");


/**
 * 
 */
function update_main_stats (recent, most_recent) {
    utilization_tag_min.innerHTML = ` ${most_recent.system}%`;
    utilization_tag.innerHTML = ` ${recent.used[0]}%`;
    user_used.innerHTML = ` ${most_recent.user}%`;
    document.getElementById("cpu-used-minimal").innerHTML = ` ${_cpu.most_recent.used.toFixed(2)}%`
    document.getElementById("cpu-free-minimal").innerHTML = ` ${_cpu.most_recent.free.toFixed(2)}%`
    
    utilization_tag_two.innerHTML = ` ${most_recent.used}%`;
    system_used.innerHTML = ` ${most_recent.system}%`;

    draw_chart(_cpu.most_recent.used.toFixed(1),cpu_percent_chart);
    draw_chart(most_recent.system,system_percent_chart);
    draw_chart(most_recent.user , user_percent_chart);

}

let update_cpu_interval;
let wait_for_init_interval;
let first_run = true;
let current_interval_to_run = 0;
_memory.allow_rendering_updates = false;

/**
 * This interval runns every 300ms and checks for the _cpu class to be ready.
 * It will then pre-render the statis cpu stats that never change and then it will make a ipc call to show ther app.
 * This function will also start the timer used for the duration of the apps lifecyckle.
 */
wait_for_init_interval = setInterval(() => {
    if(startup_finished) {
        show_static_cpu_stats(_cpu)
        first_run = false;
        change_render_interval_cpu()
    }
        
}, 300)

/**
 * This function clears the previous interval and creates a new one to replace it. It also creates a new table header row by calling the 
 * function  create_initial_table_timestamp
 */
function change_render_interval_cpu () {
    clearInterval(update_cpu_interval)
    current_interval_to_run = _cpu.update_interval;
    create_initial_table_timestamp(_cpu.update_interval);
    update_cpu_interval = setInterval(() => {
        run_on_cpu_interval();
    }, _cpu.update_interval)

    clearInterval(wait_for_init_interval)

}

/**
 * This function runs every time the interval is needed. If the interval is 3000ms then this function runs evrery 3 seconds.
 * The function also checkes for a new interval valuer and if there is one it will call change_render_interval_cpu() to change the interval and reset itself.
 * */
function run_on_cpu_interval () {
    if (typeof _settings.settings == "object") display_correct_cpu_layout(_settings.settings);
    

    if(_cpu.allow_rendering_updates) {
        

        update_main_stats(_cpu.recent, _cpu.most_recent);
        if (_settings.settings.theme.layout_profile == "Data Heavy") {
            update_table_data(_cpu.recent);
        }

        
        if (current_interval_to_run != _cpu.update_interval) {
            console.log(`Old Interval:L ${current_interval_to_run}, newInterval: ${_cpu.update_interval}`)
            change_render_interval_cpu()
        }
    } else {
        
    }
}

//static functions
/**
 * This function shows the static cpu stats then will make a call to IPCMain to show the app window.
 */
function show_static_cpu_stats (_cpu) {
    document.getElementById("cpu-free-minimal").innerHTML = ` ${_cpu.most_recent.free.toFixed(2)}%`
    create_initial_table_timestamp(_cpu.update_interval);
    cpu_name_full.innerHTML = ` ${_cpu.manufacturer} ${_cpu.brand}`;
    cpu_maker.innerHTML = ` ${_cpu.manufacturer}`;
    cpu_brand.innerHTML = ` ${_cpu.brand}`;
    utilization_tag.innerHTML = ` ${_cpu.most_recent.used}%`;
    cpu_cores_full.innerHTML = ` Physical ${_cpu.physical_cores}, Logical ${_cpu.cores}`;
    base_clock.innerHTML = ` ${_cpu.base_clock}GHz`;

    cpu_name_full_min.innerHTML= ` ${_cpu.manufacturer} ${_cpu.brand}`;
    cpu_maker_min.innerHTML = ` ${_cpu.manufacturer}`;
    cpu_brand_min.innerHTML = ` ${_cpu.brand}`;
    utilization_tag_min.innerHTML = ` ${_cpu.most_recent.used}%`;
    cpu_cores_full_min.innerHTML = ` Physical ${_cpu.physical_cores}, Logical ${_cpu.cores}`;
    base_clock_min.innerHTML = ` ${_cpu.base_clock}GHz`;

    document.getElementById("cpu-used-minimal").innerHTML = ` ${_cpu.most_recent.used}%`
    console.log("showing app")
    ipcRenderer.send("show-app", true);
    

    update_main_stats(_cpu.recent, _cpu.most_recent)
}

/**
 * This function is a dynamic function that updates the tables cell data with new and more recent cpu usage stats. 
 * It loops through each table and then plots the new tr data
 */
function update_table_data (recent) {
     for (let i = 0; i < used_tr.children.length; i++) {
         if (recent.used.length <= i) {
             used_tr.children[i].innerHTML = `( n/a )%`;
         } else {
             if (i == 0) {
                used_tr.children[i].innerHTML = `Used`;
             } else {
                used_tr.children[i].innerHTML = ` ${recent.used[i].toFixed(1)}%`;
             }
         }
         
     }

     for (let i = 0; i < available_tr.children.length; i++) {
        if (recent.free.length <= i) {
            available_tr.children[i].innerHTML = `( n/a )%`;
        } else {
            if (i == 0) {
                available_tr.children[i].innerHTML = `Available`;
            } else {
                available_tr.children[i].innerHTML = `${recent.free[i].toFixed(1)}%`;
            }
        }
        
    }
}


/**
* This runs anytime the update_interval changes and will create the horizontal timestamp on the table. 
This is required to run everytime the interval changes or the settings page changes and reloads the interval.
*/
function create_initial_table_timestamp (interval) {
    for (let i = 0; i < time_tr.children.length; i++) {
        
        if( i == 0) {
            time_tr.children[i].innerHTML = `Time`;
        } else if (i == 1) {
            time_tr.children[i].innerHTML = `Recent`
        }
        else {
            time_tr.children[i].innerHTML = `${Math.round((interval * i) / 1000)}s`
        }
        
    }
}

function display_correct_cpu_layout (settings) {

    if(settings.theme.layout_profile == "Default" || settings.theme.layout_profile == "Minimal") {
        document.getElementById("cpu-heavy-data").style.display = "none";
        document.getElementById("cpu-minimal-data").style.display = "block";

    } else {
        document.getElementById("cpu-heavy-data").style.display = "block";
        document.getElementById("cpu-minimal-data").style.display = "none";
    }

}


function draw_chart (percentage, elem) {
    if (percentage < 1) percentage = 1;
    elem.style.width = percentage + "%";
}