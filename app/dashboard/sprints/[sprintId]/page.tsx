'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Activity,
  Users,
  Flag,
  MoreVertical,
  Calendar,
  LayoutGrid,
  List,
  Target,
  BarChart2,
  GitPullRequest,
  CheckSquare,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Plus,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const sprintData = {
  id: 'spr-42',
  name: 'Sprint 42: Refund Engine',
  team: 'Payments Platform',
  goal: 'Complete core refund API and begin integration testing.',
  startDate: 'Oct 15, 2026',
  endDate: 'Oct 28, 2026',
  status: 'Active',
  plannedPoints: 45,
  completedPoints: 32,
  progress: 71,
  riskLevel: 'High',
  velocity: 42,
  capacity: '90%',
  members: 6
};

const tabs = [
  'Board',
  'Metrics',
  'Planning',
  'Retrospective'
];

// Mock board data
const boardColumns = [
  { id: 'todo', name: 'To Do', limit: 8 },
  { id: 'in-progress', name: 'In Progress', limit: 4 },
  { id: 'review', name: 'Code Review', limit: 3 },
  { id: 'qa', name: 'QA Testing', limit: 3 },
  { id: 'security', name: 'Security Review', limit: 2 },
  { id: 'done', name: 'Done', limit: null }
];

const mockTasks = [
  { id: 'PAY-231', title: 'Implement Retry Logic', status: 'in-progress', pts: 5, assignee: 'S. Chen', type: 'feature', blocked: false },
  { id: 'PAY-234', title: 'Idempotency Key validation', status: 'review', pts: 3, assignee: 'M. Johnson', type: 'feature', blocked: false },
  { id: 'PAY-239', title: 'Ledger export race condition', status: 'qa', pts: 8, assignee: 'L. Davis', type: 'bug', blocked: false },
  { id: 'PAY-240', title: 'External API Mocking', status: 'todo', pts: 5, assignee: 'Unassigned', type: 'task', blocked: true },
  { id: 'PAY-211', title: 'Webhook payload schema update', status: 'done', pts: 3, assignee: 'R. Gupta', type: 'feature', blocked: false },
  { id: 'PAY-212', title: 'Database lock contention fix', status: 'security', pts: 8, assignee: 'T. Vance', type: 'bug', blocked: true },
];

