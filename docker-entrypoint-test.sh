#!/bin/sh -l

# echo "Waiting for database to start..."

# ./wait-for db:${DB_PORT} 

# echo "migrating database ..."

# yarn migrateDev

# echo "seeding .."

# yarn seedCI

# echo "starting the server"

# yarn test

exec ./wait-for-it.sh -h "${DB_HOST}" -p "${DB_PORT}" -t 300 -s -- yarn migrateDev && yarn seedCI & yarn test
