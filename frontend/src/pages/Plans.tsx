import { useEffect, useState } from "react";
import { getPlans } from "../services/plans.api";
import PlanCard from "../components/plans/PlanCard";
import type { Plan } from "../types/plans.types";

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading plans...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Choose Your Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>
    </div>
  );
}
