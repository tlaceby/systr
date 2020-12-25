let layout_select = document.getElementById("layout-profile");

let layout_profile;
/**
 * This function will run when the new settings have to be loaded  into the input fields
 */
function load_layout_profile () {
    layout_profile = _settings.settings.theme.layout_profile;



    layout_select.value = `${layout_profile}`;
    console.log(`Settings loaded: ${layout_profile}`)

}

load_layout_profile();
display_correct_cpu_layout (_settings.settings) // hide and show correct info


/**
 * 
 * This function will save the new interval settings into localstorage
 */
function change_layout_profile () {
    let settings_old = _settings.settings;

    settings_old.theme.layout_profile = layout_select.value;
    _settings.update_all(settings_old);
    cpu_current_layout = _settings.settings.theme.layout_profile;

    display_correct_cpu_layout (_settings.settings) // hide and show correct info
}
