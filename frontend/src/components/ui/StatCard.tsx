export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      className="
        p-6 rounded-2xl shadow-md border 
        bg-white dark:bg-[#1a1a1a] 
        border-gray-200 dark:border-gray-700
      "
    >
      <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>

      <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
}
