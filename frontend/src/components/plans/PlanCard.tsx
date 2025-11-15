import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FeatureList from "./FeatureList";

import type { Plan } from "../../types/plans.types";
import { subscribeToPlan, getActiveSubscription } from "../../services/subscription.api";


export default function PlanCard({ plan }: { plan: Plan }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const active = await getActiveSubscription();


        if (active && active.plan.id === plan.id) {
          setIsSubscribed(true);
        }
      } catch (err) {
        console.error("Failed to check subscription:", err);
      }
    })();
  }, [plan.id]);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      await subscribeToPlan(plan.id);
      setIsSubscribed(true);
    } catch (err) {
      console.error("Subscription failed:", err);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.25 }}
      className="
        relative p-8 rounded-3xl shadow-xl border 
        bg-white/80 backdrop-blur-lg 
        dark:bg-gray-900/70 dark:border-gray-700 
        hover:shadow-2xl transition-all
      "
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/40 to-purple-700/30 opacity-10 pointer-events-none"></div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
        {plan.name}
      </h2>

      <div className="mt-4 mb-6">
        <p className="text-5xl font-extrabold text-brand drop-shadow-sm">
          ${plan.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 font-medium">
          per {plan.billingCycle}
        </p>
      </div>

      <FeatureList features={plan.features} />

      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={isSubscribed || loading}
        onClick={handleSubscribe}
        className={`
          w-full mt-8 py-3 rounded-xl font-semibold text-white
          transition shadow-lg 
          ${isSubscribed
            ? "bg-green-600 cursor-not-allowed shadow-inner"
            : "bg-gradient-to-r from-brand to-purple-600 hover:shadow-xl"}
          ${loading ? "opacity-60" : ""}
        `}
      >
        {isSubscribed ? "Subscribed ✓" : loading ? "Processing..." : "Subscribe"}
      </motion.button>
    </motion.div>
  );
}
