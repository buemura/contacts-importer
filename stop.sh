# #!/bin/bash

# get the list of process IDs for all "node" processes except the last one
PIDS=$(pgrep node)

# kill all processes in the list
echo "$PIDS" | xargs kill
