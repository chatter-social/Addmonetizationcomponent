import { motion } from "motion/react";
import { Rocket } from "lucide-react";

export function AnimatedRocketButton() {
  return (
    <div className="relative">
      <motion.div className="relative">
        {/* Subtle glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-[40px] bg-[#30D6D9] blur-md"
        />

        {/* Main button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => console.log("RocketChat triggered!")}
          className="relative bg-[#30D6D9] content-stretch flex items-center justify-center overflow-clip p-[12px] rounded-[40px] shrink-0"
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-[40px]"
            style={{ width: "50%" }}
          />

          <Rocket className="w-5 h-5 text-[#0b0700]" strokeWidth={2.5} />
        </motion.button>
      </motion.div>
    </div>
  );
}
