"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const models_1 = require("../models");
exports.ContactService = {
    upsertContact: async (data) => {
        await models_1.Contact.deleteMany({});
        const contact = await models_1.Contact.create(data);
        return contact;
    },
    getContact: async () => {
        const contact = await models_1.Contact.findOne();
        return contact;
    }
};
