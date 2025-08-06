import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Access } from "payload";

const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

const isEditorOrAdmin: Access = ({ req: { user } }) => {
  const role = user?.role ?? "";
  return role === "admin" || role === "editor";
};

export const Blogs: CollectionConfig = {
  slug: "blogs",
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
      return `${process.env.SITE_URL}/blog/${doc.slug}`;
    },
    livePreview: {
      url: ({ data }) => {
        return `${process.env.SITE_URL}/blog/${data.slug}?draft=true`;
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
      name: "description",
      type: "textarea",
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
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      admin: {
        placeholder: "Select an author",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor({}),
    },
  ],
};
