import sys

def main (args):
    if (args[1] == "get-cpu-temp"):
        flush_and_send_back(34)
 


def flush_and_send_back (data):
    print(data)
    sys.stdout.flush()




main (sys.argv)