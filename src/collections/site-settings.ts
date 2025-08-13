import { GlobalConfig } from "payload";
import { Access } from "payload";

const isEditorOrAdmin: Access = ({ req: { user } }) => {
  const role = user?.role ?? "";
  return role === "admin" || role === "editor";
};

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    update: isEditorOrAdmin,
    read: () => true,
  },
  fields: [
    {
      name: "branding",
      type: "group",
      label: "Branding",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "siteName",
              type: "text",
              label: "Site Name",
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
    {
      name: "contactUs",
      type: "group",
      label: "Contact Us",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "email",
              type: "text",
              label: "Email",
              admin: { width: "50%" },
            },
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              admin: { width: "50%" },
            },
            { name: "address", type: "textarea", label: "Address" },
          ],
        },
      ],
    },
  ],
};
