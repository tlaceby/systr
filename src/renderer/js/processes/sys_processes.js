let py_process = null;
console.time("start-time")
const PY_RUN_TIME = 100; // How many times this script will do its code before it dies loops
let python_process = new PythonController();
const debug_write_file = 'F:\\Electron\\systr\\proccess.json';

APP_STATE.on('startup-finished', () => {

    create_python_process();
    
})

function create_python_process () {
    let proccess_interval = localStorage.getItem("process-interval");

    if (typeof proccess_interval != "string") {
        localStorage.setItem("process-interval", '10000');
        proccess_interval = "10000";
        console.log("creating new storage val")
    }

    python_process.configure(`${__dirname}\\js\\processes\\system_process.py`, [parseInt(proccess_interval), PY_RUN_TIME, debug_write_file]);
    python_process.start()

    python_process.listen.on("data", (data) => {
       
        console.log(JSON.parse(data.toString()));
       
    })

    python_process.listen.on("error", (e) => {
        console.log(e)
    });

    python_process.listen.on("close", (e) => {
        python_process = null;
        python_process = new PythonController();
        console.log("process is finished.")
        create_python_process();
    })
}