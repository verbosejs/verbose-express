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

/**
 * Module exports.
 * @public
 */

module.exports = verboseDashboard;
module.exports.middleware = verboseDashboardMiddleWare;

/**
 * Sets up Verbose CMS dashboard routes
 *
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function verboseDashboard(options) {

    const dashboard = express.Router();
    dashboard.use(verboseDashboardMiddleWare);
    dashboard.get('/', (req, res) => {
        res.end('admin dashboard')
    });

    return dashboard;

}

/**
 * Middleware ran with each dashboard route call
 *
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function verboseDashboardMiddleWare(req, res, next) {

    // Return middleware

    if (req.verbose.dashboard) {
        return next();
    }

    console.log('hitting verboseDashboardMiddleWare');

    req.verbose.dashboard = true;
    next()

}