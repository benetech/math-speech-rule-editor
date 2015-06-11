#!/usr/bin/env bash

# Install required packages.
apt-get install nodejs npm mongodb -y
ln -s /usr/bin/nodejs /usr/bin/node

# Get the source if running in production.
# The /Vagrant synced folder only exists in the dev environment.
cd /vagrant

# Install Node.JS packages.
npm -g -y install sails@0.10.5 forever
npm -y install --no-bin-links

#Lift sails.
forever start app.js

#Wait for a bit and then call the grunt task to seed the data.
sleep 30
wget http://localhost:1337/seedData -O /dev/null
wget http://localhost:1337/ruleset/import -O /dev/null

sleep 90
forever stop 0

