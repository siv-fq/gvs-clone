import type {
  DefaultNodeTypes,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import React from "react";

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;

  switch (relationTo) {
    case "posts":
      return `/posts/${slug}`;
    case "categories":
      return `/category/${slug}`;
    case "pages":
      return `/${slug}`;
    default:
      return `/${relationTo}/${slug}`;
  }
};

const createJSXConverters =
  (isAlignedCenter: boolean): JSXConvertersFunction<DefaultNodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      const Tag = node.tag;
      const className =
        {
          h1: "text-3xl md:text-4xl font-extrabold mb-2",
          h2: "text-3xl md:text-4xl font-extrabold mb-2",
          h3: "text-xl font-extrabold my-2",
          h4: "text-base md:text-lg font-semibold my-2",
          h5: "text-lg font-medium my-1",
          h6: "text-base font-medium my-1",
        }[node.tag] ?? "";

      return <Tag className={className}>{children}</Tag>;
    },

    paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      return (
        <p
          className={`text-lg text-lightText my-2 ${isAlignedCenter && "mx-auto max-w-xl"}`}
        >
          {children}
        </p>
      );
    },

    list: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      if (node.tag === "ul") {
        return (
          <ul className="leaf-style-list text-lg text-lightText">{children}</ul>
        );
      } else if (node.tag === "ol") {
        return (
          <ol className="list-decimal ml-6 my-2 text-lightText">{children}</ol>
        );
      }
    },

    listitem: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      return (
        <li className={`mb-1 ${isAlignedCenter && "w-max mx-auto"}`}>
          {children}
        </li>
      );
    },

    quote: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
          {children}
        </blockquote>
      );
    },

    horizontalrule: () => {
      console.log("Custom HR converter called");
      return <hr className="my-2 border-t border-gray-600" />;
    },
  });

export default function RichTextRenderer({
  content,
  isAlignedCenter = false,
}: {
  content: SerializedEditorState;
  isAlignedCenter?: boolean;
}) {
  if (!content) return null;
  const converters = createJSXConverters(isAlignedCenter);
  return (
    <div className="prose prose-lg max-w-none">
      <RichText data={content} converters={converters} />
    </div>
  );
}
