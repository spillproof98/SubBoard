import { motion } from "framer-motion";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border rounded-xl p-6 shadow-sm"
    >
      {children}
    </motion.div>
  );
}
