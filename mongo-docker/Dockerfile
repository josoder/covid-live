FROM mongo:4.2.3
# This is a wrapper for the official mongo image to initiate a replica set with 1 node.
# It is only meant for development where changestreams are used ( only availabe when using replica sets ).

# Add script to initiate a replica set with a single member
RUN echo "rs.initiate( { _id: 'rs0', members: [{ _id: 0, host: 'localhost:27017'}]});rs.slaveOk();" > /docker-entrypoint-initdb.d/replica-init.js

# the important bits are calling out the replicaset,
# binding the IP to 0.0.0.0,
# and setting the oplogSize to something manageable
CMD ["--replSet", "rs0", "--bind_ip", "0.0.0.0", "--oplogSize", "100"]
