const { Client } = require('pg');

const connectionString = 'postgres://ogktzbzc:AAPLWcCdp1NSF_MBUfIcuoGbXE_kn0W8@john.db.elephantsql.com:5432/ogktzbzc';

const client = new Client({
    connectionString: connectionString
});

client.connect();

function execute(query, params) {
    return new Promise((resolve, reject) => {
        client.query(query, params, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    })
};

function executeQuery(query, params) {
    return execute(query, params)
    .then(result => result.rows)
    .catch(error => {return {error: `Database error: ${error.routine}`}});
};

function executeUpdate(query, params) {
    return execute(query, params)
    .then(result => result.rows.length === 0 ? result.rowCount : result.rows)
    .catch(error => {return {error: `Database error: ${error.routine}`}});
};

module.exports = { executeQuery, executeUpdate };
