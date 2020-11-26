
let open_startup_check = document.getElementById("open-at-startup");
let load_profile = document.getElementById("load-profile");
let allow_prev_cache = document.getElementById("allow-previous-cache");



let startup_preferences, open_startup, allow_cache;

function get_startup_settings_and_load (settings) {
    
    open_startup = settings.open_startup;
    startup_preferences = settings.startup_preferences;
    allow_cache = settings.allow_caching;

    ipcRenderer.send("set-auto-start", open_startup);
    if (open_startup) {
        
        if (!open_startup_check.checked) {
            open_startup_check.toggleAttribute("checked")
            
        }
    }
    
}

function change_startup_settings() {
    ipcRenderer.send("set-auto-start", !open_startup);
    open_startup = !open_startup;
    let settings_old = _settings.settings;
   
    settings_old.app_performance.open_startup = open_startup;

    _settings.update_all(settings_old);
    console.log(_settings.settings);
    
}

get_startup_settings_and_load(_settings.settings.app_performance)