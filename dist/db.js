import * as oracle from "oracledb";
import * as station from "./station";
var mypw = "testpw"; // set mypw to the hr schema password
module.exports = {
    get_connection: get_connection,
    execute_query: execute_query,
    get_manager: get_manager,
    create_tables: create_tables,
    get_user: get_user,
};
function get_user(userName) {
    let results = execute_query(`SELECT * FROM Person WHERE userName = :username;`, [userName]);
    var person = new station.Person();
    // person.DoB = results.
    return person;
}
function get_connection() {
    return oracle.getConnection({
        user: "hr",
        password: mypw,
        connectString: "localhost/XEPDB1"
    });
}
function execute_query(query, params) {
    let connection;
    try {
        connection = get_connection();
        let result = connection.execute(query, params);
        console.log(result.rows);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        if (connection) {
            try {
                connection.close();
            }
            catch (err) {
                console.error(err);
            }
        }
    }
}
function get_manager(id) {
    return execute_query(`SELECT manager_id, department_id, department_name
        FROM departments
        WHERE manager_id = :id`, [id]);
}
function create_tables() {
    var fs = require('fs');
    fs.readFile(__dirname + '/create_tables.sql', function (err, data) {
        if (err) {
            throw err;
        }
        execute_query(data.toString());
    });
}
//# sourceMappingURL=db.js.map