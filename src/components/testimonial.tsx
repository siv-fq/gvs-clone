import type { Testimonial as TestimonialType } from "../../payload-types";

export default function Testimonials({
  testimonial,
}: {
  testimonial: TestimonialType;
}) {
  const { name, rating, feedback } = testimonial;
  return (
    <div className="flex flex-col w-[340px] px-2 lg:px-3">
      <div className="bg-primary text-sm rounded-2xl p-4 text-white relative">
        {feedback}
        <svg
          width="12"
          height="21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-[-4px] bottom-0"
        >
          <path
            d="M7.441 0s-.262 9.098.297 13.408c.361 2.788 2.048 4.935 3.195 6.103.335.341.1.94-.375.884-2.076-.25-5.993-1.113-9.342-4.075C-3.6 12.06 7.441 0 7.441 0z"
            fill="#327F6B"
          ></path>
        </svg>
      </div>
      <div className="text-right mt-2">
        <h4 className="text-sm">{name}</h4>
        <div className="rating-stars flex justify-end">
          {Array.from({
            length: Number(rating ?? 5),
          }).map((_, i) => (
            <svg
              key={i}
              width="20"
              height="21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.049 3.668c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.92-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 9.46c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292-.001-.001z"
                fill="#F2C94C"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
