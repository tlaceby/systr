
/**
 * This class is used to view, edit, and change memory data. This object also has a timer used to update the memory totals evrry interval seconds.
 *@param si SystemInformation Module instance used to gather current and past memory usage.
 *@param interval Interval is a typeof Number reprersenting the update interval for Memory usage.
 */
class _Memory {
    constructor (si, osutil, interval) {
        this.totalmem = undefined;
        this.osutil = osutil;
        this.si = si;
        this.interval = interval;
        this.recent_data = {mem_used: [],mem_free: [],timsetamp: []};

        // other stats
        this.memory_layout = []

        // Timer
        this.ready = false;
        this.timer = undefined;
        this.should_update = true;
        this.allow_rendering_updates = true;

        this.create_timer()
        this.get_static_stats();
    }

    /**
     * Gets the current memory usage of the users system. This will also return the length of the arrays in use.
     */
    get_current_stats () {
        return new Promise((resolve, reject) => {
            this.si.mem().then((data) => {
                this.totalmem = data.total;
                this.recent_data.mem_used.push(data.used)
                this.recent_data.mem_free.push(data.free)
                this.recent_data.timsetamp.push(Date.now())

                resolve(this.recent_data.mem_used.length);
            }).catch(err => reject(err))
        })
    }

    /**
     * Gets the static stats of the memory sticks wand this will not change over time unless system restarts.
     */
    get_static_stats () {
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