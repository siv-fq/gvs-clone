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
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
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
  ],
};

export const FaqBlock: Block = {
  imageURL: "/preview-images/faq.png",
  slug: "faqs",
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
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "selectedTestimonials",
      type: "relationship",
      relationTo: "testimonials",
      hasMany: true,
      required: true,
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

export const ContentMediaBlock: Block = {
  imageURL: "/preview-images/ping-pong.png",
  slug: "contentMedia",
  fields: [
    {
      type: "row",
      fields: [
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
            width: "50%",
          },
        },
        {
          name: "superHeading",
          type: "text",
          required: false,
          label: "Eyebrow Heading",
          admin: {
            width: "50%",
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
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
