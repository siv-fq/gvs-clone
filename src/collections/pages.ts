import { CollectionConfig } from "payload";
import {
  ImageGridBlock,
  FaqBlock,
  RichTextBlock,
  TestimonialsBlock,
  RelatedContentBlock,
  ContentMediaBlock,
} from "./blocks";
import { Access } from "payload";

const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

const isEditorOrAdmin: Access = ({ req: { user } }) => {
  const role = user?.role ?? "";
  return role === "admin" || role === "editor";
};

export const Pages: CollectionConfig = {
  slug: "pages",
  versions: {
    drafts: {
      schedulePublish: true,
      autosave: true,
    },
  },
  admin: {
    useAsTitle: "title",
    group: "Content",
    preview: (doc) => {
      if (!doc?.slug) {
        return null;
      }
      return `${process.env.SITE_URL}/${doc.slug}`;
    },
    livePreview: {
      url: ({ data }) => {
        return `${process.env.SITE_URL}/${data.slug}?draft=true`;
      },
    },
  },
  access: {
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isAdmin,
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "publishedDate",
      type: "date",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "blocks",
      type: "blocks",
      blocks: [
        ImageGridBlock,
        FaqBlock,
        RichTextBlock,
        TestimonialsBlock,
        RelatedContentBlock,
        ContentMediaBlock,
      ],
    },
  ],
};
