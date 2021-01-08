
function update_process_info (all_p) {
    let p = {};

    all_p.forEach(i => {
        if (i.name == current_viewed_process.old.name) {
            p = i;   
        }
    }); 
    current_viewed_process.old = p;
    current_viewed_process.cpu_data.unshift(p.cpu_used.toFixed(2))

    if (current_viewed_process.cpu_data.length > MAX_LENGTH_OF_RECENT_PROCESSES) {
        current_viewed_process.cpu_data.pop()
    }

    document.getElementById("process-name").innerHTML = current_viewed_process.old.name;
    document.getElementById("process-memory-usage").innerHTML = `${(current_viewed_process.old.memory_used).toFixed(2)}%`
    document.getElementById("process-cpu-usage").innerHTML = `${(current_viewed_process.old.cpu_used).toFixed(2)}%`

    draw_chart(current_viewed_process.old.memory_used, document.getElementById("memory-percentage-used"))
    draw_chart(current_viewed_process.old.cpu_used, document.getElementById("cpu-percentage-used"))

    document.getElementById("sub-processes").innerHTML = current_viewed_process.old.children_processes;
    document.getElementById("exe-level").innerHTML = current_viewed_process.old.priotity;

}

document.getElementById("mem-bar").addEventListener("mouseenter", (e) => {
    document.getElementById("process-memory-usage").style.color = "#ed553b";
})

document.getElementById("mem-bar").addEventListener("mouseleave", (e) => {
    document.getElementById("process-memory-usage").style.color = "#f6f6f6";
})

document.getElementById("cpu-bar").addEventListener("mouseenter", (e) => {
    document.getElementById("process-cpu-usage").style.color = "#3caea3";
})

document.getElementById("cpu-bar").addEventListener("mouseleave", (e) => {
    document.getElementById("process-cpu-usage").style.color = "#fff";
})


function draw_chart (percentage, elem) {
    let current_percentage = elem.style,width;

    if (percentage <= 1) percentage = Math.random();
    elem.style.width = percentage + "%";

}