let search_field = document.getElementById("search-process-input")
let results_area = document.getElementById("results-area");

// when the user types or hits the searchbtbtn find revelant processes matching the query
function update_search_results () {
    let results_matched = [];
    let q = search_field.value;
    q = q.toString().toLowerCase();
    // check text in field agains search results
    ALL_PROCESSES.forEach(i => {
        if (i.name.toLowerCase().includes(q)) {
            results_matched.push(i);
        }
    });

    // render the new results into the element
    display_results(results_matched);

}

/**
 * 
 * @param results The array of results to display 
 */
function display_results (results) {

    results_area.innerHTML = ""; // clear the area
    results.forEach(result => {
        //results div that contains each result
        let div = document.createElement("div");
        div.classList.add("result");

        //create span for the process-name
        let name_span = document.createElement("span");
        name_span.classList.add("process-name");
        name_span.innerHTML = `${result.name} (${result.children_processes})`;

        // create the two button elements container and the buttons inside them
        let button_container = document.createElement("div");
        button_container.classList.add("buttons-right");

        let button_view = document.createElement("button");
        button_view.classList = "btn-view btn-med invert";
        button_view.innerHTML = "View";

        // stats/elements
        let stats_container = document.createElement("span");
        stats_container.classList = "stats-container"

        let cpu_stat = document.createElement("p");
        cpu_stat.classList = "cpu-search-stat stat";
        cpu_stat.innerText = `CPU ${(result.cpu_used).toFixed(2)}% `

        let mem_stat = document.createElement("p");
        mem_stat.classList = "mem-search-stat stat invert-text-dark";
        mem_stat.innerText = `Memory ${(result.memory_used).toFixed(2)}%   `

        stats_container.appendChild(mem_stat);
        stats_container.appendChild(cpu_stat);

        let button_watch = document.createElement("button");
        button_watch.classList = "btn-save btn-med";
        // if watched then show settings text else show watch text
        button_watch.innerText = `${(result.watched ? 'Settings' : 'Watch')}`;

        //append buttons to btn container
        button_container.appendChild(button_view);
        button_container.appendChild(button_watch)

        // append buttons to button
        div.appendChild(name_span);
        div.appendChild(stats_container)
        div.appendChild(button_container);
        //append new result to the array
        results_area.appendChild(div);
    });


    document.getElementById("results-count").innerText = (results.length > 0) ? `${results.length} Results` : "No Results Found";
}

document.body.addEventListener("click", (e) => {
    update_search_results ();
});
