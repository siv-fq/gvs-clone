import { Block } from "payload";

export const ButtonBlock: Block = {
  slug: "button",
  labels: {
    singular: "Button",
    plural: "Buttons",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Button Text",
          admin: {
            width: "33%",
          },
        },
        {
          name: "link",
          type: "text",
          label: "Link",
          admin: {
            width: "33%",
          },
        },
        {
          name: "style",
          type: "select",
          options: [
            {
              label: "Primray",
              value: "primary",
            },
            {
              label: "Secondary",
              value: "secondary",
            },
          ],
          defaultValue: "primary",
          required: true,
          admin: {
            width: "33%",
          },
        },
        {
          name: "newTab",
          type: "checkbox",
          label: "Open in New Tab",
          admin: {
            width: "50%",
          },
        },
      ],
    },
  ],
};

export const ImageGridBlock: Block = {
  slug: "imageGrid",
  imageURL: "/preview-images/image-grid.png",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "superHeading",
          type: "text",
          required: false,
          label: "Eyebrow Heading",
          admin: {
            width: "50%",
          },
        },
        {
          name: "heading",
          type: "text",
          required: false,
          admin: {
            width: "50%",
          },
        },
        {
          name: "description",
          type: "textarea",
          admin: {
            width: "100%",
          },
        },
        {
          name: "columnsPerRow",
          type: "select",
          label: "columns Per Row",
          required: true,
          options: [
            { label: "2 column", value: "2" },
            { label: "3 column", value: "3" },
            { label: "4 column", value: "4" },
            { label: "5 column", value: "5" },
          ],
          defaultValue: "4",
          admin: {
            width: "25%",
          },
        },
        {
          name: "style",
          type: "select",
          label: "Grid style",
          required: true,
          options: [
            { label: "Normal", value: "normal" },
            { label: "Card", value: "card" },
            { label: "Icon Grid", value: "icon" },
          ],
          defaultValue: "normal",
          admin: {
            width: "25%",
          },
        },
        {
          name: "alignment",
          type: "select",
          label: "alignment",
          required: true,
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
          ],
          defaultValue: "left",
          admin: {
            width: "25%",
          },
        },
        {
          name: "bgColor",
          type: "select",
          label: "Bg Color",
          required: true,
          options: [
            { label: "White", value: "white" },
            { label: "graygreen", value: "grayGreen" },
          ],
          defaultValue: "white",
          admin: {
            width: "25%",
          },
        },
      ],
    },
    {
      name: "items",
      label: "Image Grid Items",
      type: "array",
      required: true,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "title",
              type: "text",
              admin: {
                width: "100%",
              },
            },
            {
              name: "content",
              type: "textarea",
              admin: {
                width: "50%",
              },
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
    },
    {
      name: "cta",
      type: "blocks",
      label: "Call to Action",
      blocks: [ButtonBlock],
      maxRows: 1,
    },
  ],
};

export const FaqBlock: Block = {
  imageURL: "/preview-images/faq.png",
  slug: "faqs",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "superHeading",
          type: "text",
          required: false,
          label: "Eyebrow Heading",
          admin: {
            width: "40%",
          },
        },
        {
          name: "heading",
          type: "text",
          required: false,
          admin: {
            width: "40%",
          },
        },
        {
          name: "bgColor",
          type: "select",
          label: "Bg Color",
          required: true,
          options: [
            { label: "White", value: "white" },
            { label: "graygreen", value: "grayGreen" },
          ],
          defaultValue: "white",
          admin: {
            width: "20%",
          },
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "faqs",
      type: "array",
      label: "FAQ Items",
      required: true,
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "richText",
          required: true,
        },
      ],
    },
  ],
};

export const RichTextBlock: Block = {
  imageURL: "/preview-images/richtext.png",
  slug: "richText",
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};

export const TestimonialsBlock: Block = {
  imageURL: "/preview-images/testimonials.png",
  slug: "testimonials",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "superHeading",
          type: "text",
          required: false,
          label: "Eyebrow Heading",
          admin: {
            width: "40%",
          },
        },
        {
          name: "heading",
          type: "text",
          required: false,
          admin: {
            width: "40%",
          },
        },
        {
          name: "bgColor",
          type: "select",
          label: "Bg Color",
          required: true,
          options: [
            { label: "White", value: "white" },
            { label: "graygreen", value: "grayGreen" },
          ],
          defaultValue: "white",
          admin: {
            width: "20%",
          },
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "selectedTestimonials",
      type: "relationship",
      relationTo: "testimonials",
      hasMany: true,
      required: true,
    },
    {
      name: "cta",
      type: "blocks",
      label: "Call to Action",
      blocks: [ButtonBlock],
      maxRows: 1,
    },
  ],
};

export const RelatedContentBlock: Block = {
  imageURL: "/preview-images/related-content.png",
  slug: "relatedContent",
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      name: "relatedBlogs",
      type: "relationship",
      relationTo: "blogs",
      hasMany: true,
    },
  ],
};

