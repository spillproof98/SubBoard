import { useEffect, useState } from "react";
import { getMySubscriptions } from "../services/subscription.api";
import type { Subscription } from "../types/subscription.types";

export default function MySubscriptions() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getMySubscriptions();
      setSubs(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  if (subs.length === 0)
    return (
      <div className="p-6 text-lg text-gray-600 dark:text-gray-300">
        You have no subscriptions yet.
      </div>
    );

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Subscriptions
      </h1>

      <div className="space-y-6">
        {subs.map((sub) => (
          <div
            key={sub.id}
            className="
              p-6 rounded-2xl shadow-lg border
              bg-white/80 dark:bg-gray-900/70 
              backdrop-blur-md dark:border-gray-700
            "
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {sub.plan.name}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mt-1">
              <strong>Status:</strong>{" "}
              <span
                className={
                  sub.status === "active"
                    ? "text-green-500 font-semibold"
                    : "text-red-400 font-semibold"
                }
              >
                {sub.status}
              </span>
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Price:</strong> ${sub.plan.price}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>Ends:</strong>{" "}
              {new Date(sub.endDate).toDateString()}
            </p>

            <div className="mt-3">
              <strong className="dark:text-white">Features:</strong>
              <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
                {sub.plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
