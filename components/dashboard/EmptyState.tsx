'use client';

import { motion } from 'framer-motion';
import { Upload, FileText, Zap } from 'lucide-react';
import { useRef } from 'react';

interface EmptyStateProps {
  onFileSelect: (file: File) => void;
}

export function EmptyState({ onFileSelect }: EmptyStateProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full mx-4"
      >
        {/* Drop Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />

          {/* Main card */}
          <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-dashed border-neutral-700 hover:border-indigo-500/50 rounded-3xl p-16 transition-all">
            <div className="text-center space-y-6">
              {/* Icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <h2 className="text-4xl font-bold text-white">
                Upload Your First Contract
              </h2>

              {/* Description */}
              <p className="text-xl text-neutral-400 max-w-lg mx-auto">
                Drop a PDF contract to activate the{' '}
                <span className="text-indigo-400 font-semibold">Timeline Agent</span>
                {' '}and unlock AI-powered risk analysis
              </p>

              {/* Upload button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all"
              >
                <Upload className="w-5 h-5" />
                Select PDF File
              </motion.button>

              {/* Features list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                {[
                  { icon: <Zap className="w-5 h-5" />, text: 'AI Analysis' },
                  { icon: <FileText className="w-5 h-5" />, text: 'Auto-Extract' },
                  { icon: <Upload className="w-5 h-5" />, text: 'Instant Timeline' },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 justify-center text-neutral-500"
                  >
                    {feature.icon}
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-neutral-600"
        >
          <p>Supported format: PDF only · Maximum size: 10MB</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
