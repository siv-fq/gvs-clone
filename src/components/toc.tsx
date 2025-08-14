"use client";
import { useRef } from "react";
import { Page } from "@payload-types";
import RichTextComponent from "@/components/rich-text";

type tocContentBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "tocWithContent" }
>;

export default function TocWithContentSection({
  block,
}: {
  block: tocContentBlock;
}) {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { heading, tocContent } = block;

  const scrollToSection = (id: string, index: number) => {
    window.history.pushState(null, "", `#${id}`);
    contentRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="toc-with-content mx-auto py-20">
      <div className="mx-auto max-w-5xl px-6 pb-8 lg:px-8 flex gap-8">
        <aside className="toc-heading hidden md:block md:w-[40%] sticky top-20 self-start h-fit pr-10">
          <nav className="space-y-2">
            <p className="font-extrabold text-lightText text-sm mb-3">
              ON THIS PAGE
            </p>
            {tocContent &&
              tocContent.map((item, index) => {
                const id = `section-${index + 1}`;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id, index)}
                    className="text-sm block text-left mb-3 font-extrabold hover:text-primary cursor-pointer transition-colors"
                  >
                    {item.heading}
                  </button>
                );
              })}
          </nav>
        </aside>

        <div className="toc-content md:w-[60%] space-y-10 scroll-smooth">
          {heading && (
            <h1 className="text-3xl md:text-4xl font-extrabold text-black">
              {heading}
            </h1>
          )}
          {tocContent &&
            tocContent.map((item, index) => {
              const id = `section-${index + 1}`;
              return (
                <div
                  id={id}
                  key={id}
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="scroll-mt-18"
                >
                  <h2 className="text-xl font-extrabold mb-4">
                    {item.heading}
                  </h2>
                  <div className="text-sm/tight max-w-none">
                    <RichTextComponent
                      content={item.content}
                      listStyle={false}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
