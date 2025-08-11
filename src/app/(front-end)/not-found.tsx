import Button from "@/components/button";
import Image from "next/image";
import Header from "@/components/header";

export default function NotFound() {
  const cta = {
    link: "/contact-us",
    newTab: false,
    style: "primary",
    text: "Contact Us",
  } as const;

  return (
    <>
      <Header />
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <section className="w-full px-6 py-10">
          <div className="max-w-5xl px-6 lg:px-8 mx-auto flex flex-col md:items-center gap-6 md:flex-row md:py-20">
            <div className="flex-1 md:text-left">
              <div className="prose richtext-content">
                <h3 className="text-base md:text-lg font-extrabold uppercase text-primary">
                  Something&apos;s Missing
                </h3>
                <h2 className="text-4xl md:text-5xl font-extrabold my-2">
                  Oops...!
                </h2>
                <p className="text-xl text-lightText">
                  We&apos;ve encountered an error while looking for the page. As
                  we look into this further, please consider going back home.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button btn={cta} />
              </div>
            </div>

            <div className="flex-1">
              <Image
                src="https://greenvanservices.com/static/svg/v2/workers-overalls-standing-near-closed-broken-elevator-repairmen-engineers-technicians-flat-vector-illustration-public-utility-service-concept.svg"
                alt="Content Media"
                width={500}
                height={340}
                className="ml-auto md:ml-0 w-full"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
