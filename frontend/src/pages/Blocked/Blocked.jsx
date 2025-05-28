import React from "react";
import { Ban } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Blocked() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <Ban className="w-16 h-16 text-red-600 mb-4 animate-pulse" />
        <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
          Temporarily Blocked
        </h1>
        <p className="text-gray-400 text-center max-w-md">
          Your account has been temporarily blocked by the admin due to unusual
          activity or policy violation. Please contact support if you believe
          this was a mistake.
        </p>

        {/* Go to Home Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-2 bg-red-600 hover:bg-red-700 transition-colors duration-300 rounded-xl text-white font-semibold shadow-lg"
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Blocked;

