Steps to turn this on!
-make a folder to contain PG db via a docker volume:
  - `mkdir -p $HOME/docker/volumes/postgres`
-spin up a postgres DBMS onyour local docker enviroment with a command like below
  - `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5433:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
-update the knexfile.js with your PG DBMS connection details, these are how I set up mine!
    development: {
    client: 'pg',
    connection: 'postgres://postgres:docker@localhost:5433/my_database',
  },
On start-up
  - start three terminals
  in the first terminal
  - cd one into api_server
    - `npx knex migrate:rollback`
    - `npx knex migrate:latest`
    - `npx knex seed:run`
    - `npm start`
  In the second terminal
  - cd the other one into inventory_management
    - `npm start`
  In the third terminal
  - docker exec -it <container-id here> bash
    - in bash `psql -U postgres`
    - in postgres `\c my_database`
      - `\dt` to list relations
      - `SELECT * FROM "Store"`  to see Store Table
      - `SELECT * FROM users`  to see User Table, will be blank until you make a user

  http://Localhost:3000 should populate

  to test guest users
  - click into the `Guest-Store` button
    - click any item and inspect
    - click `Leave Store` button to go back to Login

  to test account creation
  - click into the Create-Account button
    - fill in
      - First Name
      - Last Name
      - User Name
      - Password
      & SSN ;3
    - Click complete `Online-Registration` button, you will be re-routed to the login page
    - or `Leave-Creation` button, if you no longer wish to make one

  to test login
  - In the username field type in your chosen username
    ex. Gabagool
  - in the password field type in your super secret password
    ex. 1qaz2wsx
  - click the `Login` button
  - you will now be redirected to your store page based off userID with pre-selected items

  to test single item look
  - click on an item
  - you will be redirected to that items individual page
  - to return click `your section` button to return to your specific store
  - or click `return` button to go to login

  to test make an item
  - click the `Make-Item` button
  - you will be redirected to the make item page.
  - enter an
    - Desired Item Name
    - Desired Description
    - Desired Quantity
    - then click the `Make-New-Item` button
    - You will be redirected back to your store page
  - if you choose not to make an item click the `return` button
  - you will be redirected back to your section

  to test edit item
  - click the `edit` button
  - you will be taken to an edit page

  to test delete
  - click the `delete` button
  - the item is now gone forever