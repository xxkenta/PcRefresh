const express = require('express');
var sql = require("mssql");

//Initializing connection string
var connection = {
    user: x,
    password: x,
    server: x,
    database: x
};

const chopsPoolPromise = new sql.ConnectionPool(connection)
    .connect()
    .then(pool => {
        console.log('Connected to CHOPS');
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, chopsPoolPromise
};
