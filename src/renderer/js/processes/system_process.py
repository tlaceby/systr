from os import write
import sys, time, psutil, json
run_interval = int(sys.argv[1])
program_run_time = int(sys.argv[2])
#Outputs the data to the main JS process
def clear_and_print(d):
    print(d)
    sys.stdout.flush()

def dump_to_file (data, path):
    with open(path, 'w') as outfile:
        json.dump(data, outfile)
    
    clear_and_print(f"created file @ {path}")

def return_all_processes():
    
    listOfProcessNames = list()
    # Iterate over all running processes
    for proc in psutil.process_iter():
       # Get process detail as dictionary
       pInfoDict = proc.as_dict(attrs=['pid', 'name', 'cpu_percent','memory_percent', 'cpu_times'])
       # Append dict of process detail in list
       listOfProcessNames.append(pInfoDict)
    s = json.dumps(listOfProcessNames)
    return s


while (program_run_time != 0):
    clear_and_print(return_all_processes())
    time.sleep(run_interval / 1000)
    program_run_time -= 1

    
