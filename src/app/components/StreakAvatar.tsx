import { motion } from "motion/react";
import { Rocket, Sparkles, Crown } from "lucide-react";

interface StreakAvatarProps {
  imageUrl: string;
  streak: number;
  username?: string;
}

export function StreakAvatar({ imageUrl, streak, username }: StreakAvatarProps) {
  const getStreakLevel = () => {
    if (streak >= 20) return 5; // Legendary
    if (streak >= 15) return 4; // Epic
    if (streak >= 10) return 3; // High
    if (streak >= 5) return 2; // Medium
    return 1; // Basic
  };

  const level = getStreakLevel();

  return (
    <div className="relative shrink-0">
      <motion.div
        animate={{
          y: level >= 3 ? [0, -4, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Level 2+: Pulsing glow */}
        {level >= 2 && (
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute inset-0 rounded-full blur-md ${
              level === 2 ? 'bg-[#30D6D9]' :
              level === 3 ? 'bg-[#30D6D9]' :
              level === 4 ? 'bg-gradient-to-r from-[#30D6D9] to-[#1a9da0]' :
              'bg-gradient-to-r from-[#30D6D9] via-[#f5f1e9] to-[#30D6D9]'
            }`}
          />
        )}

        {/* Level 3+: Pulsing rings */}
        {level >= 3 && [0, 1].map((i) => (
          <motion.div
            key={`ring-${i}`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.4,
            }}
            className="absolute inset-0 rounded-full border-2 border-[#30D6D9]"
          />
        ))}

        {/* Level 4+: Orbiting sparkles */}
        {level >= 4 && [0, 1, 2].map((i) => (
          <motion.div
            key={`sparkle-${i}`}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i,
            }}
            className="absolute inset-0"
            style={{
              width: '44px',
              height: '44px',
              left: '-4px',
              top: '-4px',
            }}
          >
            <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 text-[#30D6D9]" />
          </motion.div>
        ))}

        {/* Level 5: Rotating gradient border */}
        {level === 5 && (
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(0deg, #30D6D9, #f5f1e9, #30D6D9)',
              padding: '2px',
            }}
          >
            <div className="w-full h-full rounded-full bg-[#0b0700]" />
          </motion.div>
        )}

        {/* Avatar */}
        <div className={`relative rounded-full overflow-hidden ${
          level === 1 ? 'w-9 h-9' :
          level === 2 ? 'w-9 h-9 ring-2 ring-[#30D6D9]' :
          level === 3 ? 'w-9 h-9 ring-2 ring-[#30D6D9]' :
          level === 4 ? 'w-9 h-9 ring-[3px] ring-[#30D6D9]' :
          'w-9 h-9'
        }`}>
          <img
            src={imageUrl}
            alt={username || 'User'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Streak badge */}
        {level >= 2 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute -bottom-1 -right-1 rounded-full flex items-center justify-center ${
              level === 2 ? 'w-4 h-4 bg-[#30D6D9]' :
              level === 3 ? 'w-5 h-5 bg-[#30D6D9]' :
              level === 4 ? 'w-5 h-5 bg-gradient-to-br from-[#30D6D9] to-[#1a9da0]' :
              'w-6 h-6 bg-gradient-to-br from-[#30D6D9] via-[#f5f1e9] to-[#30D6D9]'
            }`}
          >
            {level < 5 ? (
              <motion.span
                animate={level >= 4 ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className={`font-bold text-[#0b0700] ${
                  level === 2 ? 'text-[8px]' : 'text-[10px]'
                }`}
              >
                {streak}
              </motion.span>
            ) : (
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Crown className="w-3 h-3 text-[#0b0700]" strokeWidth={2.5} />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Level 5: Rocket indicator */}
        {level === 5 && (
          <motion.div
            animate={{
              y: [0, -3, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="absolute -top-2 -left-2"
          >
            <div className="w-4 h-4 rounded-full bg-[#30D6D9] flex items-center justify-center">
              <Rocket className="w-2.5 h-2.5 text-[#0b0700]" strokeWidth={2.5} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
