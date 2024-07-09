import { motion } from "framer-motion";

export default function ActiveTabIndecator() {
  return (
    <motion.span
      layoutId="tab-indicator"
      transition={{ duration: 0.2 }}
      className="w-full h-[2px] bg-black inline-block absolute left-0 bottom-0 right-0"
    />
  );
}
