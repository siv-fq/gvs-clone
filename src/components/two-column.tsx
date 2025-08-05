import Image from "next/image";

export default function TwoColumn() {
  return (
    <section className="w-full py-8">
      <div className="w-5xl mx-auto flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Left Column */}
        <div className="flex-1 lg:text-left">
          <div className="prose richtext-content">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
              1. Send us a WhatsApp message
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">
                Simply send us a picture of your items on WhatsApp.
              </li>
              <li className="mb-2">Our team calculates the price.</li>
              <li className="mb-2">
                Share your information confidently, and your details will remain
                completely confidential.
              </li>
            </ul>
          </div>
          <a
            href="#"
            className="bg-brand-blue mt-2 inline-block w-auto text-center text-white py-2 px-4 rounded"
            target="_self"
          >
            Book Now
          </a>
        </div>

        {/* Right Column - Image */}
        <div className="flex-1">
          <Image
            src="/took-photo.webp"
            alt="took photo"
            width={500}
            height={340}
            className="max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
