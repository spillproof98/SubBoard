import StatCard from "../components/ui/StatCard";
import LineChartCard from "../components/charts/LineChartCard";
import BarChartCard from "../components/charts/BarChartCard";

export default function Dashboard() {
  return (
    <div className="space-y-8 text-gray-900 dark:text-white transition-colors">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value="1,240" />
        <StatCard title="Active Subscriptions" value="389" />
        <StatCard title="Monthly Revenue" value="$4,780" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartCard />
        <BarChartCard />
      </div>
    </div>
  );
}
