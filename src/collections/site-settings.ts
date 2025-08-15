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
      name: "siteSEO",
      type: "group",
      label: "SEO",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "metaDescription",
              type: "textarea",
              label: "Default meta description",
              required: false,
              admin: {
                width: "50%",
              },
            },
            {
              name: "ogImage",
              type: "upload",
              label: "Default OG (Open Graph) image for social sharing",
              relationTo: "media",
              required: false,
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
    },
  ],
};
