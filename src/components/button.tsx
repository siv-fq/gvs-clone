import type { Page } from "../../payload-types";

type ContentMediaBlock = Extract<
  NonNullable<Page["blocks"]>[number],
  { blockType: "contentMedia" }
>;

// type CTA = NonNullable<ContentMediaBlock["cta"]>[number];
type CTA = Omit<NonNullable<ContentMediaBlock["cta"]>[number], "blockType">;

export default function Button({ btn }: { btn: CTA }) {
  return (
    <a
      href={btn.link ? btn.link : ""}
      className={`${btn.style === "primary" ? "bg-primary hover:bg-darkPrimary  text-white rounded-full" : "secondary"} py-2 pl-5 pr-9 relative group  cursor-pointer mt-2 inline-block w-auto text-center `}
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
    </a>
  );
}
