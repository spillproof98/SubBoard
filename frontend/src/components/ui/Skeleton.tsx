export default function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-300/40 dark:bg-gray-700/40 rounded-lg ${className}`}
    />
  );
}
