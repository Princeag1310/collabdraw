export function Code({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code className={`bg-gray-200 px-2 py-1 rounded-md font-mono text-sm ${className}`}>
      {children}
    </code>
  );
}
