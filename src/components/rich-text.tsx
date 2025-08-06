import Image from "next/image";
import Button from "@/components/button";

import type { Page } from "../../payload-types";
type ContentMediaBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "contentMedia" }
>;

type RichTextContent = NonNullable<ContentMediaBlock["content"]>[number];

export default function RichText({ content }: { content: RichTextContent }) {
  console.log(content);
}
