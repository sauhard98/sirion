'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { ProcessingStatus } from '@/types/contract';

interface ProcessingModalProps {
  isOpen: boolean;
  status: ProcessingStatus | null;
}

export function ProcessingModal({ isOpen, status }: ProcessingModalProps) {
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
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-3xl blur-3xl animate-pulse" />

            {/* Main content */}
            <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-3xl p-8">
              <div className="space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center"
                    >
                      <Loader2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles className="w-6 h-6 text-indigo-400" />
                    </motion.div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Analyzing with Gemini AI
                  </h3>
                  <p className="text-neutral-400">
                    Extracting insights from your contract...
                  </p>
                </div>

                {/* Status */}
                {status && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-indigo-400 font-medium">{status.stage}</span>
                      <span className="text-neutral-500">{status.progress}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${status.progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Features being analyzed */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  {[
                    'Termination Clauses',
                    'Key Milestones',
                    'Deliverables',
                    'Risk Profiles',
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: status && status.progress > i * 25 ? 1 : 0.3 }}
                      className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 rounded-lg text-sm"
                    >
                      <div className={`w-2 h-2 rounded-full ${status && status.progress > i * 25 ? 'bg-green-500' : 'bg-neutral-600'}`} />
                      <span className="text-neutral-400">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
