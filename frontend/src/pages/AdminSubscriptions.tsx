import { useEffect, useState } from "react";
import { adminGetSubscriptions } from "../services/subscription.api";
import type { Subscription } from "../types/subscription.types";


export default function AdminSubscriptions() {
 const [subs, setSubs] = useState<Subscription[]>([]);


  useEffect(() => {
    (async () => {
      const data = await adminGetSubscriptions();
      setSubs(data);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Subscriptions</h1>

      <table className="w-full bg-white border shadow rounded-xl">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Plan</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Ends</th>
          </tr>
        </thead>

        <tbody>
          {subs.map((s: Subscription) => (
            <tr key={s.id} className="border-b">
              <td className="p-3">{s.user.email}</td>
              <td className="p-3">{s.plan.name}</td>
              <td className="p-3">{s.status}</td>
              <td className="p-3">
                {new Date(s.endDate).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
