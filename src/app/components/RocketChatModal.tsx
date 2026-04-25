import { motion, AnimatePresence } from "motion/react";
import { Rocket, Sparkles, Flame, Zap, Diamond, X, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface RocketChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreak?: number;
  onSendSuccess?: () => void;
}

const AMOUNTS = [
  { value: 1, label: "Rocket", icon: Rocket, color: "#30D6D9", popular: false },
  { value: 5, label: "Rocket", icon: Rocket, color: "#f59e0b", popular: true },
  { value: 10, label: "Rocket", icon: Rocket, color: "#ef4444", popular: false },
  { value: 25, label: "Rocket", icon: Rocket, color: "#8b5cf6", popular: false },
  { value: 50, label: "Rocket", icon: Rocket, color: "#eab308", popular: false },
  { value: 100, label: "Rocket", icon: Rocket, color: "#ec4899", popular: false },
  { value: 200, label: "Rocket", icon: Rocket, color: "#10b981", popular: false },
  { value: 500, label: "Rocket", icon: Rocket, color: "#3b82f6", popular: false },
];

export function RocketChatModal({ isOpen, onClose, currentStreak = 0, onSendSuccess }: RocketChatModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [burstId, setBurstId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    const newBurstId = Date.now();
    setBurstId(newBurstId);
    setTimeout(() => {
      setBurstId(current => current === newBurstId ? null : current);
    }, 800);
  };

  const handleSend = () => {
    if (selectedAmount) {
      console.log(`Sending RocketChat: $${selectedAmount}, Message: ${message}`);
      if (onSendSuccess) {
        onSendSuccess();
      }
      onClose();
      setTimeout(() => {
        setSelectedAmount(null);
        setMessage("");
      }, 300);
    }
  };

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none font-sans font-normal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 pointer-events-auto"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 28, 
              stiffness: 300, 
              mass: 0.8 
            }}
            className="w-full relative pointer-events-auto bg-gradient-to-b from-[#13110d] to-[#0b0700] rounded-t-[2rem] border-t border-[#30D6D9]/30 shadow-[0_-20px_50px_rgba(48,214,217,0.15)] overflow-hidden pb-safe"
          >
            {/* Top Drag Pill */}
            <div className="w-full flex justify-center pt-3 pb-2 cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 rounded-full bg-[#393734] opacity-50" />
            </div>

            {/* Glowing Accent Top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#30D6D9]/50 to-transparent" />

            {/* Header Content */}
            <div className="px-6 pt-2 pb-4 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[24px] text-white flex items-center gap-2 font-semibold"
                >
                  <Rocket className="w-6 h-6 text-[#30D6D9]" />
                  RocketChat
                </motion.h2>
                <p className="text-[#a19d94] text-[13px] font-medium">Support the host with a blast!</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#1f1c19] flex items-center justify-center text-[#a19d94] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {currentStreak > 0 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-[#30D6D9]/20 to-transparent border border-[#30D6D9]/40 pl-2 pr-3 py-1 rounded-full shadow-[0_0_15px_rgba(48,214,217,0.2)]"
                  >
                    <Flame className="w-3.5 h-3.5 text-[#30D6D9] fill-[#30D6D9]" />
                    <span className="text-[12px] text-[#30D6D9] font-semibold">
                      {currentStreak}x
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Amounts Carousel */}
            <div className="relative w-full pb-4 pt-2">
              <div
                ref={scrollRef}
                className="flex flex-row items-center gap-4 px-6 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full pb-4 pt-6"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none', 
                  WebkitOverflowScrolling: 'touch' 
                }}
              >
                {AMOUNTS.map((item, index) => {
                  const isSelected = selectedAmount === item.value;
                  const Icon = item.icon;
                  
                  return (
                    <motion.div 
                      key={item.value} 
                      className="shrink-0 snap-center relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      {/* Popular Badge */}
                      {item.popular && (
                        <motion.div 
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#30D6D9] to-[#1a9da0] text-[#0b0700] text-[10px] px-2 py-0.5 rounded-full z-10 whitespace-nowrap shadow-lg shadow-[#30D6D9]/30 font-bold"
                        >
                          POPULAR
                        </motion.div>
                      )}

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAmountSelect(item.value)}
                        className={`relative w-[100px] h-[120px] rounded-[1.25rem] transition-all duration-300 flex flex-col items-center justify-center gap-2 border-2 ${
                          isSelected
                            ? 'bg-[#1a2b2b] border-[#30D6D9] shadow-[0_0_20px_rgba(48,214,217,0.3)] scale-105'
                            : 'bg-[#161410] border-[#2a2723] hover:border-[#393734]'
                        }`}
                      >
                        {/* Inner selected glow */}
                        {isSelected && (
                          <motion.div
                            layoutId="activeGlow"
                            className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-b from-[#30D6D9]/20 to-transparent pointer-events-none"
                          />
                        )}

                        {/* Icon Container */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 ${
                          isSelected ? 'scale-110 bg-[#0b0700]' : 'bg-[#1f1c19]'
                        }`}>
                          <Icon 
                            className={`w-6 h-6 transition-colors duration-300 ${
                              isSelected ? 'text-[#30D6D9]' : 'text-[#a19d94]'
                            }`}
                            strokeWidth={isSelected ? 2.5 : 2} 
                          />
                        </div>

                        {/* Amount & Label */}
                        <div className="flex flex-col items-center">
                          <span className={`text-[20px] leading-tight font-bold ${
                            isSelected ? 'text-white' : 'text-[#e6e0d4]'
                          }`}>
                            ${item.value}
                          </span>
                          <span className={`text-[11px] font-medium ${
                            isSelected ? 'text-[#30D6D9]' : 'text-[#6e6b66]'
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Edge Gradients for scrolling cue */}
              <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#13110d] to-transparent pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#13110d] to-transparent pointer-events-none" />
            </div>

            {/* Message Input - Only shows when amount is selected */}
            <AnimatePresence>
              {selectedAmount && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <div className="relative">
                    <div className="absolute top-3 left-4">
                      <MessageCircle className="w-5 h-5 text-[#a19d94]" />
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Add a message to your RocketChat..."
                      className="w-full bg-[#161410] border border-[#393734] rounded-2xl pl-12 pr-4 py-3 text-white placeholder:text-[#6e6b66] focus:outline-none focus:border-[#30D6D9] transition-colors resize-none h-[80px] text-[15px]"
                      maxLength={150}
                    />
                    <div className="absolute bottom-3 right-4 text-[10px] text-[#6e6b66]">
                      {message.length}/150
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Particle Burst for Selection */}
            <AnimatePresence>
              {burstId && selectedAmount && (
                <motion.div key={burstId} exit={{ opacity: 0, transition: { duration: 0.2 } }} className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[110]">
                  {[...Array(24)].map((_, i) => {
                    const angle = (i * Math.PI * 2) / 24;
                    const distance = 100 + Math.random() * 80;
                    const delay = Math.random() * 0.2;
                    const size = Math.random() > 0.5 ? 'w-4 h-4' : 'w-6 h-6';
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, x: 0, y: 100, opacity: 1, rotate: 0 }}
                        animate={{
                          scale: [0, 1.2, 0],
                          x: Math.cos(angle) * distance,
                          y: 100 + Math.sin(angle) * distance - (Math.random() * 100),
                          opacity: [1, 1, 0],
                          rotate: Math.random() * 360,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay }}
                        className="absolute"
                      >
                        {Math.random() > 0.5 ? (
                          <Sparkles className={`${size} text-[#30D6D9]`} fill="#30D6D9" />
                        ) : (
                          <Rocket className={`${size} text-[#45e8eb]`} fill="#45e8eb" />
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Area */}
            <div className="px-6 pb-8 pt-2 bg-gradient-to-t from-[#0b0700] via-[#0b0700] to-transparent">
              <motion.button
                initial={false}
                animate={{
                  scale: selectedAmount ? 1 : 0.98,
                  opacity: selectedAmount ? 1 : 0.5,
                }}
                whileTap={selectedAmount ? { scale: 0.95 } : {}}
                onClick={handleSend}
                disabled={!selectedAmount}
                className={`relative w-full h-[60px] rounded-full text-[18px] font-bold flex items-center justify-center gap-3 overflow-hidden ${
                  selectedAmount
                    ? 'bg-gradient-to-r from-[#30D6D9] via-[#45e8eb] to-[#30D6D9] text-[#0b0700] shadow-[0_10px_30px_rgba(48,214,217,0.3)]'
                    : 'bg-[#1f1c19] text-[#6e6b66]'
                }`}
              >
                {selectedAmount && (
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
                  />
                )}
                
                <Rocket className={`w-5 h-5 ${selectedAmount ? 'animate-bounce' : ''}`} />
                {selectedAmount ? `Send $${selectedAmount} RocketChat` : 'Select an amount'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}