let interval_sett;

let interval_input = document.getElementById("update_interval");


/**
 * This function will run when the new settings have to be loaded  into the input fields
 */
function load_initial_interval_settings () {
    interval_input.value = `${parseFloat(SystemStats.update_interval)}`;
    setTimeout(() => {
        document.getElementById("graph-length-max").value = MAX_GRAPH_TIME;
    }, 1000)

}

load_initial_interval_settings()

/**
 * 
 * This function will save the new interval settings into localstorage
 */
function save_setting_on_change () {
    let new_interval = interval_input.value;
    SystemStats.change_update_interval(parseFloat(new_interval, true));
    
}

function save_graph_length_settings () {
    MAX_GRAPH_TIME = document.getElementById("graph-length-max").value;
    localStorage.setItem("max-graph-time", document.getElementById("graph-length-max").value);
    console.log('sav')
    APP_STATE.emit("label-change")
}
