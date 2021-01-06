
function show_processes_window () {
    ipcRenderer.send("create-process-window", true)
}

APP_STATE.on("resume-normal-usage", (e) => {
    _cpu.allow_rendering_updates = true;
    run_on_cpu_interval (); // run the cpu stats getting and display the results
    update_main_mem_stats(_memory.recent_data, _memory.totalmem); // update main memory stats
});


APP_STATE.on("use-minimal-usage", (e) => {
    _memory.allow_rendering_updates = false;
    _cpu.allow_rendering_updates = false;
});