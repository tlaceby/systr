const spawn = require("child_process").spawn;
let win_cpu_temps = `${__dirname}/python/windows_cpu_temp.py`;

function create_python_process (script, args) {
    return new Promise((resolve, rejects) => {
        let buffer = '';
        let pythonProcess = spawn('python',[script, args[0]]);
    
        pythonProcess.stdout.on('data', (data) => {
            buffer += data;
            console.log(data)
        });
    
        pythonProcess.stdout.on("close", (data) => {
            resolve(buffer.toString());
        });

        pythonProcess.stdout.on("error", (error) => {
            console.log(error);
            rejects(error);
        })
    })

}

create_python_process(win_cpu_temps, "get-cpu-temp")
    .then(data => {
        console.log(data)
    }).catch(err => console.log(err));