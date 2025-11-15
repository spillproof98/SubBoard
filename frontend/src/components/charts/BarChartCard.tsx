import Card from "../ui/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Basic", sales: 30 },
  { name: "Pro", sales: 55 },
  { name: "Premium", sales: 12 },
];

export default function BarChartCard() {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Plan Subscriptions</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#6A38E3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
