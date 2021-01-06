function update_process_info (all_p) {
    let p = {};
    all_p.forEach(i => {
        if (i.name == current_viewed_process.name) {
            p = i;
        }
    });
    document.getElementById("process-name").innerHTML = current_viewed_process.name;
    document.getElementById("process-memory-usage").innerHTML = `${(current_viewed_process.memory_used).toFixed(2)}%`
    document.getElementById("process-cpu-usage").innerHTML = `${(current_viewed_process.cpu_used).toFixed(2)}%`
    current_viewed_process = p;
    draw_chart(current_viewed_process.memory_used, document.getElementById("memory-percentage-used"))
    draw_chart(current_viewed_process.cpu_used, document.getElementById("cpu-percentage-used"))

    document.getElementById("sub-processes").innerHTML = current_viewed_process.children_processes;
    document.getElementById("exe-level").innerHTML = current_viewed_process.priotity;
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


