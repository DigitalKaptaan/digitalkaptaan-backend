"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerRequests = exports.submitCustomerRequest = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const submitCustomerRequest = async (req, res, next) => {
    try {
        const saved = await services_1.CustomerRequestService.create(req.body);
        (0, utils_1.successResponse)(res, saved, 'Request submitted successfully', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.submitCustomerRequest = submitCustomerRequest;
const getCustomerRequests = async (_req, res, next) => {
    try {
        const requests = await services_1.CustomerRequestService.getAll();
        (0, utils_1.successResponse)(res, requests, 'Fetched requests');
    }
    catch (err) {
        next(err);
    }
};
exports.getCustomerRequests = getCustomerRequests;
