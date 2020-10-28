const { ipcMain } = require("electron");
let os = require("os-utils")

module.exports =  {

    get_initial_stats (storage) {
        return new Promise((resolve, reject) => {
            let return_stats = {
                cpu: {
                    cpu_name: String,
                    base_clock_speed: Number,
                    manufacturer: String,
                    physical_cores: Number,
                    total_cores: Number,
                },
                memory: {
                    total_gb: Number,
                    gb_used: Number,
                    gb_free: Number,
                },
                system: {
                    bios: String,
                    motherboard: String,
                    os: String,
                    version: String,
                    monitor: Array
                }    
            };

            resolve(return_stats);
        });
    }
}
