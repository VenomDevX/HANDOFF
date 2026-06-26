'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  Bot, 
  Download, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Activity,
  Users,
  Flag,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Sprint = {
  id: string;
  name: string;
  team: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Planning' | 'Completed';
  plannedPoints: number;
  completedPoints: number;
  progress: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  velocity: number;
};

const mockSprints: Sprint[] = [
  {
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
  },
  {
    id: 'spr-43',
    name: 'Sprint 43: Reconciliation',
    team: 'Payments Platform',
    goal: 'Implement automated reconciliation reports.',
    startDate: 'Oct 29, 2026',
    endDate: 'Nov 11, 2026',
    status: 'Planning',
    plannedPoints: 38,
    completedPoints: 0,
    progress: 0,
    riskLevel: 'Medium',
    velocity: 42,
  },
  {
    id: 'spr-18',
    name: 'Sprint 18: Biometrics',
    team: 'Mobile Banking',
    goal: 'Roll out FaceID login for iOS beta users.',
    startDate: 'Oct 10, 2026',
    endDate: 'Oct 23, 2026',
    status: 'Active',
    plannedPoints: 52,
    completedPoints: 40,
    progress: 76,
    riskLevel: 'Low',
    velocity: 50,
  },
  {
    id: 'spr-89',
    name: 'Sprint 89: Auth V2',
    team: 'Core Backend',
    goal: 'Migrate legacy auth tokens to JWT format.',
    startDate: 'Oct 12, 2026',
    endDate: 'Oct 25, 2026',
    status: 'Active',
    plannedPoints: 60,
    completedPoints: 45,
    progress: 75,
    riskLevel: 'Medium',
    velocity: 58,
  },
  {
    id: 'spr-41',
    name: 'Sprint 41: Ledger Export',
    team: 'Payments Platform',
    goal: 'Fix export race conditions and optimize queries.',
    startDate: 'Oct 01, 2026',
    endDate: 'Oct 14, 2026',
    status: 'Completed',
    plannedPoints: 40,
    completedPoints: 40,
    progress: 100,
    riskLevel: 'Low',
    velocity: 40,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    case 'Planning': return 'text-accent border-accent bg-accent/10';
    case 'Completed': return 'text-muted-foreground border-border bg-surface';
    default: return 'text-foreground border-border bg-surface';
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'High': return 'text-destructive';
    case 'Medium': return 'text-orange-500';
    case 'Low': return 'text-emerald-500';
    default: return 'text-foreground';
  }
};

export default function SprintsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Delivery</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Sprints</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            Sprints
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            Plan, execute, track, and improve delivery cycles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Download className="w-4 h-4" />
            Export Sprint Report
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Play className="w-4 h-4" />
            Start Sprint
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Create Sprint
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-accent hover:bg-accent/10 gap-2">
            <Bot className="w-4 h-4" />
            Ask DevPilot AI
          </Button>
        </div>
      </div>

      {/* Top Controls */}
      <div className="p-3 border border-border bg-surface-hover flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="SEARCH SPRINTS..." className="w-full h-8 pl-8 pr-3 bg-background border border-border text-[10px] font-mono uppercase focus:outline-none focus:border-foreground transition-colors" />
          </div>
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border bg-background">
            <Filter className="w-3 h-3 mr-2" /> Team Filter
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 border border-border bg-background flex flex-col">
        <div className="overflow-auto flex-1 scrollbar-thin">
          <table className="w-full text-left text-sm font-mono border-collapse whitespace-nowrap">
            <thead className="sticky top-0 bg-surface-hover z-10 shadow-[0_1px_0_0_var(--border)]">
              <tr>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Sprint Name</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Team</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Timeline</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Progress</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Points</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Velocity</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Risk</th>
                <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockSprints.map((sprint) => (
                <tr key={sprint.id} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                  <td className="p-3">
                    <Link href={`/dashboard/sprints/${sprint.id}`} className="block">
                      <div className="font-sans font-bold text-sm truncate max-w-[250px] mb-1 group-hover:underline decoration-border underline-offset-4">{sprint.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate max-w-[250px]">{sprint.goal}</div>
                    </Link>
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(sprint.status)}`}>
                      {sprint.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-xs truncate max-w-[120px]">{sprint.team}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-xs">{sprint.startDate} -</div>
                    <div className="text-[10px] text-muted-foreground">{sprint.endDate}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-1.5 bg-surface border border-border overflow-hidden">
                        <div className="h-full bg-foreground" style={{ width: `${sprint.progress}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-6 text-right">{sprint.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-xs">{sprint.completedPoints} / {sprint.plannedPoints}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Pts</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs">{sprint.velocity}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    {sprint.status === 'Active' ? (
                      <div className="flex items-center gap-1 text-xs">
                        <span className={`w-2 h-2 ${getRiskColor(sprint.riskLevel).replace('text-', 'bg-')} block rounded-none`} />
                        <span className={getRiskColor(sprint.riskLevel)}>{sprint.riskLevel}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-3 border-t border-border bg-surface-hover flex justify-between items-center text-[10px] font-mono text-muted-foreground flex-shrink-0">
          <span>Showing 5 sprints</span>
          <div className="flex gap-4">
             <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500/20 border border-emerald-500 block" /> 3 Active</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 bg-accent/20 border border-accent block" /> 1 Planning</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 bg-surface border border-border block" /> 1 Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
