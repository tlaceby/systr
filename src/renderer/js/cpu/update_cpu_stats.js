let has_shown_static_cpu_stats = false;
let used_tr = document.getElementById("used-tr")
let available_tr = document.getElementById("available-tr");
let time_tr = document.getElementById("time-tr");

let cpu_name_full = document.getElementById("processor-name");
let cpu_brand = document.getElementById("cpu-make");
let utilization_tag = document.getElementById("processor-utilization");
let cpu_cores_full = document.getElementById("cpu-cores-stats");
let cpu_maker = document.getElementById("cpu-maker");
let base_clock = document.getElementById("cpu-clock-base");
let system_used = document.getElementById("system-used")
let user_used = document.getElementById("user-used")
let utilization_tag_two = document.getElementById("processor-current-used")


function update_main_stats (recent, most_recent) {
    utilization_tag.innerHTML = ` ${recent.used[0]}%`;
    user_used.innerHTML = ` ${most_recent.user}%`;
    utilization_tag_two.innerHTML = ` ${most_recent.used}%`;
    system_used.innerHTML = ` ${most_recent.system}%`;
}


function show_static_cpu_stats (data) {
    cpu_name_full.innerHTML = ` ${data.manufacturer} ${data.brand}`;
    cpu_maker.innerHTML = ` ${data.manufacturer}`;
    cpu_brand.innerHTML = ` ${data.brand}`;
    utilization_tag.innerHTML = ` ${data.most_recent.used}%`;
    cpu_cores_full.innerHTML = ` Physical ${data.physical_cores}, Logical ${data.cores}`;
    base_clock.innerHTML = ` ${data.base_clock}GHz`;
    
}

let update_cpu_interval;
let wait_for_init_interval;

wait_for_init_interval = setInterval(() => {
    if(startup_finished) {
        create_initial_table_timestamp(_cpu.update_interval);
        show_static_cpu_stats(_cpu);
        update_cpu_interval = setInterval(() => {
            run_on_cpu_interval();
        }, _cpu.update_interval)

        clearInterval(wait_for_init_interval)
    }
}, )

function run_on_cpu_interval () {
    update_main_stats(_cpu.recent, _cpu.most_recent);
    update_table_data(_cpu.recent);
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