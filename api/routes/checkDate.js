const express = require('express');
const router = express.Router();
const { chopsPoolPromise } = require('../../db/chopsConfig');
const compName = require('../../javascript/getComputerName');
const os = require('os');

router.get('/assignedDate', async(req,res,next) =>{
    var computerName = os.hostname();
    var result = await compName.getAssignedDate(computerName);
    var date = result[0];
    date = new Date(date.DateAssigned);
    //console.log("Your service tag is: " + computerName);
    //console.log("Expiration date is: ");
    date.setDate(date.getDate() + 1460);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();
    var formattedExpDate = mm + '/' + dd + '/' + y;
    //console.log(formattedExpDate);
    var isRefresh = false;
    if (date < new Date()){
        isRefresh = true;
    }
    //console.log(isRefresh);
    res.status(200).json({
        computerName: computerName,
        isRefresh: isRefresh,
        expDate: formattedExpDate
    });
});

router.post('/serviceTagLookup', async(req,res,next) =>{
    console.log("Hello");
    console.log(req.body.serviceTag);
    var result = await compName.getAssignedDate(req.body.serviceTag);
    var date = result[0];
    if (result.length < 1){
        res.status(200).json({
            status: "Does not exist"
        });
    }
    else {
        date = new Date(date.DateAssigned);
        console.log("Your service tag is: " + req.body.serviceTag);
        console.log("Expiration date is: ");
        date.setDate(date.getDate() + 1460);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();
        var formattedExpDate = mm + '/' + dd + '/' + y;
        console.log(formattedExpDate)
        var isRefresh = false;
        if (date < new Date()){
            isRefresh = true;
        }
        console.log(isRefresh);
        res.status(200).json({
            status: "Does exist",
            isRefresh: isRefresh,
            expDate: formattedExpDate,
            computerName: req.body.serviceTag
        });
    }
});

module.exports = router;