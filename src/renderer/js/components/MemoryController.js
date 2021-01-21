
/**
 * This class is used to view, edit, and change memory data. This object also has a timer used to update the memory totals evrry interval seconds.
 *@param si SystemInformation Module instance used to gather current and past memory usage.
 
 */
class _Memory {
    constructor (si, osutil) {
        
        this.osutil = osutil;
        this.si = si;
        this.recent_data = {mem_used: [],mem_free: [], mem_free_bytes: [], mem_used_bytes: []};
        this.recent_data_limit = 10;
        // other stats
        this.formFactor;
        this.allow_rendering_updates = true;
        this.memory_layout = []
        this.module_size = 0;
        this.lowest_clock = undefined;
        this.totalmem = this.osutil.totalmem()
        this.num_modules = 0;
        // Timer
        this.mem_voltage = 0.0;

        this.get_static_stats();
        this.get_current_stats()
    }

    clear_recent_data (limit) {

        this.recent_data.mem_free.pop()
        this.recent_data.mem_used.pop()
        this.recent_data.mem_used_bytes.pop()
        this.recent_data.mem_free_bytes.pop()
    }

    /**
     * Gets the current memory usage of the users system. This will also return the length of the arrays in use.
     */
    get_current_stats () {
        let free_per = this.osutil.freememPercentage();
        
        this.recent_data.mem_used.unshift(1 - free_per)
        this.recent_data.mem_free.unshift(free_per)

        this.recent_data.mem_free_bytes.unshift(this.osutil.freemem())
        this.recent_data.mem_used_bytes.unshift(this.totalmem - this.osutil.freemem())
        if (this.recent_data.mem_free.length > this.recent_data_limit) this.clear_recent_data(this.recent_data_limit);

        

    }

    /**
     * Gets the static stats of the memory sticks wand this will not change over time unless system restarts.
     */
    get_static_stats () {
        this.totalmem = this.osutil.totalmem()
        return new Promise((resolve, reject) => {
            this.si.memLayout().then(data => {
                let lowest_clock = 100000;
                let module_size = 0;
                data.forEach(memory_stick => {
                    this.mem_voltage = memory_stick.voltageConfigured;
                    this.memory_layout.push(memory_stick);
                    if (memory_stick.clockSpeed <= lowest_clock) {
                        lowest_clock = memory_stick.clockSpeed;
                    }
                    this.formFactor = memory_stick.formFactor;
                    this.num_modules += 1;
                   this.module_size = memory_stick.size;
                });

                this.lowest_clock = lowest_clock;
            }).catch(err => reject(err))
            this.ready = true;

            resolve()
        })
    }
}

_memory = new _Memory(si, osutil);