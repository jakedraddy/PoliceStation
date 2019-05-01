
import * as oracle from "oracledb";
import * as fs from 'fs';

var connection: oracle.IConnection;

export async function get_connection(): Promise<oracle.IConnection> {
    if (!connection) {
        connection = await oracle.getConnection({
            user          : (process.env.DB_USER) ? process.env.DB_USER : "",
            password      : (process.env.DB_USER) ? process.env.DB_USER : "",
            connectString : (process.env.DB_CONNECTION_STRING) ? process.env.DB_CONNECTION_STRING : ""
        });
    }
    return connection;
}

export async function execute_query(query: string, params?: any): Promise<oracle.IExecuteReturn | undefined> {
    var connection = await get_connection().catch((err) => {console.trace("Error connecting to server.", err);});
    let result;
    console.log(`Running query...${query} with parameters ${params}\n`);

    // let callback = (err, value) => {
    //     if (err) {
    //         console.trace(`Error running query...${query} with parameters ${params}\n${err}` )
    //         result = value;
    //     } else {
    //         result = value;
    //     }
    // }

    if (connection) {
        if (params) {
            result = await connection.execute(query, params);
        } else {
            result = await connection.execute(query);
        }

        if (result) {
            return result;
        }
    // connection.close();
    }
    
    return undefined;
}

export async function create_tables() {
    fs.readFile('./src/create_tables.sql', 
        async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                await execute_query(data.toString());
            }
        }
    );
}