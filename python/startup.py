import os, time, multiprocessing, sys

CURRENT_DIR = '' 
JS_PROCESS = ''


# Called with argsv passed into
def main (args):
    CURRENT_DIR = args[0]

    for a in args:
        print(a)




main (sys.argv)