
/**
 * This class is the controller used for getting and returning new CPU information. 
 * The information included can be static information and recent data for stats over time.
 * @param si si is the systeminformation module instance used for determing some of the cpu's stats.
 * @param osutil is a npm module for finding network and memory usage.
 * @param default_interval is the default interval the cpu should be getting new data with.
 */
class _CPU {
    constructor (si, osutil, default_interval) {
        // Required Modules
        this.si = si;
        this.osutil = osutil;

        // Interval Values
        this.update_interval = default_interval;
        this.allow_updates = true; // Used if nom updates shouldn be called

        // Base Info
        this.manufacturer;
        this.base_clock;
        this.cores;
        this.physical_cores;
        this.name;
        this.brand;

        //Recent Data
        this.most_recent = {free: 100, used: 0.01, system: 0.1, user: 0.19};
        this.recent = {free: [], used: [], time: []};

        this.interval_timer = undefined;
        this.ready = false;

       this.get_base_stats();
       this.start_running_interval_timer();
        
    }

    /**
     * Gets the base static stats for the CPU in the users machine. This method includes manufacturer info,
     *  cores, clock speeds, and cpuid's
    @async
    @returns A Promise containin nothing unless a error occurs.
     */
    get_base_stats () {
        this.si.cpu().then(data => {
            this.manufacturer = data.manufacturer;
            this.brand = data.brand;
            this.base_clock = data.speed;
            this.physical_cores = data.physicalCores;
            this.cores = data.cores;

            this.si.currentLoad().then(data => {
                this.recent.used.unshift(parseFloat(data.currentload.toFixed(2)));
                this.recent.free.unshift(100 - data.currentload.toFixed(2));
                this.recent.time.unshift(Date.now());

                this.most_recent.free = 100 - data.currentload.toFixed(2);
                this.most_recent.used = parseFloat(data.currentload.toFixed(2));
                this.most_recent.user = parseFloat(data.currentload_user.toFixed(2));
                this.most_recent.system = parseFloat(data.currentload_system.toFixed(2));

                
            }).catch(err => reject(err));
            
        }).catch(err => reject(err)); 

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
                this.recent.free.unshift(100 - data.currentload.toFixed(2));
                this.recent.time.unshift(Date.now());

                this.most_recent.used = parseFloat(data.currentload.toFixed(2));
                this.most_recent.user = parseFloat(data.currentload_user.toFixed(2));
                this.most_recent.system = parseFloat(data.currentload_system.toFixed(2));

                
            }).catch(err => reject(err));

            resolve();
        });
    }

    /**
     * Runs this function on every interval. This function is called in the function start_runniong_interval_timer
     * 
    @async
    @returns Does nopt return anything
     */
    async run_on_interval  () {
        if (this.allow_updates == true) {
            this.get_cpu_usage();
            
        } else {
            // do basically nothing here
            console.log('interval is doing basically nothing')
        }
    }

    
    /**
     * This function starts the interval and will run the decided functions interval every x seconds
     */
    start_running_interval_timer () {
        // if the timer hasw not been set then set it
        this.interval_timer = setInterval(() => {
            this.run_on_interval ();
        }, this.update_interval)

        console.log(`running new interval timer every ${this.update_interval}seconds`)

        this.ready = true;    
    }

    /**
     * Sets the new interval for updates.
     */
    set_new_interval (interval) {
        this.update_interval = interval;
        this.start_running_interval_timer();
    }

    /**
     * Clear the interval for the cpu.
     */
    clear_interval_timer () {
        clearInterval(this.interval_timer)
        this.interval_timer = undefined;


    }
}


let _cpu = new _CPU(si, osutil, 1500);