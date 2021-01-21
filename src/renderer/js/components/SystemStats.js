
/**
 * Class for gathering and storing data for All Mejor System Stats. Used for real-time-recent data and also holds historical stats of specific data.
 * 
 */
class _SystemStats {  
    constructor (_cpu, _mem, _network, _io) {
        // Classes for Components
        this.CPU = _cpu
        this.MEMORY = _mem
        this.NETWORK = _network
        this.IO = _io

        // Global Variables
        this.update_interval;
        this.update_loop = undefined; // the interval object that will be crrated later.
        this.ready = false; // default to false. set to true when everything has initialized
        this.err = undefined;

        this.init().then((f) => {
            this.ready = true;
        }).catch(err => console.log(err));
    }

    /**
     * Checks the settings of the update interval. Then starts the 
     */
    init() {
        return new Promise((resolve, reject) => {
            let inter = localStorage.getItem("global-update-interval");
            
            if (typeof inter != "string") {
                localStorage.setItem("global-update-interval", 2500);
                this.update_interval = 2500;
            } else {
                this.update_interval = parseFloat(inter);
            }

            this.change_update_interval().then(() => {
                resolve(true);
            })
        })
    }

    /**
     * Changes the update interval for retreiving the system stats.
     * @param  new_interval Integer value containing the new interval to use.
     * @param set Boolean value that defauults to false. If true then it will change the actual value of the interval in settings.
     */
    change_update_interval (interval = this.update_interval, set = false) {
        return new Promise((resolve, reject) => {
            if (set) {
                localStorage.setItem("global-update-interval", parseFloat(interval));
                this.update_interval = parseFloat(interval);
            }
    
            // set the actual update interval
            this.update_loop = setInterval(() => {
                this.run_on_interval();
            }, this.update_interval)

            resolve();
        })

    }

    /**
     * Runs contents of function every time the interval is to be run.
     */
    run_on_interval () {
        console.time("interval");
        this.CPU.get_cpu_usage();
        this.MEMORY.get_current_stats();
        this.NETWORK.get_current_network_stats();
        console.timeEnd("interval");
    }


}

const SystemStats = new _SystemStats(_cpu, _memory, _network);