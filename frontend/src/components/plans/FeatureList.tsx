export default function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-1 mt-3 text-gray-600">
      {features.map((f, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className="text-brand">•</span>
          {f}
        </li>
      ))}
    </ul>
  );
}
