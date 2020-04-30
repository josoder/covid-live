#!/bin/bash
# Check for password argument
if [[ $# -eq 0 ]] ; then
    echo 'You must provide one argument for the password of the "main_admin" user to be created'
    echo '  Usage:  init_cluster.sh MyPa55wd123'
    echo
    exit 1
fi

# Wait until the final (3rd) mongod has started properly
echo "Waiting for the 3 containers to come up (`date`)..."
echo " (IGNORE any reported not found & connection errors)"
echo -n "  "
until kubectl --v=0 exec mongodb-2 -c mongod-container -- mongo --quiet --eval 'db.getMongo()'; do
    sleep 5
    echo -n "  "
done
echo "...mongod containers are now running (`date`)"
echo

# Initiate MongoDB Replica Set configuration
echo "Configuring the MongoDB Replica Set"
kubectl exec mongodb-0 -c mongod-container -- mongo --eval 'rs.initiate({_id: "MainRepSet", version: 1, members: [ {_id: 0, host: "mongodb-0.mongodb.default.svc.cluster.local:27017"}, {_id: 1, host: "mongodb-1.mongodb.default.svc.cluster.local:27017"}, {_id: 2, host: "mongodb-2.mongodb.default.svc.cluster.local:27017"} ]});'
echo

# Wait for the MongoDB Replica Set to have a primary ready
echo "Waiting for the MongoDB Replica Set to initialise..."
sleep 30
kubectl exec mongodb-0 -c mongod-container -- mongo --eval 'while (rs.status().hasOwnProperty("myState") && rs.status().myState != 1) { print("."); sleep(1000); };'
echo "...initialisation of MongoDB Replica Set completed"
echo

# Create the admin user (this will automatically disable the localhost exception)
echo "Creating user: 'main_admin'"
kubectl exec mongodb-0 -c mongod-container -- mongo --eval 'db.getSiblingDB("admin").createUser({user:"main_admin",pwd:"'"${1}"'",roles:[{role:"root",db:"admin"}]});'
echo
