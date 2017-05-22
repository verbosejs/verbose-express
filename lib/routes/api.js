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

module.exports = verboseApi;
module.exports.middleware = verboseApiMiddleWare;

/**
 * Sets up the Verbose CMS API routes using options passed in an object
 *
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

function verboseApi(options) {

    const api = express.Router();
    api.use(verboseApiMiddleWare);
    api.get('/api', (req, res) => {
        res.end('admin api')
    });

    return api;

}

/**
 * Middleware ran for each API call
 *
 * @return {Function}
 * @public
 * @param req
 * @param res
 * @param next
 */

function verboseApiMiddleWare(req, res, next) {

    // Return middleware

    if (req.verbose.api) {
        return next();
    }

    console.log('hitting verboseApiMiddleWare');

    req.verbose.api = true;
    next();

}