export default function SprintDetailPage() {
  const [activeTab, setActiveTab] = useState('Board');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <Link href="/dashboard/sprints" className="hover:text-foreground hover:underline underline-offset-4">Sprints</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{sprintData.name}</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
              <div className="w-3 h-3 bg-foreground" />
              {sprintData.name}
            </h1>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-emerald-500 text-emerald-500 bg-emerald-500/10">
              {sprintData.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-accent hover:bg-accent/10 gap-2">
            <Bot className="w-4 h-4" />
            Sprint Insights
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Complete Sprint
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 flex-shrink-0">
        <div className="p-4 border border-border bg-surface">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Sprint Goal</div>
          <div className="text-xs font-bold line-clamp-2">{sprintData.goal}</div>
        </div>
        <div className="p-4 border border-border bg-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20"><TrendingUp className="w-10 h-10" /></div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Points Completed</div>
          <div className="text-2xl font-bold tracking-tighter relative z-10">{sprintData.completedPoints} <span className="text-sm font-normal text-muted-foreground">/ {sprintData.plannedPoints}</span></div>
          <div className="h-1 bg-background border border-border w-full overflow-hidden mt-2 relative z-10">
            <div className="h-full bg-foreground" style={{ width: `${sprintData.progress}%` }} />
          </div>
        </div>
        <div className="p-4 border border-border bg-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20"><Calendar className="w-10 h-10" /></div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Timeline</div>
          <div className="text-sm font-bold relative z-10">Day 11 of 14</div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1 relative z-10">Ends {sprintData.endDate}</div>
        </div>
        <div className="p-4 border border-border bg-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20"><Activity className="w-10 h-10" /></div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Team Velocity</div>
          <div className="text-2xl font-bold tracking-tighter relative z-10">{sprintData.velocity}</div>
          <div className="text-[10px] font-mono text-emerald-500 mt-1 relative z-10">+2 from last sprint</div>
        </div>
        <div className="p-4 border border-border bg-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20"><AlertTriangle className="w-10 h-10 text-destructive" /></div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Risk Level</div>
          <div className="text-2xl font-bold tracking-tighter text-destructive relative z-10">{sprintData.riskLevel}</div>
          <div className="text-[10px] font-mono text-destructive mt-1 relative z-10">2 Blocked Items</div>
        </div>
        <div className="p-4 border border-border bg-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20"><Users className="w-10 h-10" /></div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Capacity</div>
          <div className="text-2xl font-bold tracking-tighter relative z-10">{sprintData.capacity}</div>
          <div className="text-[10px] font-mono text-muted-foreground mt-1 relative z-10">{sprintData.members} Members</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto scrollbar-none flex-shrink-0">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'border-foreground text-foreground font-bold' 
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
        {activeTab === 'Board' && (
          <div className="flex h-full gap-4 overflow-x-auto scrollbar-thin pb-4">
            {boardColumns.map(col => (
              <div key={col.id} className="flex-shrink-0 w-80 flex flex-col border border-border bg-surface/30">
                <div className="p-3 border-b border-border bg-surface-hover flex items-center justify-between">
                  <div className="font-mono text-xs uppercase tracking-widest font-bold">{col.name}</div>
                  <div className="text-[10px] font-mono px-1.5 py-0.5 bg-background border border-border">
                    {mockTasks.filter(t => t.status === col.id).length} {col.limit && `/ ${col.limit}`}
                  </div>
                </div>
                <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                  {mockTasks.filter(t => t.status === col.id).map(task => (
                    <div key={task.id} className={`p-3 border bg-background cursor-grab active:cursor-grabbing hover:border-foreground transition-colors ${task.blocked ? 'border-destructive/50 border-l-2 border-l-destructive shadow-[inset_0_0_10px_rgba(255,0,0,0.05)]' : 'border-border shadow-sm'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-mono text-[10px] uppercase px-1 py-0.5 bg-surface border border-border text-muted-foreground">{task.id}</span>
                        {task.blocked && <AlertTriangle className="w-3 h-3 text-destructive" />}
                      </div>
                      <div className="text-sm font-bold mb-3 leading-tight">{task.title}</div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-surface border border-border flex items-center justify-center font-mono text-[9px] uppercase">{task.assignee.charAt(0)}</div>
                          <span className="text-muted-foreground text-[10px]">{task.assignee}</span>
                        </div>
                        <div className="font-mono text-[10px] px-1.5 py-0.5 border border-border bg-surface-hover">
                          {task.pts} <span className="text-muted-foreground">pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {mockTasks.filter(t => t.status === col.id).length === 0 && (
                    <div className="h-20 flex items-center justify-center text-[10px] font-mono text-muted-foreground uppercase border border-dashed border-border m-2">
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Metrics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="border border-border bg-background flex flex-col">
              <div className="p-4 border-b border-border bg-surface-hover flex justify-between items-center">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Burndown Chart</h3>
                <span className="text-[10px] font-mono uppercase text-muted-foreground">Story Points</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-end relative">
                {/* Simulated Chart */}
                <div className="absolute inset-x-6 inset-y-6 flex">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-full h-px bg-foreground" />)}
                  </div>
                  {/* Ideal line */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                     <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4" />
                     </svg>
                  </div>
                  {/* Actual line (simulated with bars for simplicity in mockup) */}
                  <div className="w-full h-full flex items-end justify-between px-2 pt-10">
                    {[45, 42, 40, 38, 35, 30, 28, 25, 20, 18, 15, 13].map((val, i) => (
                      <div key={i} className="w-4 bg-foreground relative group transition-all" style={{ height: `${(val/45)*100}%` }}>
                         <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-mono px-1 py-0.5">
                           {val}
                         </div>
                      </div>
                    ))}
                    <div className="w-4 bg-surface border border-border border-dashed h-1/4 relative" />
                    <div className="w-4 bg-surface border border-border border-dashed h-1/6 relative" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="border border-accent/30 bg-accent/5 p-5 relative overflow-hidden group flex-shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-5 h-5 text-accent" />
                  <h2 className="font-mono text-xs uppercase tracking-widest font-bold text-foreground">AI Metrics Analysis</h2>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  The team is currently tracking slightly behind the ideal burndown. Two high-point tasks (PAY-239, PAY-212) are taking longer than estimated in QA and Security Review. Velocity trend is positive (+2) over the last 3 sprints.
                </p>
                <Button variant="outline" size="sm" className="mt-4 h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-accent/50 text-accent hover:bg-accent hover:text-background">
                  Explain Velocity Changes
                </Button>
              </div>

              <div className="border border-border bg-background flex-1">
                <div className="p-4 border-b border-border bg-surface-hover">
                   <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                     <AlertTriangle className="w-4 h-4" /> Blocked Work & Risks
                   </h3>
                </div>
                <div className="p-0 divide-y divide-border">
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-bold">PAY-212: Database lock contention</div>
                      <span className="text-[10px] font-mono uppercase text-destructive border border-destructive/30 bg-destructive/10 px-1.5 py-0.5">Security Review</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Blocked by pending architecture approval on new indexing strategy. Escalate to DB Admin team.</div>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-bold">PAY-240: External API Mocking</div>
                      <span className="text-[10px] font-mono uppercase text-muted-foreground border border-border bg-surface px-1.5 py-0.5">To Do</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Blocked by missing API credentials from vendor.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Planning' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Backlog */}
            <div className="border border-border bg-background flex flex-col h-full">
              <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Product Backlog</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-6 px-2 rounded-none text-[10px] font-mono uppercase border-border"><Filter className="w-3 h-3" /></Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="p-3 border border-border bg-surface hover:bg-surface-hover cursor-pointer flex justify-between items-center group">
                    <div>
                      <div className="text-xs font-bold mb-1">PAY-{250+i}: Implement Feature {i}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">Payments Core • Unassigned</div>
                    </div>
                    <div className="font-mono text-[10px] px-1.5 py-0.5 border border-border bg-background group-hover:bg-foreground group-hover:text-background transition-colors">
                      {i % 3 === 0 ? 8 : i % 2 === 0 ? 5 : 3} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sprint Plan */}
            <div className="border border-border bg-background flex flex-col h-full relative">
              <div className="p-4 border-b border-border bg-surface-hover">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4">Planned Sprint Scope</h3>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-muted-foreground">Total Planned</span>
                  <span className="font-bold">45 / 50 pts (Capacity)</span>
                </div>
                <div className="h-2 bg-surface border border-border w-full overflow-hidden">
                  <div className="h-full bg-foreground" style={{ width: '90%' }} />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center opacity-50">
                 <Target className="w-12 h-12 mb-4 text-muted-foreground" />
                 <h4 className="text-sm font-bold uppercase tracking-widest font-mono mb-2">Planning Locked</h4>
                 <p className="text-xs max-w-xs text-muted-foreground">This sprint is currently active. Modifying the scope requires project manager approval to track scope creep.</p>
                 <Button variant="outline" className="mt-4 rounded-none border-border font-mono text-xs uppercase">Request Scope Change</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Retrospective' && (
          <div className="h-full flex flex-col">
             <div className="p-4 border border-border bg-surface-hover mb-6 flex justify-between items-center flex-shrink-0">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Retrospective Draft</h3>
                  <p className="text-xs text-muted-foreground mt-1">Capture notes during the sprint. Formal retro meeting on Oct 29.</p>
                </div>
                <Button className="h-8 rounded-none bg-foreground text-background text-xs font-mono uppercase tracking-widest gap-2">
                  <Bot className="w-4 h-4" /> Generate Summary
                </Button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
               {[
                 { title: 'What went well', color: 'border-emerald-500 text-emerald-500 bg-emerald-500/5', items: ['API design was solid', 'QA automation saved time'] },
                 { title: 'What didn\'t go well', color: 'border-destructive text-destructive bg-destructive/5', items: ['DB lock issues delayed testing', 'Vendor API documentation was poor'] },
                 { title: 'Action Items', color: 'border-accent text-accent bg-accent/5', items: ['Schedule architecture review earlier', 'Create internal mock for vendor API'] },
               ].map((col, i) => (
                 <div key={i} className="border border-border bg-background flex flex-col h-full">
                   <div className={`p-3 border-b border-border text-[10px] font-mono uppercase tracking-widest font-bold ${col.color}`}>
                     {col.title}
                   </div>
                   <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                     {col.items.map((item, j) => (
                       <div key={j} className="text-sm p-3 border border-border bg-surface hover:border-foreground transition-colors">
                         {item}
                       </div>
                     ))}
                   </div>
                   <div className="p-2 border-t border-border">
                     <Button variant="ghost" className="w-full justify-start rounded-none text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">
                       <Plus className="w-4 h-4 mr-2" /> Add Note
                     </Button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
