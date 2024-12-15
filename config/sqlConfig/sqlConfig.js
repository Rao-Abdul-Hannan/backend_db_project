// config/sqlConfig/sqlConfig.js
const mysql = require("mysql2");

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "school",
};

const connection = mysql.createConnection(dbConfig);

const connectToSqlDb = () => {
    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
        } else {
            console.log(
                `Connected to MySQL database successfully! Database: ${dbConfig.database}`
            );
        }
    });
};

module.exports = { connectToSqlDb, connection };
