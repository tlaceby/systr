/***** 
State Variables
 */


function hide_process_view () {
    window.scrollTo(0,0)
    document.getElementById("process-page").style.display = "none";
    document.getElementById("process-info").style.display = "block";
    is_viewing_process = false;
    process_update_interval = undefined;
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
    }, 2000)
    show_process_view();
})

document.getElementById("back-process-search").addEventListener("click", (e) => {
    hide_process_view()
})