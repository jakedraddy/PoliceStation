# PoliceDatabase

# Project setup
First, make sure you have npm installed. I used version 6.9.0, but any version probably works.

I would also use Visual studio code with the *Vetur* extension.

```
npm install
npm install -g typescript
npm install -g ts-node-dev
npm i vue bootstrap-vue bootstrap
```
## Oracle DB library setup
Oracle Client libraries (64-bit) must be in your PATH environment variable
To get libraries, install an Instant Client Basic or Basic Light package from
https://www.oracle.com/technetwork/topics/winx64soft-089540.html

A Microsoft Visual Studio Redistributable suitable for your Oracle Client library version must be available
See https://oracle.github.io/node-oracledb/INSTALL.html for details

# Run

## Configure database connection
1. Copy .env.example to .env
2. Edit the config values to point to the Oracle database.

## Compiles and hot-reloads for development

Call tsc to compile the typescript to javascript
```
npm run build
```

Actually run the frontend
```
npm run front
```
