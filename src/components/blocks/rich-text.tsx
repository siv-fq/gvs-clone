import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import RichTextRenderer from "@/components/widgets/rich-text";
export default function RichText({
  content,
}: {
  content: SerializedEditorState;
}) {
  if (!content) return null;
  return (
    <section className="py-20 px-6 w-full">
      <div className="mx-auto max-w-6xl">
        <RichTextRenderer content={content} />
      </div>
    </section>
  );
}
