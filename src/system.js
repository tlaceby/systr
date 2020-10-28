const { ipcMain } = require("electron");
let os = require("os-utils");

module.exports =  {

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