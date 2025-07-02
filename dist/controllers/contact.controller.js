"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContact = exports.upsertContact = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const upsertContact = async (req, res, next) => {
    try {
        const contact = await services_1.ContactService.upsertContact(req.body);
        (0, utils_1.successResponse)(res, contact, 'Contact saved successfully');
        return;
    }
    catch (err) {
        next(err);
    }
};
exports.upsertContact = upsertContact;
const getContact = async (_req, res, next) => {
    try {
        const contact = await services_1.ContactService.getContact();
        (0, utils_1.successResponse)(res, contact, 'Contact fetched successfully');
        return;
    }
    catch (err) {
        next(err);
    }
};
exports.getContact = getContact;
