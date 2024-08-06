Steps to turn this on!
-make a folder to contain PG db via a docker volume:
  - `mkdir -p $HOME/docker/volumes/postgres`
-spin up a postgres DBMS onyour local docker enviroment with a command like below
  - `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5433:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
-update the knexfile.js with your PG DBMS connection details
  -