import { CollectionConfig } from "payload";
import { Access } from "payload";

const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

const isEditorOrAdmin: Access = ({ req: { user } }) => {
  const role = user?.role ?? "";
  return role === "admin" || role === "editor";
};

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    group: "Access Control",
  },
  access: {
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isAdmin,
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "position",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
