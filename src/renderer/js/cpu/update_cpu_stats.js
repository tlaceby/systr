let has_shown_static_cpu_stats = false;
let used_tr = document.getElementById("used-tr")
let available_tr = document.getElementById("available-tr");
let time_tr = document.getElementById("time-tr");



function update_main_stats (recent, most_recent) {
    utilization_tag.innerHTML = ` ${recent.used[0]}%`;
    user_used.innerHTML = ` ${most_recent.user}%`;
    utilization_tag_two.innerHTML = ` ${most_recent.used}%`;
    system_used.innerHTML = ` ${most_recent.system}%`;
}

let update_cpu_interval;
let wait_for_init_interval;
let first_run = true;

wait_for_init_interval = setInterval(() => {
    if(startup_finished) {
        create_initial_table_timestamp(_cpu.update_interval);
        update_cpu_interval = setInterval(() => {
            run_on_cpu_interval();
        }, _cpu.update_interval)

        clearInterval(wait_for_init_interval)
    }
}, )

function run_on_cpu_interval () {
    if (first_run) {
        show_static_cpu_stats()
        first_run = false;
    }
    update_main_stats(_cpu.recent, _cpu.most_recent);
    update_table_data(_cpu.recent);
}

//static functions
function show_static_cpu_stats () {
    cpu_name_full.innerHTML = ` ${_cpu.manufacturer} ${_cpu.brand}`;
    cpu_maker.innerHTML = ` ${_cpu.manufacturer}`;
    cpu_brand.innerHTML = ` ${_cpu.brand}`;
    utilization_tag.innerHTML = ` ${_cpu.most_recent.used}%`;
    cpu_cores_full.innerHTML = ` Physical ${_cpu.physical_cores}, Logical ${_cpu.cores}`;
    base_clock.innerHTML = ` ${_cpu.base_clock}GHz`;
    ipcRenderer.send("show-app", true);
}


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