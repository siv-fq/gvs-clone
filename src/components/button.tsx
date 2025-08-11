import type { Page } from "../../payload-types";
import Link from "next/link";
import clsx from "clsx";

type ContentMediaBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "contentMedia" }
>;

// type CTA = NonNullable<ContentMediaBlock["cta"]>[number];
type CTA = Omit<NonNullable<ContentMediaBlock["cta"]>[number], "blockType">;

export default function Button({ btn }: { btn: CTA }) {
  const btnClass = clsx(
    "py-2 pr-9 relative group cursor-pointer inline-block w-auto text-center font-medium",
    btn.style === "primary"
      ? "bg-primary hover:bg-darkPrimary text-white mt-2 rounded-full pl-5 primary-btn"
      : "secondary-btn text-lg leading-[1.3]"
  );

  return (
    <Link
      href={btn.link ? btn.link : ""}
      className={btnClass}
      target={btn.newTab ? "_blank" : "_self"}
    >
      {btn.text}
      <svg
        className="absolute top-2 right-2 transition-all duration-300 ease-in-out opacity-100 translate-x-0 group-hover:opacity-0 group-hover:translate-x-1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5L16 12L9 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="absolute top-2 right-2 transition-all duration-300 ease-in-out opacity-0 translate-x-[-5px] group-hover:opacity-100 group-hover:translate-x-0"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 5L21 12M21 12L14 19M21 12H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
