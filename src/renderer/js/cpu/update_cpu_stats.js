
let cpu_current_layout = undefined;
let has_shown_static_cpu_stats = false;
let used_tr = document.getElementById("used-tr")
let available_tr = document.getElementById("available-tr");
let time_tr = document.getElementById("time-tr");


/**
 * This will actually render the CPU stats and fill in the dom. This function is GPU intensive and should be run little.
 * @param recent Recent stats contained in the _cpu array
 * @param  most_recent This array contains the common most recent stats.
 */
function update_main_stats (recent, most_recent) {

    let used = _cpu.most_recent.used.toFixed(2);
    let free = _cpu.most_recent.free.toFixed(2);

    if (used <= 0.00) used = 0.01;
    if (free <= 0.00) free = 0.01;

    utilization_tag_min.innerHTML = ` ${most_recent.system}%`;
    utilization_tag.innerHTML = ` ${recent.used[0]}%`;
    user_used.innerHTML = ` ${most_recent.user}%`;
    document.getElementById("cpu-used-minimal").innerHTML = ` ${used}%`
    document.getElementById("cpu-free-minimal").innerHTML = ` ${free}%`
    
    utilization_tag_two.innerHTML = ` ${used}%`;
    system_used.innerHTML = ` ${most_recent.system}%`;

    update_line_chart_cpu (chart_cpu, recent.used, recent.user_used, recent.system_used);
    draw_chart(used,cpu_percent_chart);
    draw_chart(most_recent.system,system_percent_chart);
    draw_chart(most_recent.user , user_percent_chart);
}

let update_cpu_interval;
let first_run = true;
let current_interval_to_run = 0;
_memory.allow_rendering_updates = false;

    MAX_GRAPH_TIME = localStorage.getItem("max-graph-time");

    if (typeof MAX_GRAPH_TIME !== "string") {
        localStorage.setItem("max-graph-time", "60"); 
        MAX_GRAPH_TIME = 60;
    } else {
        MAX_GRAPH_TIME = parseInt(MAX_GRAPH_TIME);
    }


// RUN's on startup after the main data is ready to be rendered at first. 
APP_STATE.on("ready", () => {
    if(startup_finished) {
        show_static_cpu_stats()
        first_run = false;
        change_render_interval_cpu()
    }
})

/**
 * This function clears the previous interval and creates a new one to replace it. It also creates a new table header row by calling the 
 * function  create_initial_table_timestamp
 */
function change_render_interval_cpu () {
    clearInterval(update_cpu_interval)
    current_interval_to_run = SystemStats.update_interval;
    create_initial_table_timestamp(SystemStats.update_interval);
    update_cpu_interval = setInterval(() => {
        run_on_cpu_interval();
    }, SystemStats.update_interval)
    
    set_labels(current_interval_to_run, MAX_GRAPH_TIME, chart_cpu)
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

        
        if (current_interval_to_run != SystemStats.update_interval) {
            console.log(`Old Interval:L ${current_interval_to_run}, newInterval: ${SystemStats.update_interval}`);
            change_render_interval_cpu()
        }
    } else {
        
    }
}

//static functions
/**
 * This function shows the static cpu stats then will make a call to IPCMain to show the app window.
 */
function show_static_cpu_stats () {

    if (typeof _cpu.manufacturer !== "string") {
        setTimeout(() => {
            show_static_cpu_stats()
        }, 300)
    } else {
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
        update_main_stats(_cpu.recent, _cpu.most_recent)
        ipcRenderer.send("show-app", true);
    }


}

/**
 * This function is a dynamic function that updates the tables cell data with new and more recent cpu usage stats. 
 * It loops through each table and then plots the new tr data
 */
function update_table_data (recent) {

    if (isInViewport(used_tr)) {

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


    } else {
        console.log("not rendering - "+ elem.id)
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

/**
 * This switches the layout for displaying Heavy and Light Stats. Will hide correct elements on setting change.
 * @param settings  The settings Class
 */
function display_correct_cpu_layout (settings) {

    if(settings.theme.layout_profile == "Default" || settings.theme.layout_profile == "Minimal") {
        document.getElementById("cpu-heavy-data").style.display = "none";
        document.getElementById("cpu-minimal-data").style.display = "block";

    } else {
        document.getElementById("cpu-heavy-data").style.display = "block";
        document.getElementById("cpu-minimal-data").style.display = "none";
    }

}

/**
 * Draws a horizontal bar chart for a corseponding element given a) percentage and b) element's Node value.
 * @param percentage The percentage of the chart to fill wide.
 * @param elem The actual DOM element for the chart.
 * @param time Not Implimented yet. But this is the delay between the startr and endTime of the rendering amnimation.
 */
function draw_chart (percentage, elem, time) {

    if (isInViewport(elem)) {
        if (percentage <= 1) {percentage = Math.random();}
        elem.style.width = percentage + "%";
    }

}

/**
 * Sets the labels for the Chart.js Chart and determines the correct scale to use based on min, max and data values.
 * @param {*} int The interval in MiliSeconds. if the max length of the chart is in Time then make sure it is the form of 1000 = 1s.
 * @param {*} max Max amount of X-Cordinates.
 * @param {*} chart The DOM element of the chart to be rendere3d and efected.
 */
function set_labels (int, max, chart) {
    let count = 0;
    let labels = [];
    while (count <= max ) {
        labels.push(`${count}s`)
        count += (int / 1000);
    }

    chart.data.labels = labels;
    chart.update()
}

function update_line_chart_cpu (chart, cpu_data, user_data, system_data) {

    // only render chart if its in view
    if (isInViewport(document.getElementById("cpuChart"))) {
        chart.data.datasets[0].data.unshift(cpu_data[0])
        chart.data.datasets[1].data.unshift(user_data[0])
        chart.data.datasets[2].data.unshift(system_data[0])
        if (chart.data.datasets[0].data.length > (MAX_GRAPH_TIME)) {
            chart.data.datasets[0].data.pop()
            chart.data.datasets[1].data.pop()
            chart.data.datasets[2].data.pop()
        }
        chart.update();
    }
}

//addData(chart, current_viewed_process.cpu_data)

APP_STATE.on("label-change", (e) => {
    set_labels(current_interval_to_run, MAX_GRAPH_TIME, chart_cpu);
})