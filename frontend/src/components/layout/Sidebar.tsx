import { NavLink } from "react-router-dom";
import { Home, Layers, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ width: 240 }}
      whileHover={{ width: 270 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen gradient-brand-dark glass text-white p-6 border-r"
    >
      <h1 className="text-3xl font-bold mb-10">SubsBoard</h1>

      <nav className="space-y-4">
        <SidebarItem to="/app" Icon={Home} label="Dashboard" />
        <SidebarItem to="/app/plans" Icon={Layers} label="Plans" />
        <SidebarItem to="/app/subscription" Icon={UserCheck} label="Subscription" />
      </nav>
    </motion.aside>
  );
}

function SidebarItem({
  to,
  Icon,
  label,
}: {
  to: string;
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 text-lg px-3 py-2 rounded-lg transition ${
          isActive ? "bg-white/20 text-white" : "text-gray-200 hover:text-white"
        }`
      }
    >
      <Icon size={22} /> {label}
    </NavLink>
  );
}
