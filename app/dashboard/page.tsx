'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Calendar,
  FileSearch,
  Trash2,
  ChevronDown,
  Home,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useContracts } from '@/context/ContractContext';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { ProcessingModal } from '@/components/dashboard/ProcessingModal';
import { TimelineAgent } from '@/components/dashboard/TimelineAgent';
import { DocumentStructure } from '@/components/dashboard/DocumentStructure';

type ViewType = 'timeline' | 'structure';

export default function DashboardPage() {
  const {
    contracts,
    activeContract,
    isProcessing,
    processingStatus,
    uploadContract,
    deleteContract,
    setActiveContract,
  } = useContracts();

  const [currentView, setCurrentView] = useState<ViewType>('timeline');
  const [showContractMenu, setShowContractMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleFileSelect = async (file: File) => {
    await uploadContract(file);
  };

  const handleDelete = () => {
    if (activeContract) {
      deleteContract(activeContract.contractId);
      setShowDeleteConfirm(false);
    }
  };

  // If no contracts, show empty state
  if (contracts.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-neutral-950">
        {/* Top Navigation */}
        <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sirion Command Center</h1>
                <p className="text-xs text-neutral-500">Contract Intelligence Platform</p>
              </div>
            </div>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.button>
            </Link>
          </div>
        </nav>

        <EmptyState onFileSelect={handleFileSelect} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Processing Modal */}
      <ProcessingModal isOpen={isProcessing} status={processingStatus} />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 max-w-md mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold">Delete Contract?</h3>
              </div>
              <p className="text-neutral-400 mb-6">
                Are you sure you want to delete &ldquo;{activeContract?.filename}&rdquo;? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 border-r border-neutral-800 bg-neutral-900/50 backdrop-blur-xl flex flex-col"
        >
          {/* Logo */}
          <div className="p-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sirion</h1>
                <p className="text-xs text-neutral-500">Command Center</p>
              </div>
            </div>
          </div>

          {/* Contract Selector */}
          <div className="p-6 border-b border-neutral-800">
            <label className="text-xs font-semibold text-neutral-500 uppercase mb-2 block">
              Active Contract
            </label>
            <div className="relative">
              <button
                onClick={() => setShowContractMenu(!showContractMenu)}
                className="w-full px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-white truncate">
                    {activeContract?.filename || 'Select a contract'}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${showContractMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showContractMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden shadow-2xl z-10"
                  >
                    {contracts.map((contract) => (
                      <button
                        key={contract.contractId}
                        onClick={() => {
                          setActiveContract(contract);
                          setShowContractMenu(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-neutral-700 transition-colors flex items-center gap-3 ${
                          activeContract?.contractId === contract.contractId ? 'bg-indigo-600' : ''
                        }`}
                      >
                        <FileText className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm truncate">{contract.filename}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Delete Button */}
            {activeContract && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="mt-3 w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete Contract
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="p-6 flex-1">
            <label className="text-xs font-semibold text-neutral-500 uppercase mb-3 block">
              Navigation
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentView('timeline')}
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                  currentView === 'timeline'
                    ? 'bg-indigo-600 text-white'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Timeline Agent</span>
              </button>
              <button
                onClick={() => setCurrentView('structure')}
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                  currentView === 'structure'
                    ? 'bg-indigo-600 text-white'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <FileSearch className="w-5 h-5" />
                <span className="font-medium">Document Structure</span>
              </button>
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-neutral-800">
            <button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Upload New Contract
            </button>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              className="hidden"
            />
            <Link href="/">
              <button className="mt-3 w-full px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeContract && (
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentView === 'timeline' && (
                    <TimelineAgent events={activeContract.analysis.timelineEvents} />
                  )}
                  {currentView === 'structure' && (
                    <DocumentStructure
                      metadata={activeContract.analysis.metadata}
                      sections={activeContract.analysis.structure}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
