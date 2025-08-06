import type { BlockContent } from "../../payload-types";
import Image from "next/image";

export default function ImageGrid({ block }: { block: BlockContent }) {
  if (block.blockType !== "image-grid") return null;
  console.log(block);
  return (
    <div className="mx-auto py-10">
      <div className="mx-auto">
        <h2 className="text-2xl font-semibold sm:text-3xl">{block.heading}</h2>
        {block.description && (
          <p className="mt-4 text-lg/8 text-white">{block.description}</p>
        )}
      </div>

      <ul
        role="list"
        className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        {block.items.map((item, index) => (
          <li key={index}>
            {item.image?.url && (
              <Image
                alt={item.image.alt ?? "Grid Image"}
                src={item.image.url}
                className="aspect-3/2 w-full rounded-2xl object-cover"
                width={500}
                height={300}
              />
            )}
            <h3 className="mt-3 font-semibold tracking-tight text-white">
              {item.title}
            </h3>
            {item.paragraph && <p className="text-white">{item.paragraph}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
