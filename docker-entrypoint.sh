#!/bin/sh

echo "Waiting for MongoDB to start..."

./wait-for db:5432 

echo "migrating database ..."

yarn migrateDev

echo "starting the server"

yarn dev