
import * as oracle from "oracledb";
import * as station from "./station";

var mypw = "testpw";  // set mypw to the hr schema password

export function get_user(userName: string): station.Employee {
    let results = execute_query(`SELECT * FROM Employee WHERE Username = :username;`, [userName]);
    
    var empl = new station.Employee();
    // person.DoB = results.
    return empl;
}

export function get_connection() {
    return oracle.getConnection(  {
        user          : process.env.DB_USER,
        password      : process.env.DB_USER,
        connectString : process.env.DB_CONNECTION_STRING
    });
}

export function execute_query(query: string, params?: [any]) {
    let connection;
    try {
        connection = get_connection();

        let result = connection.execute(query, params);
        console.log(result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

export function get_manager(id: number) {
    return execute_query(`SELECT manager_id, department_id, department_name
        FROM departments
        WHERE manager_id = :id`,
        [id],  // bind value for :id
    );
}

export function create_tables() {
    var fs = require('fs');
    fs.readFile( __dirname + '/create_tables.sql', function (err, data) {
        if (err) {
            throw err; 
        }
        execute_query(data.toString());
    });
}