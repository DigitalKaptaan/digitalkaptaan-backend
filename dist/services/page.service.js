"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageService = void 0;
const models_1 = require("../models");
exports.PageService = {
    createPage: async (data) => {
        const sections = data.sections?.length ? await models_1.PageSection.insertMany(data.sections) : [];
        const sectionIds = sections.map((s) => s._id);
        return models_1.Page.create({
            name: data.name,
            slug: data.slug,
            sections: sectionIds
        });
    },
    getPageBySlug: async (slug) => {
        return models_1.Page.findOne({ slug }).populate('sections').exec();
    },
    updatePage: async (id, data) => {
        const page = await models_1.Page.findById(id);
        if (!page)
            return null;
        if (data.sections) {
            await models_1.PageSection.deleteMany({ _id: { $in: page.sections } });
            const newSections = await models_1.PageSection.insertMany(data.sections);
            page.sections = newSections.map((s) => s._id);
        }
        if (data.name)
            page.name = data.name;
        if (data.slug)
            page.slug = data.slug;
        return page.save();
    },
    deletePage: async (id) => {
        const page = await models_1.Page.findById(id);
        if (!page)
            return null;
        await models_1.PageSection.deleteMany({ _id: { $in: page.sections } });
        return models_1.Page.findByIdAndDelete(id);
    }
};
