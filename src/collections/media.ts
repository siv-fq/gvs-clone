import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
  },
  access: {
    read: () => true,

    create: ({ req }) => {
      const role = req.user?.role;
      return role === "admin" || role === "editor";
    },

    update: ({ req }) => {
      const role = req.user?.role;
      return role === "admin" || role === "editor";
    },

    delete: ({ req }) => {
      const role = req.user?.role;
      return role === "admin" || role === "editor";
    },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
