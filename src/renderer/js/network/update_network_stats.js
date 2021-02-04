let network_up = document.getElementById("network-up-min")
let network_down = document.getElementById("network-down-min")

function update_network_stats () {

    if (_network.allow_rendering_updates) {
        let up = format_bytes(_network.recent_data.avg.up[0], 2)
        let down = format_bytes(_network.recent_data.avg.down[0], 2)
        network_down.innerText = `${down}`;
        network_up.innerText = `${up}`;
    }
}


function format_bytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}