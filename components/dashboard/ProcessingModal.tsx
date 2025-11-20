'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Brain, FileSearch, Calendar, Network } from 'lucide-react';
import { ProcessingStatus } from '@/types/contract';
import { useState, useEffect } from 'react';

interface ProcessingModalProps {
  isOpen: boolean;
  status: ProcessingStatus | null;
}

const thinkingMessages = [
  { text: "Thinking", icon: Brain },
  { text: "Parsing your contract", icon: FileSearch },
  { text: "Identifying key sections", icon: Network },
  { text: "Figuring out core timelines", icon: Calendar },
  { text: "Creating Gantt charts", icon: Sparkles },
];

export function ProcessingModal({ isOpen, status }: ProcessingModalProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (!isOpen) return;

    const currentMessage = thinkingMessages[messageIndex].text;
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && displayText === currentMessage) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setMessageIndex((prev) => (prev + 1) % thinkingMessages.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(prev => {
        if (isDeleting) {
          return currentMessage.substring(0, prev.length - 1);
        } else {
          return currentMessage.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, messageIndex, isOpen]);

  const CurrentIcon = thinkingMessages[messageIndex].icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-lg w-full mx-4"
          >
            {/* Animated gradient glow */}
            <motion.div 
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl" 
            />

            {/* Main content */}
            <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-3xl p-8">
              <div className="space-y-6">
                {/* Icon with rotation and pulsing */}
                <div className="flex justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <CurrentIcon className="w-12 h-12 text-white" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Orbiting particles */}
                    {[0, 120, 240].map((angle, i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                        className="absolute inset-0"
                      >
                        <div 
                          className="absolute w-3 h-3 bg-indigo-400 rounded-full blur-sm"
                          style={{ 
                            top: '50%', 
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-40px)`
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Dynamic thinking text with typing effect */}
                <div className="text-center min-h-[80px]">
                  <motion.h3 
                    key={messageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    {displayText}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1 h-8 bg-indigo-400 ml-1 align-middle"
                    />
                  </motion.h3>
                  <p className="text-neutral-400 text-sm">
                    Powered by Gemini AI • Enterprise-grade analysis
                  </p>
                </div>

                {/* Enhanced Progress bar with percentage */}
                {status && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">Analysis Progress</span>
                      <motion.span 
                        key={status.progress}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                      >
                        {status.progress}%
                      </motion.span>
                    </div>

                    {/* Gradient progress bar with shimmer */}
                    <div className="relative h-3 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${status.progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full relative overflow-hidden"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Enhanced features grid with animations */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  {[
                    { name: 'Termination Clauses', progress: 25 },
                    { name: 'Key Milestones', progress: 50 },
                    { name: 'Deliverables', progress: 75 },
                    { name: 'Risk Profiles', progress: 90 },
                  ].map((feature, i) => {
                    const isActive = status && status.progress >= feature.progress;
                    const isProcessing = status && status.progress >= feature.progress - 10 && status.progress < feature.progress;
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-neutral-800/50 border border-transparent'
                        }`}
                      >
                        <motion.div 
                          animate={{ 
                            scale: isProcessing ? [1, 1.2, 1] : 1,
                            rotate: isProcessing ? 360 : 0
                          }}
                          transition={{ duration: 1, repeat: isProcessing ? Infinity : 0 }}
                          className={`w-2 h-2 rounded-full ${
                            isActive ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-neutral-600'
                          }`} 
                        />
                        <span className={`${isActive ? 'text-white font-medium' : 'text-neutral-400'}`}>
                          {feature.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
