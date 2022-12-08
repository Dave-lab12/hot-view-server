#!/bin/sh


./wait-for db:${DB_PORT} 

echo "migrating database ..."

yarn migrateDev

echo "seeding .."

yarn seedCI

echo "starting the server"

yarn test
