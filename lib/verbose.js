/*!
 * verbose-express
 * Copyright(c) 2017 Neil Barton, Matt Ward
 * MIT Licensed
 */

'use strict';


/**
 * Module dependencies.
 * @private
 */

const express = require('express');

const verboseApi = require('./routes/api');
const verboseDashboard = require('./routes/dashboard');


/**
 * Module exports.
 * @public
 */

module.exports = verboseCms;
module.exports.version = require('../package.json').version;

/**
 * Sets up Verbose CMS using options passed in an object
 *
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function verboseCms(options) {

    // Display setup options
    console.log('setting up verbose CMS');
    console.log(options);

    const verbose = express.Router();

    verbose.use('/verbose',
        verboseMiddlewareSetup,
        verboseSecurityMiddleWare,
        verboseDashboard(options),
        verboseApi(options));

    return verbose;

}


/**
 * First middleware to run, make sure the req contains a verbose object
 *
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function verboseMiddlewareSetup(req, res, next) {

    // Return middleware

    if (req.verbose) {
        return next();
    }

    console.log('hitting verbose setup middleware');

    req.verbose = {};
    next()

}

/**
 * Security middleware, makes sure the user has permission to view a route
 *
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function verboseSecurityMiddleWare(req, res, next) {

    // Return middleware

    if (req.verbose && req.verbose.security) {
        return next();
    }

    console.log('hitting verbose security middleware');

    req.verbose.security = true;
    next()

}