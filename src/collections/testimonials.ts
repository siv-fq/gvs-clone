import { CollectionConfig } from "payload";
import { Access } from "payload";

const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === "admin";
};

const isEditorOrAdmin: Access = ({ req: { user } }) => {
  const role = user?.role ?? "";
  return role === "admin" || role === "editor";
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    group: "Reusable Components",
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
      name: "rating",
      type: "select",
      required: true,
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
      ],
      defaultValue: "5",
    },
    {
      name: "feedback",
      type: "textarea",
      required: true,
    },
  ],
};
