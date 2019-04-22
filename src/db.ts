
import * as oracle from "oracledb";
import * as station from "./station";
import * as station_mapper from "./station_mapper";
import * as fs from 'fs';

export async function get_user(userName: string): Promise<station.Employee> {
    var result = await execute_query(`SELECT * FROM Employee WHERE Username = :username;`, [userName]);

    return station_mapper.map_Employee(result.rows[0]);
}

export async function get_connection(): Promise<oracle.IConnection> {
    return oracle.getConnection({
        user          : process.env.DB_USER,
        password      : process.env.DB_USER,
        connectString : process.env.DB_CONNECTION_STRING
    }).then(
        (data) => {return data;},
        (err) => {console.log("Failed to connect", err); return err;});
}

export async function execute_query(query: string, params?: [any]): Promise<oracle.IExecuteReturn> {
    return get_connection().then(
        async (connection) => {
            let result;
            if (params) {
                result = connection.execute(query, params);
            } else {
                result = connection.execute(query);
            }
            
            await result; // Make sure query has completed before we close the connection.
            connection.close();
            return result;    
        },
        (err) => {console.log("Error executing query", err)}
    );
}


export function create_person(req, resp) {
    
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