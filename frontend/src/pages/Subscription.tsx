import { useEffect, useState } from "react";
import { getActiveSubscription, unsubscribe } from "../services/subscription.api";
import type { Subscription } from "../types/subscription.types";

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadActive() {
    const active = await getActiveSubscription();
    setSubscription(active);
  }

  useEffect(() => {
    loadActive();
  }, []);

  async function handleUnsubscribe() {
    if (!subscription) return;

    const confirmUnsub = window.confirm("Are you sure you want to unsubscribe?");
    if (!confirmUnsub) return;

    try {
      setLoading(true);
      const res = await unsubscribe(subscription.id);
      setMessage(res.message || "Unsubscribed successfully");
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-6 py-6">
      <h1 className="text-3xl font-bold dark:text-white mb-4">
        Active Subscription
      </h1>

      {message && (
        <div className="p-4 bg-green-600/20 text-green-800 dark:text-green-300 rounded-lg mb-4">
          {message}
        </div>
      )}

      {!subscription ? (
        <div className="text-gray-600 dark:text-gray-300 text-lg">
          No active subscription.  
          <br />
          Go to <strong className="text-brand">Plans</strong> to subscribe.
        </div>
      ) : (
        <div
          className="
            p-8 rounded-3xl shadow-xl border
            bg-white/80 backdrop-blur-lg
            dark:bg-gray-900/70 dark:border-gray-700
            max-w-3xl
          "
        >
          <h2 className="text-xl font-bold dark:text-white mb-4">
            {subscription.plan.name}
          </h2>

          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            <p>
              <strong className="dark:text-white">Price:</strong> $
              {subscription.plan.price}
            </p>

            <p>
              <strong className="dark:text-white">Billing:</strong>{" "}
              {subscription.plan.billingCycle}
            </p>

            <p>
              <strong className="dark:text-white">Status:</strong>{" "}
              <span className="text-green-500 font-semibold">
                {subscription.status}
              </span>
            </p>

            <p>
              <strong className="dark:text-white">Ends:</strong>{" "}
              {new Date(subscription.endDate).toDateString()}
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
            Features
          </h3>
          <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300 space-y-1">
            {subscription.plan.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <button
            onClick={handleUnsubscribe}
            disabled={loading}
            className="
              mt-8 w-full py-3 rounded-xl font-bold
              bg-red-500 hover:bg-red-600 
              text-white shadow-lg
              disabled:opacity-50
            "
          >
            {loading ? "Processing..." : "Unsubscribe"}
          </button>
        </div>
      )}
    </div>
  );
}
