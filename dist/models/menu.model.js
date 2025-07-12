"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MenuItemSchema = new mongoose_1.Schema({
    label: { type: String, required: true },
    url: { type: String, required: true },
    external: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    children: [new mongoose_1.Schema({}, { _id: false })]
}, { _id: false });
MenuItemSchema.add({
    children: [MenuItemSchema]
});
const MenuSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    items: [MenuItemSchema]
}, { timestamps: true });
const Menu = (0, mongoose_1.model)('Menu', MenuSchema);
exports.default = Menu;
