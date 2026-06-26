'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  Bot, 
  BarChart3,
  Download,
  FileText,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Share2,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const tabs = [
  'Delivery Analytics',
  'Team Performance',
  'Capacity Planning',
  'Quality Metrics',
  'Release Analytics',
  'Incident Analytics',
  'Compliance Analytics',
  'Executive Reports'
];

const velocityData = [
  { sprint: 'Sprint 21', planned: 45, completed: 42 },
  { sprint: 'Sprint 22', planned: 50, completed: 48 },
  { sprint: 'Sprint 23', planned: 48, completed: 48 },
  { sprint: 'Sprint 24', planned: 55, completed: 51 },
  { sprint: 'Sprint 25', planned: 52, completed: 49 },
  { sprint: 'Sprint 26', planned: 60, completed: 58 },
];

const cycleTimeData = [
  { week: 'W1', time: 5.2 },
  { week: 'W2', time: 5.0 },
  { week: 'W3', time: 4.8 },
  { week: 'W4', time: 4.5 },
  { week: 'W5', time: 4.2 },
  { week: 'W6', time: 3.9 },
];

const projectHealthData = [
  { name: 'On Track', value: 65, color: 'var(--foreground)' },
  { name: 'At Risk', value: 25, color: 'var(--muted-foreground)' },
  { name: 'Off Track', value: 10, color: 'var(--border)' },
];

const workStatusData = [
  { name: 'To Do', value: 30 },
  { name: 'In Progress', value: 45 },
  { name: 'In Review', value: 15 },
  { name: 'Done', value: 10 },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('Delivery Analytics');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 min-h-[calc(100vh-80px)]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Analytics</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Reports</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest max-w-2xl">
            Monitor delivery performance, workload, quality, releases, risk, and organizational capacity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Printer className="w-4 h-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Create Report
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-accent hover:bg-accent/10 gap-2">
            <Bot className="w-4 h-4" />
            Ask DevPilot AI
          </Button>
        </div>
      </div>

      {/* Controls & Tabs */}
      <div className="flex flex-col gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-4 text-sm font-mono flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Date Range:</span>
            <select className="bg-background border border-border px-2 py-1 text-xs focus:outline-none focus:border-foreground uppercase">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Team:</span>
            <select className="bg-background border border-border px-2 py-1 text-xs focus:outline-none focus:border-foreground uppercase">
              <option>All Engineering</option>
              <option>Frontend Team</option>
              <option>Backend Team</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Compare:</span>
            <select className="bg-background border border-border px-2 py-1 text-xs focus:outline-none focus:border-foreground uppercase">
              <option>Previous Period</option>
              <option>Same Period Last Year</option>
              <option>None</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-colors border ${
                activeTab === tab
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-surface text-muted-foreground border-transparent hover:border-border hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6 pb-12">
        {activeTab === 'Delivery Analytics' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* DevPilot Summary */}
            <div className="border border-accent/30 bg-accent/5 p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-5 h-5 text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-foreground">DevPilot Analysis</h3>
              </div>
              <p className="text-sm leading-relaxed max-w-3xl mb-4">
                Delivery performance is trending positive. Cycle time has decreased by <span className="font-bold">12%</span> over the last 6 weeks, indicating improved pipeline efficiency. Sprint velocity remains stable with a completion rate of <span className="font-bold text-emerald-500">96.6%</span>.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background text-foreground">
                  Explain velocity changes
                </Button>
                <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background text-foreground">
                  Detect bottlenecks
                </Button>
                <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background text-foreground">
                  Forecast completion
                </Button>
              </div>
            </div>

            {/* Top KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-border p-5 bg-surface flex flex-col justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Average Cycle Time</div>
                <div className="text-3xl font-bold font-mono tracking-tight">3.9d</div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500 mt-2">
                  <TrendingDown className="w-3 h-3" />
                  <span>-12% vs last period</span>
                </div>
              </div>
              <div className="border border-border p-5 bg-surface flex flex-col justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Avg Sprint Velocity</div>
                <div className="text-3xl font-bold font-mono tracking-tight">52 pts</div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500 mt-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>+8% vs last period</span>
                </div>
              </div>
              <div className="border border-border p-5 bg-surface flex flex-col justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">On-time Completion</div>
                <div className="text-3xl font-bold font-mono tracking-tight">94%</div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground mt-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>+2% vs last period</span>
                </div>
              </div>
              <div className="border border-border p-5 bg-surface flex flex-col justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Delivery Forecast</div>
                <div className="text-xl font-bold tracking-tight">On Target</div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground mt-2">
                  <span>Based on current velocity</span>
                </div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sprint Velocity Chart */}
              <div className="border border-border p-5 bg-surface">
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-6">Sprint Velocity Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={velocityData} margin={{ left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="sprint" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '0', fontSize: '12px' }}
                        cursor={{ fill: 'var(--surface-hover)' }}
                      />
                      <Bar dataKey="planned" name="Planned" fill="var(--border)" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="completed" name="Completed" fill="var(--foreground)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cycle Time Trend */}
              <div className="border border-border p-5 bg-surface">
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-6">Cycle Time Trend (Days)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cycleTimeData} margin={{ left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '0', fontSize: '12px' }}
                      />
                      <Line type="monotone" dataKey="time" name="Avg Cycle Time" stroke="var(--foreground)" strokeWidth={2} dot={{ r: 4, fill: 'var(--foreground)' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project Health */}
              <div className="border border-border p-5 bg-surface col-span-1">
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-6">Project Health</h3>
                <div className="h-48 flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectHealthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {projectHealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '0', fontSize: '12px', color: 'var(--foreground)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-2xl font-bold font-mono">65%</span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">On Track</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                  {projectHealthData.map(entry => (
                    <div key={entry.name} className="flex items-center gap-1.5 text-[10px] font-mono uppercase">
                      <div className="w-2 h-2" style={{ backgroundColor: entry.color }} />
                      {entry.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Work By Status */}
              <div className="border border-border p-5 bg-surface col-span-2">
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-6">Work by Status</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={workStatusData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--foreground)' }} width={80} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '0', fontSize: '12px' }}
                        cursor={{ fill: 'var(--surface-hover)' }}
                      />
                      <Bar dataKey="value" name="Issues" fill="var(--muted-foreground)" radius={[0, 2, 2, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab !== 'Delivery Analytics' && (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border bg-surface/50 animate-in fade-in">
            <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold mb-2">Select parameters to view {activeTab}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Data is being aggregated for this view. Use DevPilot AI to generate a custom analysis.
            </p>
            <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
              <Bot className="w-4 h-4" />
              Generate with DevPilot
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
