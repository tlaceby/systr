
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
        this.most_recent = {free: 100, used: 0};
        this.recent = {free: [], used: [], time: []};

        this.interval_timer = undefined;

        this.get_base_stats();
        this.start_running_interval_timer();
        // Timer can be added and removed from this object at any time throughtb the classes lifecycle
    }

    /**
     * Gets the base static stats for the CPU in the users machine. This method includes manufacturer info,
     *  cores, clock speeds, and cpuid's
    @async
    @returns A Promise containin nothing unless a error occurs.
     */
    async get_base_stats () {
        return new Promise(async (resolve, reject) => {
            await this.si.cpu().then(data => {
                this.manufacturer = data.manufacturer;
                this.brand = data.brand;
                this.base_clock = data.speed;
                this.physical_cores = data.physicalCores;
                this.cores = data.cores;
                
            }).catch(err => reject(err)); 

            await this.si.currentLoad().then(data => {
                this.recent.used.unshift(data.currentload.toFixed(2));
                this.recent.free.unshift(100 - data.currentload.toFixed(2));
                this.recent.time.unshift(Date.now());

                this.most_recent.free = 100 - data.currentload.toFixed(2);
                this.most_recent.used = data.currentload.toFixed(2);
                
            }).catch(err => reject(err));


            resolve();

        });


    }

    /**
     * Gets the CPU usage in this moment and adds the return values into a aray called this.recent
     * 
    @async
    @returns A Promise containin nothing unless a error occurs.
     */
    async get_cpu_usage () {
        return new Promise(async (resolve, reject) => {
            
            await this.si.currentLoad().then(data => {
                console.log(this.model)
                this.recent.used.unshift(parseInt(data.currentload.toFixed(2)));
                this.recent.free.unshift(100 - data.currentload.toFixed(2));
                this.recent.time.unshift(Date.now());

                this.most_recent.free = 100 - data.currentload.toFixed(2);
                this.most_recent.used = parseInt(data.currentload.toFixed(2));
            }).catch(err => reject(err));

            resolve();
        });
    }

    run_on_interval  () {
        if (this.allow_updates == true) {
            this.get_cpu_usage();
            console.log('interval checking cpu data')
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
        if (typeof this.interval_timer == "undefined") {
            this.interval_timer = setInterval(() => {
                this.run_on_interval ();
            }, this.update_interval)
        }
    }

    /**
     * Sets the new interval for updates.
     */
    set_new_interval (interval) {
        this.update_interval = interval;
    }

    /**
     * Clear the interval for the cpu.
     */
    clear_interval_timer () {
        clearInterval(this.interval_timer)
        this.interval_timer = undefined;


    }
}

CPU = new _CPU(si, osutil, Settings.settings.cpu_settings.update_interval);