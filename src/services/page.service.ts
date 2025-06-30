import { IPage, IPageSection, Page, PageSection } from '../models'
import { Types } from 'mongoose'

interface CreatePageInput {
  name: string
  slug: string
  sections?: Partial<IPageSection>[]
}

interface UpdatePageInput {
  name?: string
  slug?: string
  sections?: Partial<IPageSection>[]
}

export const PageService = {
  createPage: async (data: CreatePageInput): Promise<IPage> => {
    const sections = data.sections?.length ? await PageSection.insertMany(data.sections) : []
    const sectionIds = sections.map((s) => s._id as Types.ObjectId)

    return Page.create({
      name: data.name,
      slug: data.slug,
      sections: sectionIds
    })
  },

  getPageBySlug: async (slug: string): Promise<IPage | null> => {
    return Page.findOne({ slug }).populate('sections').exec()
  },

  updatePage: async (id: string, data: UpdatePageInput): Promise<IPage | null> => {
    const page = await Page.findById(id)
    if (!page) return null

    if (data.sections) {
      await PageSection.deleteMany({ _id: { $in: page.sections } })
      const newSections = await PageSection.insertMany(data.sections)
      page.sections = newSections.map((s) => s._id as Types.ObjectId)
    }

    if (data.name) page.name = data.name
    if (data.slug) page.slug = data.slug

    return page.save()
  },

  deletePage: async (id: string): Promise<IPage | null> => {
    const page = await Page.findById(id)
    if (!page) return null

    await PageSection.deleteMany({ _id: { $in: page.sections } })
    return Page.findByIdAndDelete(id)
  }
}
