const mysql = require("mysql2/promise");

const config = require('../config');

async function query(sql, params) {
    // console.log(sql, params);
    try {
        const connection = await mysql.createConnection(config.dbConfig);
        const [rows] = await connection.execute(sql, params);
        await connection.end();
        return rows;
    } catch (error) {
        console.log(error);
    }
    
}

async function multiQueryWithTransaction(listSQl, listParam) {
    try {
        const connection = await mysql.createConnection(config.dbConfig);
        await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        await connection.beginTransaction();
        listSQl.map(async (item, index) => {
            await connection.execute(item, listParam[index]);
        });
        await connection.commit();
        await connection.end();
        return 0;
    } catch (error) {
        connection.rollback();
        console.log(error);
    }
    return 1;
}

module.exports = {
    query,
    multiQueryWithTransaction
}
