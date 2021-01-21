
/**

 */
class _Network {
    constructor (si, osutil) {
        
        this.osutil = osutil;
        this.si = si;
        this.recent_data = {up: [],down: [], dropped: [], avg: []};
        this.recent_data_limit = 100;
        this.get_current_network_stats();
    }

    /**
     * Gets the current memory usage of the users system. This will also return the length of the arrays in use.
     */
    get_current_network_stats () {
        this.si.networkStats().then(data => {
            
        })
    }

    /**
     * Gets the static stats of the memory sticks wand this will not change over time unless system restarts.
     */
    get_static_stats () {
    
    }
}

_network = new _Network(si, osutil);