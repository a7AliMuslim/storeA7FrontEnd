import React from "react";
import { motion, easeOut } from "framer-motion";

const WaterDroplet = () => {
  return (
    <div className="absolute w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Droplet */}
      <motion.div
        className="absolute top-0 left-1/2 w-4 h-4 bg-blue-400 rounded-full"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: "80vh", opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Ripple Effect */}
      <motion.div
        className="absolute bottom-20 left-1/2 w-0 h-0 border-2 border-blue-400 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 5, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: easeOut }}
      />
    </div>
  );
};

export default WaterDroplet;
