#!/bin/bash

cp /root/projects/Rose-Linode/env/Next-Reflect/server/.env .

# Stop current docker image
docker rm $(docker stop $(docker ps -a -q --filter ancestor=next-reflect-server --format="{{.ID}}"))

# Build & Run Image
docker build -t next-reflect-server . && docker run -it -d -p 8001:80 next-reflect-server && docker ps
