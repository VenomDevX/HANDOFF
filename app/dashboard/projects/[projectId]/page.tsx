'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Settings, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  Rocket, 
  Flag, 
  Users, 
  Layers, 
  GitBranch, 
  FileText, 
  Activity,
  Calendar,
  LayoutGrid,
  List,
  MoreVertical,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for the specific project
const projectData = {
  id: 'proj-1',
  name: 'UPI Refund System',
  code: 'UPI-REF',
  department: 'Payments',
  owner: 'R. Gupta',
  manager: 'T. Vance',
  team: 'Payments Core',
  health: 'At Risk',
  priority: 'P1',
  progress: 45,
  startDate: 'Sep 01, 2026',
  targetDate: 'Nov 15, 2026',
  budget: '$120k / $150k',
  effort: '420 hrs / 600 hrs',
  objective: 'Re-architect the refund pipeline to support instant UPI refunds with 99.99% success rate and automated reconciliation.',
  scope: 'Phase 1: Core refund API. Phase 2: Reconciliation engine. Phase 3: Reporting dashboard.',
  linkedRepos: ['payments-core', 'refund-worker', 'ledger-api'],
};

const tabs = [
  'Overview',
  'Board',
  'Backlog',
  'Sprints',
  'Timeline',
  'Roadmap',
  'Team',
  'Releases',
  'Risks',
  'Documents',
  'Activity',
  'Settings'
];

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <Link href="/dashboard/projects" className="hover:text-foreground hover:underline underline-offset-4">Projects</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{projectData.code}</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
              <div className="w-3 h-3 bg-foreground" />
              {projectData.name}
            </h1>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 bg-surface border border-border">
              {projectData.priority}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-orange-500 text-orange-500 bg-orange-500/10">
              {projectData.health}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-accent hover:bg-accent/10 gap-2">
            <Bot className="w-4 h-4" />
            Project AI
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Create Task
          </Button>
          <Button variant="outline" className="h-9 w-9 p-0 rounded-none border-border">
            <MoreVertical className="w-4 h-4" />
          </Button>
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
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Main Info) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* AI Summary Panel */}
              <div className="border border-accent/30 bg-accent/5 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-5 h-5 text-accent" />
                  <h2 className="font-mono text-xs uppercase tracking-widest font-bold text-foreground">DevPilot Status Report</h2>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  Project is currently <span className="font-bold text-orange-500">At Risk</span>. 
                  Development is progressing steadily, but integration with the external banking API is blocked by credential provisioning. 
                  This threatens the Nov 15 target date. The budget is on track, but effort is running 15% higher than estimated for this phase.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-accent/50 text-accent hover:bg-accent hover:text-background">
                    Generate Weekly Report
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background">
                    Analyze Dependencies
                  </Button>
                </div>
              </div>

              {/* Progress & Details */}
              <div className="border border-border bg-background">
                <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Progress & Details</h3>
                  <span className="font-mono text-xs">{projectData.progress}% Complete</span>
                </div>
                <div className="p-6">
                  <div className="h-2 bg-surface border border-border w-full overflow-hidden mb-8">
                    <div className="h-full bg-foreground" style={{ width: `${projectData.progress}%` }} />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Business Objective</h4>
                      <p className="text-sm leading-relaxed">{projectData.objective}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Scope</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{projectData.scope}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Start Date</div>
                        <div className="text-sm font-bold">{projectData.startDate}</div>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Target Date</div>
                        <div className="text-sm font-bold">{projectData.targetDate}</div>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Budget</div>
                        <div className="text-sm font-bold">{projectData.budget}</div>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Effort</div>
                        <div className="text-sm font-bold">{projectData.effort}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones & Releases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-border bg-background">
                  <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
                    <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                      <Flag className="w-3 h-3" /> Milestones
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      { name: 'API Design Sign-off', status: 'done', date: 'Sep 15' },
                      { name: 'Core Engine Dev', status: 'done', date: 'Oct 10' },
                      { name: 'External API Integration', status: 'blocked', date: 'Oct 25' },
                      { name: 'UAT Sign-off', status: 'pending', date: 'Nov 05' },
                    ].map((m, i) => (
                      <div key={i} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           {m.status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                           {m.status === 'blocked' && <AlertTriangle className="w-4 h-4 text-destructive" />}
                           {m.status === 'pending' && <div className="w-4 h-4 border border-border rounded-full" />}
                           <span className={`text-sm ${m.status === 'done' ? 'text-muted-foreground line-through' : m.status === 'blocked' ? 'font-bold text-destructive' : 'font-bold'}`}>
                             {m.name}
                           </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase text-muted-foreground">{m.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-border bg-background">
                  <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
                    <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                      <Rocket className="w-3 h-3" /> Upcoming Releases
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      { version: 'v2.0 (Core)', status: 'released', date: 'Oct 12' },
                      { version: 'v2.1 (Integration)', status: 'at risk', date: 'Oct 30' },
                    ].map((r, i) => (
                      <div key={i} className="p-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-bold">{r.version}</span>
                           <span className={`font-mono text-[10px] uppercase px-1.5 py-0.5 border ${
                             r.status === 'released' ? 'border-emerald-500 text-emerald-500' : 'border-orange-500 text-orange-500'
                           }`}>
                             {r.status}
                           </span>
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground">Target: {r.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (Side Info) */}
            <div className="flex flex-col gap-6">
              
              {/* Team Info */}
              <div className="border border-border bg-background">
                <div className="p-4 border-b border-border bg-surface-hover">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <Users className="w-3 h-3" /> Team & Ownership
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Project Owner</div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center font-mono text-xs font-bold">RG</div>
                      <span className="text-sm font-bold">{projectData.owner}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Project Manager</div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center font-mono text-xs font-bold">TV</div>
                      <span className="text-sm font-bold">{projectData.manager}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Team: {projectData.team}</div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 bg-surface-hover border border-border flex items-center justify-center font-mono text-[10px] font-bold z-10 hover:z-20 relative">
                          T{i}
                        </div>
                      ))}
                      <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center font-mono text-[10px] text-muted-foreground z-0 relative">
                        +3
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="border border-border bg-background">
                <div className="p-4 border-b border-border bg-surface-hover">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                    <Layers className="w-3 h-3" /> Linked Resources
                  </h3>
                </div>
                <div className="p-2">
                  {projectData.linkedRepos.map(repo => (
                    <a key={repo} href="#" className="flex items-center justify-between p-2 hover:bg-surface transition-colors group">
                      <div className="flex items-center gap-2 text-sm">
                        <GitBranch className="w-4 h-4 text-muted-foreground" />
                        <span>{repo}</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                  <a href="#" className="flex items-center justify-between p-2 hover:bg-surface transition-colors group mt-2 border-t border-border pt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span>Architecture Spec</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              {/* Open Risks */}
              <div className="border border-destructive/30 bg-destructive/5">
                <div className="p-4 border-b border-destructive/20 bg-destructive/10 flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> Open Risks (3)
                  </h3>
                </div>
                <div className="divide-y divide-destructive/10">
                  <div className="p-4">
                    <div className="text-sm font-bold text-destructive mb-1">External API Credentials Delayed</div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">Owner: R. Gupta</div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-bold text-foreground mb-1">Testing environment unstable</div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">Owner: QA Team</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== 'Overview' && (
          <div className="flex flex-col items-center justify-center h-64 border border-border border-dashed bg-surface/30">
            <h3 className="font-mono text-sm uppercase tracking-widest font-bold mb-2">{activeTab} View</h3>
            <p className="text-xs text-muted-foreground">Select Overview to see the primary implementation.</p>
          </div>
        )}
      </div>

    </div>
  );
}
