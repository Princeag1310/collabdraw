import { type JSX } from "react";

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      className={`block bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="text-lg font-bold mb-2">{title} →</h2>
      <p className="text-sm text-gray-600">{children}</p>
    </a>
  );
}
