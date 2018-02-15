const { Client } = require("pg");

let database_client;

exports.init = function() {
    database_client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });
    
    database_client.connect();
};

exports.query = function(query) {
    database_client.query(query, (err, response) => {
        if (err) {
            console.log(err);

            return false;
        } else {
            return true;
        };
    });
};