export const TocWithContent: Block = {
  imageURL: "/preview-images/toc-content.png",
  slug: "tocWithContent",
  fields: [
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: false,
    },
    {
      name: "tocContent",
      label: "Toc Content",
      type: "array",
      minRows: 1,
      admin: {
        components: {
          RowLabel: "@/components/payload/array-row-label",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "heading",
              type: "text",
              label: "Heading",
              required: true,
              admin: {
                width: "30%",
              },
            },
            {
              name: "content",
              type: "richText",
              label: "Content",
              required: true,
              admin: {
                width: "70%",
              },
            },
          ],
        },
      ],
    },
  ],
};

export const HeaderCta: Block = {
  imageURL: "/preview-images/header-cta.png",
  slug: "headerCta",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "superHeading",
          type: "text",
          required: false,
          label: "Eyebrow Heading",
          admin: {
            width: "40%",
          },
        },
        {
          name: "heading",
          type: "text",
          required: false,
          admin: {
            width: "40%",
          },
        },
        {
          name: "bgColor",
          type: "select",
          label: "Bg Color",
          required: true,
          options: [
            { label: "White", value: "white" },
            { label: "graygreen", value: "grayGreen" },
          ],
          defaultValue: "white",
          admin: {
            width: "20%",
          },
        },
        {
          name: "description",
          type: "textarea",
          admin: {
            width: "100%",
          },
        },
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          required: false,
          admin: {
            width: "100%",
          },
        },
        {
          name: "removeBottomSpace",
          label: "Remove Spacing Below",
          type: "checkbox",
          defaultValue: false,
          admin: {
            width: "50%",
          },
        },
        {
          name: "removeBottomBorder",
          label: "Remove Bottom Border",
          type: "checkbox",
          defaultValue: false,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "cta",
      type: "blocks",
      label: "Call to Action",
      blocks: [ButtonBlock],
      maxRows: 1,
    },
  ],
};
export const ContentMediaBlock: Block = {
  imageURL: "/preview-images/ping-pong.png",
  slug: "contentMedia",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "superHeading",
          type: "text",
          required: false,
          label: "Eyebrow Heading",
          admin: {
            width: "40%",
          },
        },
        {
          name: "blockStyle",
          type: "select",
          label: "Style",
          required: true,
          options: [
            { label: "Two Column", value: "twoColumn" },
            { label: "Hero", value: "hero" },
            { label: "Single Column", value: "contentOnly" },
          ],
          defaultValue: "twoColumn",
          admin: {
            width: "20%",
          },
        },
        {
          name: "alignment",
          type: "select",
          label: "Content Side",
          required: true,
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
          defaultValue: "left",
          admin: {
            width: "20%",
          },
        },
        {
          name: "bgColor",
          type: "select",
          label: "Bg Color",
          required: true,
          options: [
            { label: "White", value: "white" },
            { label: "graygreen", value: "grayGreen" },
          ],
          defaultValue: "white",
          admin: {
            width: "20%",
          },
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "cta",
      type: "blocks",
      label: "Call to Action",
      blocks: [ButtonBlock],
      maxRows: 2,
    },
    {
      type: "row",
      fields: [
        {
          name: "mediaType",
          type: "select",
          label: "Media Type",
          required: true,
          options: [
            { label: "Media", value: "media" },
            { label: "Embedded Video", value: "embeddedVideo" },
            { label: "Form", value: "form" },
            { label: "None", value: "none" },
          ],
          defaultValue: "media",
          admin: {
            width: "30%",
          },
        },
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: {
            condition: (_, siblingData) =>
              siblingData.mediaType !== "none" &&
              siblingData.mediaType === "media",
            width: "40%",
          },
        },
        {
          name: "videoLink",
          type: "text",
          label: "Video Link",
          required: true,
          admin: {
            condition: (_, siblingData) =>
              siblingData.mediaType !== "none" &&
              siblingData.mediaType === "embeddedVideo",
            width: "35%",
          },
        },
        {
          name: "videoCoverImage",
          type: "upload",
          relationTo: "media",
          label: "Video Cover Image",
          required: false,
          admin: {
            condition: (_, siblingData) =>
              siblingData.mediaType !== "none" &&
              siblingData.mediaType === "embeddedVideo",
            width: "35%",
          },
        },
        {
          name: "form",
          type: "select",
          label: "Form",
          required: true,
          options: [
            { label: "None", value: "none" },
            { label: "Contact Us", value: "contactUs" },
          ],
          defaultValue: "none",
          admin: {
            condition: (_, siblingData) =>
              siblingData.mediaType !== "none" &&
              siblingData.mediaType === "form",
            width: "70%",
          },
        },
        {
          name: "imageStyle",
          type: "select",
          label: "Image Style",
          required: true,
          options: [
            { label: "Normal", value: "normal" },
            { label: "Card", value: "card" },
          ],
          defaultValue: "normal",
          admin: {
            condition: (_, siblingData) =>
              siblingData.mediaType !== "none" &&
              siblingData.mediaType === "media",
            width: "30%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "selectedTestimonials",
          type: "relationship",
          relationTo: "testimonials",
          label: "Testimonial",
          hasMany: false,
          required: false,
          admin: {
            width: "40%",
          },
        },
      ],
    },
  ],
};
