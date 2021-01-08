/***** 
State Variables
 */


function hide_process_view () {
    window.scrollTo(0,0)
    document.getElementById("process-page").style.display = "none";
    document.getElementById("process-info").style.display = "block";
    is_viewing_process = false;
    clearInterval(process_update_interval)
    process_update_interval = undefined;
    clearInterval(update_graph_interval);
}

function show_process_view () {
    document.getElementById("process-page").style.display = "block";
    document.getElementById("process-info").style.display = "none";
    is_viewing_process = true;
}

hide_process_view()


STATE.on('view-process', (p) => {
    process_update_interval = setInterval(() => {
        update_process_info (ALL_PROCESSES);
        addData(chart, current_viewed_process.cpu_data)
    }, PROCESS_INTERVAL)
    show_process_view();
    
})

document.getElementById("back-process-search").addEventListener("click", (e) => {
    hide_process_view()
})

function addData(chart, cpu) {
    chart.data.datasets[0].data.unshift(cpu[0])
    if (chart.data.datasets[0].data.length > 15) chart.data.datasets[0].data.pop()
    chart.update()
}

//addData(chart, current_viewed_process.cpu_data)

