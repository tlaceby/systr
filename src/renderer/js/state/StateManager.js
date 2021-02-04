
let settings_page = document.getElementById("settings-section");
let cpu_page = document.getElementById("cpu-section");
let memory_page = document.getElementById("memory-section");
let network_page = document.getElementById("network-section");
let overview_page = document.getElementById("overview-section");
/**
 * Loads and slides in the settings page. Takes other pages and elements out of the view.
 * @function
 */
function load_settings_page () {
    if(current_page != "settings") {
        hide_all_pages();
        settings_page.classList.remove("hidden");
        current_page = "settings"

        settings_page.classList.add("animate-in")
        setTimeout(() => {
            settings_page.classList.remove("animate-in");
        }, 1500)
    }
    document.getElementById("settings").classList.add("active-link");
}

/**
 * Loads and slides in the CPU page. Takes other pages and elements out of the view.
 * @function
 */
function load_cpu_page () {
    if(current_page != "cpu") {
        hide_all_pages();
        _cpu.allow_rendering_updates = true;
        cpu_page.classList.remove("hidden");
        cpu_page.classList.add("animate-in")
        setTimeout(() => {
            cpu_page.classList.remove("animate-in");
        }, 1500)
        
        current_page = "cpu";
    }
    document.getElementById("cpu").classList.add("active-link")
    _memory.allow_rendering_updates = false;
}

function load_memory_page () {
    if(current_page != "memory") {
        hide_all_pages();
        memory_page.classList.remove("hidden");
        _memory.allow_rendering_updates = true;
        memory_page.classList.add("animate-in")
        setTimeout(() => {
            memory_page.classList.remove("animate-in");
        }, 1500)
        current_page = "memory"
    }
    document.getElementById("memory").classList.add("active-link")
}

function load_network_page () {
    if(current_page != "network") {
        hide_all_pages();
        network_page.classList.remove("hidden");
        current_page = "network"
        _network.allow_rendering_updates = true;
    }
    document.getElementById("network").classList.add("active-link")
}

function load_overview_page () {
    if(current_page != "overview") {
        hide_all_pages();
        overview_page.classList.remove("hidden");
        stop_updating_stats();
        overview_page.classList.add("animate-in")
        setTimeout(() => {
            overview_page.classList.remove("animate-in");
        }, 1500)
        current_page = "overview"
    }
    document.getElementById("system").classList.add("active-link")
}

/**
 * display = None to all of the pages and outer containers for pages.
 * @function
 */
function hide_all_pages () {
    remove_all_link_effects()
    settings_page.classList.add("hidden");
    cpu_page.classList.add("hidden");
    memory_page.classList.add("hidden");
    network_page.classList.add("hidden");
    overview_page.classList.add("hidden")
    stop_updating_stats()
}


function stop_updating_stats () {
    _cpu.allow_rendering_updates = false;
    _memory.allow_rendering_updates = false;
    _network.allow_rendering_updates = false;
}

function allow_updating_stats () {
    _cpu.allow_rendering_updates = true;
    _memory.allow_rendering_updates = true;
    _network.allow_rendering_updates = true;
}

/**
 * Removes all link effects and hover effects for the active links on the nav-bar.
 * @function
 */
function remove_all_link_effects () {
    document.getElementById("cpu").classList.remove("active-link")
    document.getElementById("settings").classList.remove("active-link")
    document.getElementById("memory").classList.remove("active-link")
    document.getElementById("network").classList.remove("active-link")
    document.getElementById("system").classList.remove("active-link")
}
