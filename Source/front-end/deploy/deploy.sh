#!/bin/bash

[ -e output ] && rm deploy/output

expo login -u nsaproject -p zebrastripe2019

expo build:android > deploy/output

curl $(echo $(grep 'built standalone app' deploy/output) | grep -oE "[^ ]+$") -o latest_app.apk -L

sudo scp -i /keys/openstack latest_app.apk centos@10.72.96.70:/usr/share/nginx/html/app/apks/latest_app.apk