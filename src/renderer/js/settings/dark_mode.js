

document.onkeypress = function (e) {
    let is_dark_mode = localStorage.getItem("dark-mode");

    e = e || window.event;
    console.log(e.keyCode)
    if (e.keyCode == 4) {
        toggle_dark_mode ();
    }



}

set_default_dark_mode()


function reset_settings () {

    _settings.set_default_settings();
}

/**
 * Called everytime the theme will change. This inverts the colors and then finally saves the new dark mode value using save_theme_settings
 */
function toggle_dark_mode () {
    let is_dark_mode = localStorage.getItem("dark-mode");

    if (typeof is_dark_mode != "string" || is_dark_mode == undefined || is_dark_mode == "false"){
        is_dark_mode = "true";
    } else {
        is_dark_mode = "false";
    }

    // change dark-theme to new values

     document.documentElement.classList.toggle("dark-mode");
 
     document.querySelectorAll(".inverted").forEach(q => {
         q.classList.toggle("invert");
     });
 
     document.querySelectorAll(".sub-text-minimal").forEach(q => {
            
         q.classList.toggle("invert-text-dark")
     })


    save_theme_settings(is_dark_mode);

    // save new dark-mode settings
}

/**
 * Sets the new value of dark-mode in localStorage
 * @param {*} current_value Either the toString() of True and False
 */
function save_theme_settings (current_value) {
    localStorage.setItem("dark-mode", current_value);
}

function set_default_dark_mode () {
    let is_dark_mode = localStorage.getItem("dark-mode"); 
    if (typeof is_dark_mode != "string" || is_dark_mode == undefined){
        is_dark_mode = "true";
        localStorage.setItem("dark-mode", "true");
        console.log("failed the dark-mode check")
    }

    // change dark-theme to new values

    if (is_dark_mode == "false") {
        document.documentElement.classList.toggle("dark-mode");
 
        document.querySelectorAll(".inverted").forEach(q => {
            q.classList.toggle("invert");
        });
    
        document.querySelectorAll(".sub-text-minimal").forEach(q => {
               
            q.classList.toggle("invert-text-dark")
        })
    }
}