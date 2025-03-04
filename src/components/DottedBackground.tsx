'use client';

import { motion } from "framer-motion";

export function DottedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* Primary dot grid */}
        <div className="absolute inset-0 [background-image:radial-gradient(#6D28D9_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Secondary subtle dot grid */}
        <div className="absolute inset-0 [background-image:radial-gradient(#8B5CF6_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-50" />
      </motion.div>
    </div>
  );
} 