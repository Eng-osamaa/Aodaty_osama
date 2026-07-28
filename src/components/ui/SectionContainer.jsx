// src/components/ui/SectionContainer.jsx

export default function SectionContainer({
  children,
  className = "",
  as: Tag = "section",
}) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
