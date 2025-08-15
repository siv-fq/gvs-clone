type SectionHeaderProps = {
  superHeading?: string | null;
  heading?: string | null;
  description?: string | null;
};
export default function SectionHeader({
  superHeading,
  heading,
  description,
}: SectionHeaderProps) {
  if (!superHeading && !heading && !description) {
    return null;
  }

  return (
    <div className="section-intro max-w-xl mx-auto text-center mb-5">
      {superHeading && (
        <h3 className="text-base md:text-lg font-extrabold uppercase text-primary">
          {superHeading}
        </h3>
      )}
      {heading && (
        <h2 className="text-3xl font-extrabold lg:text-4xl">{heading}</h2>
      )}
      {description && (
        <p className="mt-3 text-lg md:text-xl text-gray-600">{description}</p>
      )}
    </div>
  );
}
