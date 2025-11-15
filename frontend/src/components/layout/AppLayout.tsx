import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 bg-white dark:bg-black transition-colors flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
