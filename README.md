# PoliceDatabase

# Project setup
First, make sure you have npm installed. I used version 6.9.0, but any version probably works.

I would also use Visual studio code with the *Vetur* extension.

```bash
npm install -g typescript
npm install -g ts-node-dev
npm install -g vue-cli

cd front_end
npm install

cd ../back_end
npm install
```
## Oracle DB library setup
Oracle Client libraries (64-bit) must be in your PATH environment variable
To get libraries, install an Instant Client Basic or Basic Light package from
https://www.oracle.com/technetwork/topics/winx64soft-089540.html

A Microsoft Visual Studio Redistributable suitable for your Oracle Client library version must be available
See https://oracle.github.io/node-oracledb/INSTALL.html for details

## Configure database connection
1. Copy .env.example to .env
2. Edit the config values to point to the Oracle database.

## Configure database tables
If you haven't used the database before, you must run the following sql scripts manually.
```
back_end/create_tables.sql
back_end/insert_test_data.sql
```

# Run

## Start the services
Start the backend:
```bash
cd back_end
npm run backend
```

Start the frontend:
```bash
cd front_end
npm run serve
```
