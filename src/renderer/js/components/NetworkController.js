
/**
* Class for han dling network data and state of the network historical data.
 */
class _Network {
    constructor (si, osutil) {
        
        this.osutil = osutil;
        this.si = si;
        this.recent_data = {up: [],down: [], dropped: [], avg: [], last_call: 1000};
        this.recent_data_limit = 100;
        this.get_current_network_stats();
        this.allow_rendering_updates = true;
    }

    /**
     * Gets the current memory usage of the users system. This will also return the length of the arrays in use.
     */
    get_current_network_stats () {
        this.si.networkStats().then(data => {
            this.recent_data.up.unshift(data[0].tx_bytes);
            this.recent_data.down.unshift(data[0].rx_bytes);
            this.recent_data.dropped.unshift(data[0].rx_dropped + data.tx_dropped);
            this.recent_data.avg.unshift(data[0].tx_sec);
            this.recent_data.last_call = data[0].ms;
        })
    }

    /**
     * Gets the static stats of the memory sticks wand this will not change over time unless system restarts.
     */
    get_static_stats () {
    
    }
}

_network = new _Network(si, osutil);