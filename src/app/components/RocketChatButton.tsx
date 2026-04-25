import { motion, AnimatePresence } from "motion/react";
import { Rocket, Sparkles, DollarSign, MessageCircle, Coins } from "lucide-react";
import { useState } from "react";
import { RocketChatModal } from "./RocketChatModal";

interface RocketChatButtonProps {
  className?: string;
  variant?: "default" | "small";
}

export function RocketChatButton({ className = "fixed right-5 bottom-32 z-50", variant = "default" }: RocketChatButtonProps) {
  const [clicks, setClicks] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [streak, setStreak] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState<Array<{ id: number; text: string }>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const messages = [
    "+1 ROCKET!", "SEND IT!", "💰 BOOSTED!", "🔥 FIRE!", "NICE!", "⚡ ZAP!",
    "MEGA!", "INSANE!", "LEGENDARY!", "GODLIKE!", "💎 DIAMOND!", "👑 KING!"
  ];

  const handlePress = () => {
    setIsModalOpen(true);
  };

  const handleSendSuccess = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    setStreak(prev => prev + 1);
    setShowReward(true);

    // Add floating text
    const newText = { id: Date.now(), text: messages[Math.floor(Math.random() * messages.length)] };
    setFloatingTexts(prev => [...prev, newText]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== newText.id));
    }, 1500);

    setTimeout(() => setShowReward(false), 800);
  };

  return (
    <div className={className}>
      <motion.div
        animate={{
          y: variant === "small" ? [0, -3, 0] : [0, -10, 0],
          rotate: variant === "small" ? [0, 1, -1, 0] : [0, 2, -2, 0],
        }}
        transition={{
          duration: variant === "small" ? 3 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`relative ${variant === "small" ? "scale-75 origin-bottom-right" : ""}`}
      >
        {/* Multiple pulsing rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`ring-${i}`}
            animate={{
              scale: [1, 1.4 + i * 0.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.2,
            }}
            className="absolute inset-0 rounded-full border-2 border-[#30D6D9]"
          />
        ))}

        {/* Rotating gradient glow */}
        <motion.div
          animate={{
            rotate: 360,
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#30D6D9] via-transparent to-[#30D6D9] blur-xl"
        />


        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <motion.circle
            cx="32"
            cy="32"
            r="30"
            stroke="#30D6D9"
            strokeWidth="2"
            fill="none"
            strokeDasharray="188.4"
            initial={{ strokeDashoffset: 188.4 }}
            animate={{
              strokeDashoffset: 188.4 - (188.4 * (clicks % 10) / 10),
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              strokeDashoffset: { duration: 0.5 },
              opacity: { duration: 1.5, repeat: Infinity },
            }}
          />
        </svg>

        {/* Main button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.08 }}
          onClick={handlePress}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#30D6D9] to-[#1a9da0] shadow-2xl flex items-center justify-center overflow-hidden"
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ width: "50%" }}
          />

          <motion.div
            animate={showReward ? {
              y: [0, -30],
              opacity: [1, 0],
            } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Rocket className="w-7 h-7 text-[#0b0700]" strokeWidth={2.5} />
          </motion.div>

          {/* Inner pulse on click */}
          <AnimatePresence>
            {showReward && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white rounded-full"
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Click counter badge with animation */}
        {clicks > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0b0700] border-2 border-[#30D6D9] flex items-center justify-center shadow-lg"
          >
            <motion.span
              key={clicks}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-[#30D6D9] text-xs font-bold"
            >
              {clicks}
            </motion.span>
          </motion.div>
        )}

        {/* Streak indicator */}
        {streak > 2 && (
          <motion.div
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#30D6D9] px-3 py-1 rounded-full"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="text-[#0b0700] text-xs font-bold"
            >
              🔥 {streak}x STREAK!
            </motion.span>
          </motion.div>
        )}

        {/* Floating text feedback */}
        <AnimatePresence>
          {floatingTexts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: 0, opacity: 1, x: -20 }}
              animate={{ y: -60, opacity: 0, x: -20 + (Math.random() - 0.5) * 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 left-1/2 text-[#30D6D9] font-bold text-sm whitespace-nowrap pointer-events-none"
            >
              {item.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* RocketChat Modal */}
        <RocketChatModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentStreak={streak}
          onSendSuccess={handleSendSuccess}
        />

        {/* Escalating explosions based on streak */}
        <AnimatePresence>
          {showReward && (
            <>
              {/* Level 1: Basic coins (streak 0-4) */}
              {[...Array(streak < 5 ? 12 : streak < 10 ? 16 : 24)].map((_, i) => {
                const angle = (i * Math.PI * 2) / (streak < 5 ? 12 : streak < 10 ? 16 : 24);
                const distance = streak < 5 ? 50 : streak < 10 ? 65 : 80;
                return (
                  <motion.div
                    key={`coin-${i}`}
                    initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      scale: [0, 1, 0.8],
                      x: Math.cos(angle) * (distance + Math.random() * 20),
                      y: Math.sin(angle) * (distance + Math.random() * 20),
                      rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                      opacity: [1, 1, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className={`${streak < 5 ? 'w-5 h-5' : streak < 10 ? 'w-6 h-6' : 'w-7 h-7'} rounded-full bg-[#30D6D9] border-2 border-[#0b0700] flex items-center justify-center`}>
                      <DollarSign className={`${streak < 5 ? 'w-3 h-3' : streak < 10 ? 'w-4 h-4' : 'w-5 h-5'} text-[#0b0700]`} strokeWidth={3} />
                    </div>
                  </motion.div>
                );
              })}

              {/* Level 2: Add rockets (streak 5+) */}
              {streak >= 5 && [...Array(6)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 6;
                return (
                  <motion.div
                    key={`rocket-${i}`}
                    initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      scale: [0, 1.2, 0],
                      x: Math.cos(angle) * 70,
                      y: Math.sin(angle) * 70,
                      rotate: angle * (180 / Math.PI) - 90,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Rocket className="w-5 h-5 text-[#30D6D9]" strokeWidth={2} />
                  </motion.div>
                );
              })}

              {/* Level 3: Add chat bubbles (streak 10+) */}
              {streak >= 10 && [...Array(8)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 8;
                return (
                  <motion.div
                    key={`bubble-${i}`}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      x: Math.cos(angle) * 90,
                      y: Math.sin(angle) * 90,
                      opacity: [1, 1, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <MessageCircle className="w-6 h-6 text-[#30D6D9] fill-[#30D6D9]" strokeWidth={2} />
                  </motion.div>
                );
              })}

              {/* Level 4: Massive sparkle burst (streak 15+) */}
              {streak >= 15 && [...Array(20)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 20;
                return (
                  <motion.div
                    key={`mega-sparkle-${i}`}
                    initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      scale: [0, 1.8, 0],
                      x: Math.cos(angle) * 110,
                      y: Math.sin(angle) * 110,
                      rotate: 720,
                      opacity: [1, 1, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.05 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <Sparkles className="w-4 h-4 text-[#30D6D9] fill-[#30D6D9]" />
                  </motion.div>
                );
              })}

              {/* Expanding ring waves - more for higher streaks */}
              {[...Array(streak < 5 ? 3 : streak < 10 ? 5 : 7)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: streak < 5 ? 3 : streak < 10 ? 4 : 5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.08 }}
                  className={`absolute inset-0 rounded-full ${streak < 5 ? 'border-4' : streak < 10 ? 'border-[6px]' : 'border-8'} border-[#30D6D9]`}
                />
              ))}

              {/* Star burst particles */}
              {[...Array(streak < 5 ? 8 : streak < 10 ? 12 : 16)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / (streak < 5 ? 8 : streak < 10 ? 12 : 16)) * (streak < 5 ? 45 : streak < 10 ? 60 : 75),
                    y: Math.sin((i * Math.PI * 2) / (streak < 5 ? 8 : streak < 10 ? 12 : 16)) * (streak < 5 ? 45 : streak < 10 ? 60 : 75),
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 w-3 h-3"
                >
                  <Sparkles className="w-3 h-3 text-[#30D6D9] fill-[#30D6D9]" />
                </motion.div>
              ))}

              {/* MEGA explosion effect for streak 20+ */}
              {streak >= 20 && (
                <>
                  {/* Giant expanding circle */}
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 8, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-[#30D6D9]"
                  />
                  {/* Coin shower */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={`shower-${i}`}
                      initial={{ y: -50, x: (Math.random() - 0.5) * 200, opacity: 1 }}
                      animate={{
                        y: 150,
                        rotate: Math.random() * 720,
                        opacity: 0,
                      }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: Math.random() * 0.3 }}
                      className="absolute top-0 left-1/2"
                    >
                      <Coins className="w-5 h-5 text-[#30D6D9] fill-[#30D6D9]" />
                    </motion.div>
                  ))}
                </>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
