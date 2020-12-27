
    /**
     * Object for operating with user settings.
     * @class
     */
    class _Settings {
        constructor(ipcRenderer) {
            this.ipcRenderer = ipcRenderer;
            this.ready = false;
            this.settings = {}
            
            this.configure_settings();
         
        }

        /**
         * Called once in the constructor and will check for settings in localstorage. 
         * If the settings exist it will return them and append them to this.settings. 
         * if the settings dont exist already or an error returns, it will create default settings to use and set them in storage.
         * @method
         * @constructor
         * @returns Returns a settings object and also sets the settings in the class.
         */
       async configure_settings () {
            return new Promise(async (resolve, reject) => {
             let settings = await this.get_all();

             if (settings == null || settings == undefined) {
                 // if the settings are not there create a default settings
                this.set_default_settings();
                console.log('setting old settings')
             } else {
                this.settings = settings;
                console.log("old settings retreived")
                resolve(this.settings);
                this.ready = true;
             }
            });
        }

        /**
         * Returns all the settings and will create settings if none exist
         * @method
         * @returns Returns a settings object and also sets the settings in the class to be overwritten.
         */
        get_all () {
            
            let r = localStorage.getItem("settings");
            if (r == null) {
                return null;
            } else {
                return JSON.parse(r)
            }
        }

        /**
         * Updates settings to givena  object containing the proper values.
         * @param settings_obj Must be a object that contains all the proper fields. If any are missing the set_defaults will be called as a result.
         * @method
         */
        update_all (settings_obj) {
            this.settings = settings_obj;
            localStorage.setItem("settings", JSON.stringify(settings_obj));
        }

        /**
         * Resets settings to default values
         * @method
         */
        async set_default_settings() {
            return new Promise((resolve,reject) => {

                this.settings = {
                    cpu_settings: {
                        update_interval: 3500,
                        cpu_graph_length: 10,
                        save_specs: false,
                    },
                    memory_settings: {
                        memory_update_interval: 3000,
                        memory_graph_length: 10,
                    },
                    network_settings: {
                        network_update_interval: 3000,
                        network_graph_length: 10,
                        network_traffic_threshold : "Light Traffic >= 4mb / Minute"
                    },
                    gpu_settings: {
                        gpu_update_interval: 3000,
                    },
                    theme: {
                        layout_profile: "Minimal",
                        theme: "Dark",
                        dark_theme: {
                            color1 :  "#ed553b",
                            color2 : "#f6d55c",
                            color3 : "#3caea3",
                            primary_text: "#ffffff",
                            secondary_text: "#d3d3d3",
                            third_text : "#f3f3f3",
                            bg : "#292929",
                            bg_nav : "#ffffff",
                            base_links :  "#afafaf",
                        },
                    },
                    app_performance: {
                        startup_preferences : "CPU",
                        open_startup: true,
                        render_interval: 3500,
                        allow_caching: true,
                        performance_mode: "Default - Most Machines"
                    }
                }

                localStorage.setItem("dark-mode", "true");
                localStorage.setItem("dark-mode", "true");
    
                localStorage.setItem("settings", JSON.stringify(this.settings));
                this.ready = true;
                resolve();
            })

        }

    

    }

let _settings = new _Settings(ipcRenderer);
