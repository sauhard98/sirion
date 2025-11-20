'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, AlertTriangle, AlertCircle, Clock, X, Info } from 'lucide-react';
import { TimelineEvent } from '@/types/contract';
import { format, differenceInDays, parseISO } from 'date-fns';

interface TimelineAgentProps {
  events: TimelineEvent[];
}

export function TimelineAgent({ events }: TimelineAgentProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const today = new Date();
  const earliestDate = sortedEvents.length > 0 ? parseISO(sortedEvents[0].date) : today;
  const latestDate = sortedEvents.length > 0 ? parseISO(sortedEvents[sortedEvents.length - 1].date) : today;
  const totalDays = differenceInDays(latestDate, earliestDate) || 365;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-neutral-500';
    }
  };

  const getRiskBorderColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'ring-red-500';
      case 'High': return 'ring-orange-500';
      case 'Medium': return 'ring-amber-500';
      case 'Low': return 'ring-green-500';
      default: return 'ring-neutral-500';
    }
  };

  const getRiskBadgeStyle = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'High': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Low': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
    }
  };

  const getAlertLevel = (daysUntil: number | undefined) => {
    if (!daysUntil) return null;
    if (daysUntil < 0) return { icon: <AlertTriangle className="w-4 h-4" />, text: 'OVERDUE', class: 'text-red-500' };
    if (daysUntil <= 10) return { icon: <AlertCircle className="w-4 h-4" />, text: 'URGENT', class: 'text-orange-500' };
    if (daysUntil <= 30) return { icon: <Clock className="w-4 h-4" />, text: 'WARNING', class: 'text-amber-500' };
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-neutral-700 p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 ${getRiskColor(selectedEvent.risk)} rounded-lg flex items-center justify-center`}>
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskBadgeStyle(selectedEvent.risk)}`}>
                      {selectedEvent.risk} Risk
                    </span>
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium">
                      {selectedEvent.type}
                    </span>
                    {getAlertLevel(selectedEvent.daysUntil) && (
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getAlertLevel(selectedEvent.daysUntil)?.class} bg-current bg-opacity-10`}>
                        {getAlertLevel(selectedEvent.daysUntil)?.icon}
                        {getAlertLevel(selectedEvent.daysUntil)?.text}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Date & Countdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-800/50 rounded-xl p-4">
                    <p className="text-xs text-neutral-500 mb-1">Event Date</p>
                    <p className="text-xl font-bold text-white">{format(parseISO(selectedEvent.date), 'MMMM dd, yyyy')}</p>
                    <p className="text-sm text-neutral-400 mt-1">{format(parseISO(selectedEvent.date), 'EEEE')}</p>
                  </div>
                  <div className="bg-neutral-800/50 rounded-xl p-4">
                    <p className="text-xs text-neutral-500 mb-1">Time Remaining</p>
                    <p className={`text-xl font-bold ${
                      selectedEvent.daysUntil !== undefined && selectedEvent.daysUntil < 30 ? 'text-orange-400' : 'text-white'
                    }`}>
                      {selectedEvent.daysUntil !== undefined ? (
                        selectedEvent.daysUntil < 0
                          ? `${Math.abs(selectedEvent.daysUntil)} days overdue`
                          : `${selectedEvent.daysUntil} days`
                      ) : 'N/A'}
                    </p>
                    <p className="text-sm text-neutral-400 mt-1">
                      {selectedEvent.daysUntil !== undefined && selectedEvent.daysUntil >= 0 ? 'until deadline' : ''}
                    </p>
                  </div>
                </div>

                {/* Repercussion Warning */}
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">Risk Repercussion</h4>
                      <p className="text-neutral-300 leading-relaxed">{selectedEvent.repercussion}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-neutral-800/30 rounded-xl">
                    <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">Event Type</p>
                      <p className="text-sm text-neutral-400">
                        {selectedEvent.type === 'Deliverable' && 'Requires completion and delivery of specific work product or milestone'}
                        {selectedEvent.type === 'Payment' && 'Payment obligation that must be fulfilled by the specified date'}
                        {selectedEvent.type === 'Milestone' && 'Critical project milestone or checkpoint that must be achieved'}
                        {selectedEvent.type === 'Renewal' && 'Contract renewal decision point requiring action to prevent auto-renewal'}
                        {selectedEvent.type === 'Termination' && 'Contract termination or expiry date requiring final reconciliation'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-neutral-800/30 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">Risk Level Explanation</p>
                      <p className="text-sm text-neutral-400">
                        {selectedEvent.risk === 'Critical' && 'Highest priority - immediate action required. Failure will result in severe financial or operational consequences.'}
                        {selectedEvent.risk === 'High' && 'High priority - urgent attention needed. Missing this deadline will trigger significant penalties.'}
                        {selectedEvent.risk === 'Medium' && 'Moderate priority - plan accordingly. Some penalties may apply if missed.'}
                        {selectedEvent.risk === 'Low' && 'Standard priority - monitor as part of regular contract management.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-neutral-700 p-6 bg-neutral-900/50">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Timeline Agent</h2>
          <p className="text-neutral-400">AI-generated Gantt chart with risk analysis · Click milestones for details</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <span className="text-indigo-400 font-medium">{sortedEvents.length} Events</span>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Critical Risk</span>
            </div>
            <div className="ml-auto text-xs text-neutral-600 italic">Click milestones to view details</div>
          </div>

          {sortedEvents.map((event, index) => {
            const daysSinceStart = differenceInDays(parseISO(event.date), earliestDate);
            const position = (daysSinceStart / totalDays) * 100;
            const alert = getAlertLevel(event.daysUntil);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Event row */}
                <div className="flex items-center gap-4">
                  {/* Title */}
                  <div className="w-64 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{event.title}</span>
                      {alert && (
                        <span className={`flex items-center gap-1 text-xs ${alert.class}`}>
                          {alert.icon}
                          {alert.text}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-500">{format(parseISO(event.date), 'MMM dd, yyyy')}</span>
                  </div>

                  {/* Timeline bar */}
                  <div className="flex-1 relative h-8 bg-neutral-800 rounded-lg overflow-visible">
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      style={{ left: `${position}%` }}
                      onClick={() => setSelectedEvent(event)}
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer group z-10`}
                    >
                      <div className={`w-7 h-7 ${getRiskColor(event.risk)} rounded-full border-2 border-neutral-900 shadow-lg transition-all ring-2 ring-transparent hover:ring-4 ${getRiskBorderColor(event.risk)} hover:ring-opacity-50`} />
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                          <p className="text-white font-semibold">{event.title}</p>
                          <p className="text-neutral-400">{format(parseISO(event.date), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                    </motion.button>
                  </div>

                  {/* Days until */}
                  <div className="w-20 flex-shrink-0 text-right">
                    <span className={`text-sm font-semibold ${
                      event.daysUntil !== undefined && event.daysUntil < 30 ? 'text-orange-400' : 'text-neutral-400'
                    }`}>
                      {event.daysUntil !== undefined ? (
                        event.daysUntil < 0 ? `${Math.abs(event.daysUntil)}d ago` : `${event.daysUntil}d`
                      ) : '-'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Repercussion Table */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-neutral-700">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Risk Repercussions
          </h3>
          <p className="text-sm text-neutral-400 mt-1">Penalties and consequences for each milestone · Click rows for details</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Event</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Risk</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Repercussion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {sortedEvents.map((event, index) => {
                const alert = getAlertLevel(event.daysUntil);
                return (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedEvent(event)}
                    className="hover:bg-neutral-800/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{event.title}</span>
                        {alert && (
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${alert.class} bg-current bg-opacity-10`}>
                            {alert.text}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">
                      {format(parseISO(event.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium">
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskBadgeStyle(event.risk)}`}>
                        {event.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-300 max-w-md">{event.repercussion}</p>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
