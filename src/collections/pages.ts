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
            width: "50%",
          },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta description",
          required: false,
          admin: {
            width: "50%",
          },
        },
        {
          name: "featuredImage",
          label: "Featured Image (OG image for social sharing)",
          type: "upload",
          relationTo: "media",
          admin: {
            width: "50%",
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
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === "create" || operation === "update") {
          try {
            await fetch(`${process.env.SITE_URL}/api/revalidate`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                slug: doc.slug,
              }),
            });

            console.log(`Revalidation triggered for slug: ${doc.slug}`);
          } catch (error) {
            console.error("Revalidation failed:", error);
          }
        }
      },
    ],
  },
};
