"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { Navigation, SiteSetting } from "../../payload-types";

type HeaderLinks = NonNullable<Navigation["headerLinks"]>;

export default function Header({
  showHeaderOnLeft = false,
  headerLinks,
  siteName,
}: {
  showHeaderOnLeft?: boolean | null;
  headerLinks: HeaderLinks;
  siteName: NonNullable<SiteSetting["branding"]>["siteName"];
}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`bg-transparent  ${showHeaderOnLeft ? "md:absolute" : ""}`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6"
      >
        <div className="flex lg:flex-1 mr-7">
          <a href="#" className="flex items-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3867 6.27045C23.9877 6.87401 24.9827 8.39493 26.2301 10.4883H21.3867V6.27045ZM6.18622 10.6641C6.69548 10.6641 7.06512 10.9099 7.06512 11.4844C7.06512 11.9689 6.67305 12.3619 6.18874 12.3633H0.878906C0.393448 12.3633 0 12.757 0 13.2422C0 13.7276 0.393448 14.1211 0.878906 14.1211H8.78906C9.2791 14.1211 9.6714 14.5143 9.6714 15C9.6714 15.4855 9.27795 15.8789 8.7925 15.8789H0.878906C0.393448 15.8789 0 16.2724 0 16.7578C0 17.2433 0.393448 17.6367 0.878906 17.6367H2.8125V20.2734C2.8125 20.7589 3.20595 21.1523 3.69141 21.1523H5.45815C5.77309 22.7037 7.14386 23.8477 8.75977 23.8477C10.3757 23.8477 11.7464 22.7037 12.0614 21.1523H20.9855C21.3004 22.7037 22.6712 23.8477 24.2871 23.8477C25.903 23.8477 27.2738 22.7037 27.5887 21.1523H29.1211C29.6066 21.1523 30 20.7589 30 20.2734V15C30 12.4212 27.28 12.25 27.2775 12.2461H20.5078C20.0224 12.2461 19.6289 11.8526 19.6289 11.3672V6.09375H3.69141C3.20595 6.09375 2.8125 6.4872 2.8125 6.97266V8.90625H1.75781C1.27235 8.90625 0.878906 9.2997 0.878906 9.78516C0.878906 10.2706 1.27235 10.6641 1.75781 10.6641H6.18622ZM25.4265 19.3391C26.0557 19.9683 26.0557 20.9889 25.4265 21.6181C24.4144 22.6302 22.6758 21.9102 22.6758 20.4785C22.6758 19.0471 24.4144 18.327 25.4265 19.3391ZM9.89914 19.3391C10.5283 19.9683 10.5283 20.9889 9.89914 21.6181C8.88702 22.6302 7.14844 21.9102 7.14844 20.4785C7.14844 19.0471 8.88702 18.327 9.89914 19.3391Z"
                fill="#327F6B"
              ></path>
            </svg>
            {siteName && (
              <span className="ml-2 font-extrabold text-2xl text-black">
                {siteName}
              </span>
            )}
          </a>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu
              aria-hidden="true"
              className="size-6 text-black cursor-pointer"
            />
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "" : "hidden md:flex"
          } shadow-sm shadow-gray-600 absolute right-[19px] top-[23px] p-[30px] bg-white flex flex-col min-w-[150px] rounded-[5px] 
            md:static md:shadow-none md:right-auto md:top-auto md:p-0 md:bg-transparent md:flex-row md:gap-x-5  md:min-w-0 md:rounded-none`}
        >
          <X
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden size-6 text-black cursor-pointer absolute top-[5px] right-[5px]"
          />
          {headerLinks.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              target={link.newTab ? "_blank" : "_self"}
              rel={link.newTab ? "noopener noreferrer" : undefined}
              className="text-base/6 link my-1 md:my-0 font-medium text-gray-900"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
