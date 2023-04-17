const express = require('express');
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

const app = express();

app.get('/mean', function(req, res, next){
    //find mean of array passwed for query string

    if(!req.query.nums){
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    //validate query string
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error){
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "mean",
        result: findMean(nums)
    }
    return res.send(result);
});

app.get('/median', function(req, res, next){
    //find median of array passwed for query string

    if (!req.query.nums){
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    //validate
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error){
        throw new ExpressError(nums.message);
    }
    let result = {
        operation: "median",
        result: findMedian(nums)
    }
    return res.send(result);
});

app.get('/mode', function(req, res, next){
    //find mode of array passwed for query string

    if (!req.query.nums){
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    //validate
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error){
        throw new ExpressError(nums.message);
    }
    let result = {
        operation: "mode",
        result: findMode(nums)
    }
    return res.send(result);
})

app.use(function(req, res, next){
    //error for invalid route
    const err = new ExpressError("Not found", 404);
    return next(err);
});

app.use(function(err, req, res, next){
    //general errors
    res.status(err.status || 500);
    return res.json({
        error: err, 
        message: err.message
    });
});

app.listen(3000, function(){
    console.log('Server starting on port 3000');
});