#!/bin/sh -l

# echo "Waiting for database to start..."

# ./wait-for db:${DB_PORT} 

# echo "migrating database ..."

# yarn migrateDev

# echo "seeding .."

# yarn seedCI

# echo "starting the server"

# yarn test

exec ./wait-for db:${DB_PORT} && yarn migrateDev && yarn seedCI & yarn test
