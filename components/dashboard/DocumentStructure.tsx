'use client';

import { motion } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';
import { ContractSection, ContractMetadata } from '@/types/contract';
import { useState } from 'react';

interface DocumentStructureProps {
  metadata: ContractMetadata;
  sections: ContractSection[];
}

export function DocumentStructure({ metadata, sections }: DocumentStructureProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.section || '');

  const activeSectionData = sections.find(s => s.section === activeSection);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Document Structure</h2>
        <p className="text-neutral-400">Parsed contract sections with AI extraction</p>
      </div>

      {/* Metadata Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Contract Metadata</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-neutral-500 mb-1">Contract Value</p>
            <p className="text-lg font-bold text-indigo-400">{metadata.value}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 mb-1">Effective Date</p>
            <p className="text-lg font-semibold text-white">{metadata.effectiveDate}</p>
          </div>
          {metadata.expiryDate && (
            <div>
              <p className="text-xs text-neutral-500 mb-1">Expiry Date</p>
              <p className="text-lg font-semibold text-white">{metadata.expiryDate}</p>
            </div>
          )}
          {metadata.parties && (
            <div>
              <p className="text-xs text-neutral-500 mb-1">Parties</p>
              <p className="text-sm font-medium text-white">{metadata.parties.join(' & ')}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Document View */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-4 sticky top-4">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase mb-3 px-2">Sections</h4>
            <nav className="space-y-1">
              {sections.map((section, index) => (
                <motion.button
                  key={section.section}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveSection(section.section)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center justify-between group ${
                    activeSection === section.section
                      ? 'bg-indigo-600 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-medium">{section.section}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    activeSection === section.section ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`} />
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8"
          >
            {activeSectionData ? (
              <div className="space-y-6">
                {/* Section Header */}
                <div className="pb-6 border-b border-neutral-700">
                  <h3 className="text-2xl font-bold text-white mb-2">{activeSectionData.section}</h3>
                  <p className="text-sm text-indigo-400">AI-Extracted Content</p>
                </div>

                {/* Section Content */}
                <div className="prose prose-invert prose-neutral max-w-none">
                  <div className="text-neutral-300 leading-relaxed whitespace-pre-line">
                    {activeSectionData.content}
                  </div>
                </div>

                {/* Analysis Tags */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-neutral-700">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium">
                    AI Analyzed
                  </span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium">
                    Verified
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-medium">
                    Extracted from PDF
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500">
                Select a section to view its content
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
