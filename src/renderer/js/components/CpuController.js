
/**
 * This class is the controller used for getting and returning new CPU information. 
 * The information included can be static information and recent data for stats over time.
 * @param si si is the systeminformation module instance used for determing some of the cpu's stats.
 * @param osutil is a npm module for finding network and memory usage.
 */
class _CPU {
    constructor (si, osutil) {
        // Required Modules
        this.si = si;
        this.osutil = osutil;
        this.allow_rendering_updates = true;

        // Base Info
        this.manufacturer;
        this.base_clock;
        this.cores;
        this.physical_cores;
        this.name;
        this.brand;

        //Recent Data
        this.most_recent = {free: 100, used: 0.01, system: 0.1, user: 0.19};
        this.recent = {free: [], used: [], system_used:[], user_used: []}

        this.get_base_stats();

        
    }

    /**
     * Gets the base static stats for the CPU in the users machine. This method includes manufacturer info,
     *  cores, clock speeds, and cpuid's
    @async
    @returns A Promise containin nothing unless a error occurs.
     */
    get_base_stats () {
        return new Promise((resolve, reject) => {
            this.si.cpu().then(data => {

                this.manufacturer = data.manufacturer;
                this.brand = data.brand;
                this.base_clock = data.speed;
                this.physical_cores = data.physicalCores;
                this.cores = data.cores;

                this.si.currentLoad().then(data => {
                    this.recent.used.unshift(parseFloat(data.currentload.toFixed(2)))
                    this.recent.system_used.unshift(parseFloat(data.currentload_system.toFixed(2)));
                    this.recent.user_used.unshift(parseFloat(data.currentload_user.toFixed(2)));
                    this.most_recent.free = parseFloat(100 - data.currentload.toFixed(2));
                    this.most_recent.used = parseFloat(data.currentload.toFixed(2));
                    this.most_recent.user = parseFloat(data.currentload_user.toFixed(2));
                    this.most_recent.system = parseFloat(data.currentload_system.toFixed(2));

                }).catch(err => reject(err));
                
            }).catch(err => reject(err)); 
            
            resolve(true)
        })

    }

    /**
     * Gets the CPU usage in this moment and adds the return values into a aray called this.recent
     * 
    @async
    @returns A Promise containin nothing unless a error occurs.
     */
    get_cpu_usage () {
        return new Promise((resolve, reject) => {
            
            this.si.currentLoad().then(data => {
                this.recent.used.unshift(parseFloat(data.currentload.toFixed(2)));
                this.recent.system_used.unshift(parseFloat(data.currentload_system.toFixed(2)));
                this.recent.user_used.unshift(parseFloat(data.currentload_user.toFixed(2)));

                
                this.most_recent.used = parseFloat(data.currentload.toFixed(2));
                this.most_recent.user = parseFloat(data.currentload_user.toFixed(2));
                this.most_recent.system = parseFloat(data.currentload_system.toFixed(2));
                this.most_recent.free = parseFloat(100 - data.currentload.toFixed(2));

                
            }).catch(err => reject(err));

            resolve();
        });
    }
    
}


_cpu = new _CPU(si, osutil);