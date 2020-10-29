const { ipcMain } = require("electron");

module.exports =  {

    async get_initial_settings (storage) {
        return new Promise((resolve, reject) => {
            let return_settings = {
                theme: {
                    name: "default",
                    primary: "#ed553b",
                    secondary: "#f6d55c",
                    color_3: "#3caea3",
                    bg: "#292929",
                    bg_nav: "#ffffff",
                    base_links: "#afafaf",
                },
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
                
            };

            storage.get('user_settings', function(error, data) {
                if (error) throw error;
                console.log(data)

                if(data.length == undefined) {

                    storage.set("user_settings", return_settings, (err) => {
                        if(err) console.log(err);
                    })

                    resolve(return_settings);
                } else {
                    resolve(data)
                }
                
            });
            resolve(return_settings)
        });
       
    }
}
