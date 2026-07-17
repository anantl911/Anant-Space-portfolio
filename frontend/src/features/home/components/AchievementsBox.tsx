import React, { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { achievements } from '@/data/achievements';

const TypewriterLine = ({ 
  text, 
  startTyping, 
  onComplete 
}: { 
  text: string; 
  startTyping: boolean; 
  onComplete: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  
  // Use a ref to ensure we don't re-trigger the effect when onComplete changes
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!startTyping || isDone) return;

    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
        setIsDone(true);
        onCompleteRef.current();
      }
    }, 12); // Fast typing speed to prevent headache

    return () => clearInterval(intervalId);
  }, [text, startTyping, isDone]);

  return (
    <div className="font-mono text-gray-300 text-sm md:text-base mb-3 flex leading-relaxed group">
      <span className="mr-4 text-[#facd8a]/70 font-bold shrink-0">&gt;</span>
      <p className="m-0 flex-1 break-words group-hover:text-white transition-colors duration-300">
        {displayedText}
      </p>
    </div>
  );
};

const AchievementsBox = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [completedLines, setCompletedLines] = useState<number>(0);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full bg-[#1a2224]/80 backdrop-blur-md border border-gray-700 rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden"
    >
      {/* Subtle scanline overlay that blends with the dark theme */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] z-10 opacity-20 mix-blend-overlay" />
      
      <div className="relative z-20 flex flex-col gap-1">
        <div className="text-gray-500 mb-5 text-xs md:text-sm border-b border-gray-700/50 pb-3 font-mono">
          <span className="text-gray-400">root@portfolio:~#</span> ./fetch_achievements.sh
        </div>
        
        {achievements.map((achievement, index) => {
          const canStart = isInView && completedLines >= index;
          if (!canStart && completedLines < index) return null; 

          return (
            <TypewriterLine 
              key={index}
              text={achievement} 
              startTyping={canStart}
              onComplete={() => setCompletedLines(index + 1)}
            />
          );
        })}
        
        {/* Blinking cursor */}
        {isInView && (
          <div className="flex ml-7 mt-2">
            <div className="w-2.5 h-5 bg-[#facd8a] animate-[pulse_1s_ease-in-out_infinite]" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementsBox;
