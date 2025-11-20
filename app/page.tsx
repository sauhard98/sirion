'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileSearch,
  GitBranch,
  Shield,
  TrendingUp,
  Zap,
  Calendar,
  AlertTriangle,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function Homepage() {
  const painPoints = [
    {
      icon: <FileSearch className="w-12 h-12" />,
      title: 'The Shoe Box Problem',
      description: '"Where did that signed contract go?"',
      detail: 'Critical documents scattered across emails, shared drives, and filing cabinets. When you need it most, you can\'t find it.',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      icon: <GitBranch className="w-12 h-12" />,
      title: 'The Reality Gap',
      description: '"Operations doesn\'t know what Legal signed."',
      detail: 'Teams work in silos. Legal negotiates terms that operations never sees until it\'s too late. Misalignment costs millions.',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: <AlertTriangle className="w-12 h-12" />,
      title: 'The Silent Breach',
      description: '"Missed renewal dates costing millions."',
      detail: 'Auto-renewals trigger without warning. Termination clauses expire. Penalties accumulate silently until the damage is done.',
      gradient: 'from-amber-500 to-red-600',
    },
  ];

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'The Timeline Agent',
      description: 'Visual Gantt charts automatically generated from PDF text. Every date, every milestone, every risk—visible at a glance.',
      stat: '10x',
      statLabel: 'Faster Risk Detection',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Risk Radar',
      description: 'Repercussion analysis for every missed date. Know the exact penalty before the breach happens.',
      stat: '99%',
      statLabel: 'Breach Prevention',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Value Protection',
      description: 'Track contract value leakage in real-time. Automated alerts for renewal windows and payment milestones.',
      stat: '$2.4M',
      statLabel: 'Avg. Savings Per Client',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Sirion
            </span>
          </div>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
            >
              Enter Command Center
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>Powered by AI · Trusted by Fortune 500</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Stop Managing Contracts
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                in the Dark
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Turn static legal documents into dynamic, risk-aware timelines.
              <span className="block mt-2 text-white font-semibold">
                Prevent value leakage before it happens.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all"
                >
                  Launch Command Center
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-lg transition-all"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The $18 Billion Problem
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Every year, Fortune 500 companies lose billions to contract mismanagement.
              These are the three critical friction points:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 rounded-2xl transition-opacity blur-xl" />
                <div className={`absolute inset-0 bg-gradient-to-br ${point.gradient} opacity-10 group-hover:opacity-20 rounded-2xl transition-opacity blur-xl`} />
                <div className="relative bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 h-full hover:border-neutral-700 transition-colors">
                  <div className={`w-16 h-16 bg-gradient-to-br ${point.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    {point.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{point.title}</h3>
                  <p className="text-lg text-indigo-400 font-semibold mb-4">{point.description}</p>
                  <p className="text-neutral-400 leading-relaxed">{point.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Solution: <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Command Center</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              AI-powered contract intelligence that turns documents into dynamic, actionable timelines.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 hover:border-indigo-500/50 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">{feature.description}</p>
                <div className="pt-6 border-t border-neutral-700">
                  <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                    {feature.stat}
                  </div>
                  <div className="text-sm text-neutral-500">{feature.statLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-3xl p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Take Control?
              </h2>
              <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
                Join the Fortune 500 companies using Sirion to prevent contract breaches and protect value.
              </p>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg flex items-center gap-3 mx-auto hover:shadow-2xl hover:shadow-indigo-500/50 transition-all"
                >
                  Enter Command Center
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-800">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Sirion
              </span>
            </div>
            <p className="text-neutral-500">
              © 2025 Sirion. All rights reserved. | Enterprise Contract Intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
