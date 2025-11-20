"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, Download, X } from "lucide-react";

interface TimeoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TimeoutModal({ isOpen, onClose }: TimeoutModalProps) {
    const handleDownload = () => {
        // Trigger download of test contract
        const link = document.createElement("a");
        link.href = "/sirion-test-contract.pdf";
        link.download = "sirion-test-contract.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl max-w-lg w-full">
                        {/* Header */}
                        <div className="border-b border-neutral-700 p-6 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Request Timeout</h3>
                                    <p className="text-sm text-neutral-400">Free infrastructure limitation</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                                <X className="w-5 h-5 text-neutral-400" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-neutral-300">
                                    <p className="font-semibold text-white mb-1">Why did this happen?</p>
                                    <p>
                                        This application is hosted on free infrastructure that has a 10-second timeout
                                        limit for API requests. Your contract analysis exceeded this time limit.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-lg font-semibold text-white">How to test the application:</h4>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-3 p-3 bg-neutral-800/50 rounded-lg">
                                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                                            1
                                        </div>
                                        <div className="text-sm text-neutral-300">
                                            <p className="font-medium text-white">Test locally</p>
                                            <p>
                                                Run the application on your local machine where there are no timeout
                                                restrictions
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-neutral-800/50 rounded-lg">
                                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                                            2
                                        </div>
                                        <div className="text-sm text-neutral-300">
                                            <p className="font-medium text-white">Use the cached test contract</p>
                                            <p>
                                                Download our pre-configured test contract that returns instant cached
                                                results
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-neutral-700 p-6 flex gap-3">
                            <button
                                onClick={handleDownload}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-white">
                                <Download className="w-5 h-5" />
                                Download Test Contract
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-semibold transition-colors text-white">
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
