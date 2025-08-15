import { CollectionConfig } from "payload";
import {
  ImageGridBlock,
  FaqBlock,
  RichTextBlock,
  TestimonialsBlock,
  TocWithContent,
  HeaderCta,
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
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            width: "60%",
          },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: {
            width: "40%",
          },
        },
        {
          name: "showHeaderOnLeft",
          label: "Show Header on Left Side",
          type: "checkbox",
          defaultValue: false,
          admin: {
            width: "20%",
          },
        },
        {
          name: "featuredImage",
          type: "upload",
          relationTo: "media",
          admin: {
            width: "40%",
          },
        },
        {
          name: "publishedDate",
          type: "date",
          admin: {
            width: "40%",
          },
        },
      ],
    },
    {
      name: "blocks",
      type: "blocks",
      blocks: [
        ImageGridBlock,
        FaqBlock,
        RichTextBlock,
        TestimonialsBlock,
        TocWithContent,
        HeaderCta,
        ContentMediaBlock,
      ],
    },
  ],
};
