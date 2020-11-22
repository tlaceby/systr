
    /**
     * Object for operating with user settings and changing user's theme settings.
     * @class
     * @param {object} storage * electron-json-storage instance for checking the JSON storage.
     * @param {object} ipcRenderer * instance of the ipcRenderer for communication between the main thread.
     */
class _ThemeSettings {
    constructor (ipcRenderer) {
        this.ipcRenderer = ipcRenderer;
        
        this.name = 'default';
        this.startup_preferences = "CPU";
        this.primary =  "#ed553b";
        this.secondary = "#f6d55c";
        this.color_3 = "#3caea3";
        this.bg = "#292929";
        this.bg_nav = "#ffffff";
        this.base_links =  "#afafaf";
        
    }

}

ThemeSettings = new _ThemeSettings(ipcRenderer);