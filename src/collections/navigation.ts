import { GlobalConfig } from "payload";
import { Access } from "payload";

const isEditorOrAdmin: Access = ({ req: { user } }) => {
  const role = user?.role ?? "";
  return role === "admin" || role === "editor";
};

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  access: {
    update: isEditorOrAdmin,
    read: () => true,
  },
  fields: [
    {
      name: "headerLinks",
      label: "Header Links",
      type: "array",
      minRows: 1,
      admin: {
        components: {
          RowLabel: "@/components/payload/arrayRowLabel",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "text",
              type: "text",
              label: "Link Text",
              required: true,
              admin: { width: "40%" },
            },
            {
              name: "url",
              type: "text",
              label: "Link URL",
              required: true,
              admin: { width: "40%" },
            },
            {
              name: "newTab",
              type: "checkbox",
              label: "Open in New Tab",
              admin: {
                width: "20%",
              },
            },
          ],
        },
      ],
    },
    {
      name: "footerLinks",
      label: "Footer Links",
      type: "array",
      minRows: 1,
      admin: {
        components: {
          RowLabel: "@/components/payload/arrayRowLabel",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "text",
              type: "text",
              label: "Link Text",
              required: true,
              admin: { width: "40%" },
            },
            {
              name: "url",
              type: "text",
              label: "Link URL",
              required: true,
              admin: { width: "40%" },
            },
            {
              name: "newTab",
              type: "checkbox",
              label: "Open in New Tab",
              admin: {
                width: "20%",
              },
            },
          ],
        },
      ],
    },
  ],
};
