
/**
 * This class is used to view, edit, and change memory data. This object also has a timer used to update the memory totals evrry interval seconds.
 *@param si SystemInformation Module instance used to gather current and past memory usage.
 *@param interval Interval is a typeof Number reprersenting the update interval for Memory usage.
 */
class _Memory {
    constructor (si, osutil, interval) {
        
        this.osutil = osutil;
        this.si = si;
        this.interval = interval;
        this.recent_data = {mem_used: [],mem_free: [], mem_free_bytes: [], mem_used_bytes: []};
        this.recent_data_limit = 10;
        // other stats
        this.memory_layout = []

        this.totalmem = this.osutil.totalmem()
        // Timer
        this.ready = false;
        this.timer = undefined;
        this.should_update = true;
        this.allow_rendering_updates = true;

        this.create_timer()
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
                data.forEach(memory_stick => {
                    this.memory_layout.push(memory_stick);
                });
            }).catch(err => reject(err))
            this.ready = true;

            resolve()
        })
    }

    /**
     * Runs every x secondas and  will update the clasees values.
     */
    run_on_timer () {
        if (this.should_update) this.get_current_stats();
    }

    create_timer () {
        clearInterval(this.timer);
        this.timer = setInterval (() => {
            this.run_on_timer();
        }, this.interval)

        this.ready = true;
    }

    set_new_interval (interval) {
        this.interval = interval;
        this.create_timer();
    }
}

_memory = new _Memory(si, osutil, 2000);