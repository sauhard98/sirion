'use client';

import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, AlertCircle, Clock, DollarSign } from 'lucide-react';
import { TimelineEvent } from '@/types/contract';
import { format, differenceInDays, parseISO } from 'date-fns';

interface TimelineAgentProps {
  events: TimelineEvent[];
}

export function TimelineAgent({ events }: TimelineAgentProps) {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Timeline Agent</h2>
          <p className="text-neutral-400">AI-generated Gantt chart with risk analysis</p>
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
                  <div className="flex-1 relative h-8 bg-neutral-800 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      style={{ left: `${position}%` }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    >
                      <div className={`w-6 h-6 ${getRiskColor(event.risk)} rounded-full border-2 border-neutral-900 shadow-lg`} />
                    </motion.div>
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
          <p className="text-sm text-neutral-400 mt-1">Penalties and consequences for each milestone</p>
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
                    className="hover:bg-neutral-800/30 transition-colors"
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
