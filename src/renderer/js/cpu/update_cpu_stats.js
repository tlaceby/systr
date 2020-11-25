let has_shown_static_cpu_stats = false;

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


setInterval(() => {
    if (startup_finished == true) {
       
        update_main_stats(CPU.recent, CPU.most_recent);
    }
}, 1100)