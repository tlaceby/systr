
    /**
     * Object for operating with user settings and changing user's theme settings.
     * @class
     * @param {object} storage * electron-json-storage instance for checking the JSON storage.
     * @param {object} ipcRenderer * instance of the ipcRenderer for communication between the main thread.
     */
    class _PerformanceSettings {
        constructor (ipcRenderer) {
            this.ipcRenderer = ipcRenderer;
            
            this.settings = {
                cpu_settings: {
                    update_graph_interval: 3500,
                    cpu_graph_length: 10,
                    save_specs: {
                        enabled: false,
                        manufacturer: "undefined",
                        cores: null,
                        physical_cores: null,
                    }
                },
                memory_settings: {
                    memory_update_interval: 3000,
                    memory_graph_length: 10,
                },
                network_settings: {
                    network_update_interval: 3000,
                    network_graph_length: 10,
                },
            }
            
        }
    

    }


PerformanceSettings = new _PerformanceSettings(ipcRenderer);