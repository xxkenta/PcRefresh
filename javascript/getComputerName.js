const express = require('express');
const { chopsPoolPromise } = require('../db/chopsConfig');


//query service tag against chops database
async function getAssignedDate(computerName){
    var message = '';
    try {
        const pool = await chopsPoolPromise;
        const result = await pool.request()
            .input('computerName', computerName)
            .query('SELECT DateAssigned\n' +
                'FROM EquipMast\n' +
                'WHERE serialnumber = @computerName');
        return result.recordset
    } catch(err){
        message = "The query to check available devices failed.";
        return message;
    }
};

module.exports = {
    getAssignedDate
};

