const { ipcMain } = require("electron");
let os = require("os-utils");

module.exports =  {

/**
 * Medium sized data call to the win-api for all static data about the users machine. 
 * CPU, Memory, GPU, OS, Motherboard, Network, Disk & Ports.
 * @function
 * @async
 * @param {object} si * System-information module instance.
 * @returns An object with all of the static stats and each property is a object with more in-depth stats.
 */
    async get_system_info_static (si) {
        let return_val = {
            cpu: {},
            memory: {},
            graphics: {},
            os: {},
            network: {},
            disk: {},
        }

        return new Promise(async (resolve, reject) => {
            await si.cpu()
                .then(data => return_val.cpu = data)
                .catch(error => console.error(error));
            await si.mem()
                .then(data => return_val.memory = data)
                .catch(err => console.log(err));
            await si.graphics()
                .then(data => return_val.graphics = data)
                .catch(err => console.log(err))
            await si.osInfo()
                .then(data => return_val.os = data)
                .catch(err => console.log(err))
            await si.networkInterfaces()
                .then(data => return_val.network = data)
                .catch(err => console.log(err))
            await si.diskLayout()
                .then(data => return_val.disk = data)
                .catch(err => console.log(err))


            resolve(return_val)
        })
    },

    /**
 * Small win-api call to gather all of the CPU usage data over the last 1 second. Can be called at 1s Interval
 * @function
 * @async
 * @param {object} si * System-information module instance.
 * @returns An object with CPU data.
 */
    async get_cpu_usage (si) {
        let return_value = {
            free: "free",
            used: "",
            cores: [],
            user: 0,
          }
        return new Promise(async (resolve, reject) => {
            await si.currentLoad()
                .then(data => {
                    return_value.used = data.currentload;
                    return_value.free = 100 - data.currentload;
                    return_value.cores = data.cpus;
                    return_value.user = data.currentload_user;
                })
            resolve(return_value)
        })
    }
}