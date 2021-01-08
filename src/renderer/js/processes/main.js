

/**
 * This function gets all system process and then returns then and popuylates an array to be used for searching and tracking
 */
async function get_all_processes () {
    return new Promise ((resolve, reject) => {
        si.processes().then(data => {
            let saved_processes = [];

            data.list.forEach(process => {
                // check for any known windows and mac process names then esclude them
                if (!known_windows_mac_processes_pids.includes(process.parentPid)) {
                    let process_n = {
                        name: process.name,
                        pid:process.pid,
                        parentPid: process.parentPid,
                        cpu_used: process.pcpu,
                        memory_used: process.pmem,
                        priotity: process.priority,
                        path: process.path,
                        state: process.state,
                        children_processes: 1,
                    }

                    saved_processes.push(process_n);
                }
            })

            resolve(saved_processes)

        }).catch(err => reject(err));

    });
}

get_all_processes().then(p => {
    clean_processes_array(p).then(f => {
        ALL_PROCESSES = f;
        STATE.emit("ready-for-interval");
        update_search_results ()
    })
}).catch(err => console.log(err));


/**
 * Takes a array of process objects and clusters any with the same name and ParentPid
 * @param processes An array ofsorted and filtered process objects
 */
function clean_processes_array (pr) {

    return new Promise((resolve, reject) => {
        let cleaned_array_ids = []
        let cleaned_array = [];

        pr.forEach(p => {
            if (!cleaned_array_ids.includes(p.name || p.parentPid)) {
                cleaned_array_ids.push(p.name, p.parentPid);
                var new_p = p;
                cleaned_array.push(new_p)
            } else {
                cleaned_array.forEach(e => {
                    if (e.name == p.name || e.parentPid == p.parentPid) {
                       e.children_processes += 1;
                       e.cpu_used += p.cpu_used;
                       e.memory_used += p.memory_used;
                    }
                })
            }
        })

        resolve(cleaned_array)
    });

}


// constantly run this interval
STATE.on("ready-for-interval", () => {
    setInterval(() => {
        get_all_processes().then(p => {
            clean_processes_array(p).then(f => {
                ALL_PROCESSES = f;
                if (!is_viewing_process) update_search_results ();
            })
        }).catch(err => console.log(err));
       
    }, PROCESS_INTERVAL)
})