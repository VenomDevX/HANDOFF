'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  Bot, 
  Download, 
  LayoutGrid, 
  List, 
  Layers, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Rocket, 
  Flag,
  MoreVertical,
  Upload,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Project = {
  id: string;
  name: string;
  code: string;
  department: string;
  owner: string;
  manager: string;
  team: string;
  health: 'On Track' | 'At Risk' | 'Off Track' | 'Completed';
  priority: 'P1' | 'P2' | 'P3';
  progress: number;
  startDate: string;
  targetDate: string;
  nextMilestone: string;
  nextRelease: string;
  openRisks: number;
};

const mockProjects: Project[] = [
  {
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
    nextMilestone: 'External API Integration',
    nextRelease: 'v2.1 (Oct 30)',
    openRisks: 3,
  },
  {
    id: 'proj-2',
    name: 'KYC Verification Upgrade',
    code: 'KYC-V2',
    department: 'Compliance',
    owner: 'S. Patel',
    manager: 'M. Johnson',
    team: 'Identity',
    health: 'On Track',
    priority: 'P1',
    progress: 80,
    startDate: 'Jul 15, 2026',
    targetDate: 'Oct 31, 2026',
    nextMilestone: 'Security Audit',
    nextRelease: 'v4.0 (Oct 31)',
    openRisks: 1,
  },
  {
    id: 'proj-3',
    name: 'Fraud Detection Engine',
    code: 'FRAUD-ML',
    department: 'Risk',
    owner: 'L. Chen',
    manager: 'A. Davis',
    team: 'Data Science',
    health: 'On Track',
    priority: 'P2',
    progress: 25,
    startDate: 'Oct 01, 2026',
    targetDate: 'Feb 28, 2027',
    nextMilestone: 'Model Training Complete',
    nextRelease: 'v1.0-beta',
    openRisks: 2,
  },
  {
    id: 'proj-4',
    name: 'Payment Gateway Migration',
    code: 'GW-MIGRATE',
    department: 'Infrastructure',
    owner: 'K. Smith',
    manager: 'D. Williams',
    team: 'Platform',
    health: 'Off Track',
    priority: 'P1',
    progress: 60,
    startDate: 'Aug 01, 2026',
    targetDate: 'Dec 15, 2026',
    nextMilestone: 'Legacy Traffic Routing',
    nextRelease: 'v5.0',
    openRisks: 5,
  },
  {
    id: 'proj-5',
    name: 'Mobile Banking Redesign',
    code: 'MB-V3',
    department: 'Consumer',
    owner: 'E. Wright',
    manager: 'J. Doe',
    team: 'Mobile App',
    health: 'On Track',
    priority: 'P2',
    progress: 15,
    startDate: 'Oct 15, 2026',
    targetDate: 'Apr 30, 2027',
    nextMilestone: 'Design System Sign-off',
    nextRelease: 'v3.0.0-alpha',
    openRisks: 0,
  },
  {
    id: 'proj-6',
    name: 'Security Compliance Upgrade',
    code: 'SEC-2027',
    department: 'Security',
    owner: 'F. Castle',
    manager: 'P. Parker',
    team: 'SecOps',
    health: 'On Track',
    priority: 'P1',
    progress: 90,
    startDate: 'Jun 01, 2026',
    targetDate: 'Oct 31, 2026',
    nextMilestone: 'Final Reporting',
    nextRelease: 'N/A',
    openRisks: 0,
  },
  {
    id: 'proj-7',
    name: 'Internal Admin Portal',
    code: 'ADMIN-PORTAL',
    department: 'Internal Tools',
    owner: 'G. Stacy',
    manager: 'H. Osborn',
    team: 'Tooling',
    health: 'Completed',
    priority: 'P3',
    progress: 100,
    startDate: 'Mar 01, 2026',
    targetDate: 'Sep 30, 2026',
    nextMilestone: 'Project Handoff',
    nextRelease: 'v1.2 (Live)',
    openRisks: 0,
  },
];

const getHealthColor = (health: string) => {
  switch (health) {
    case 'On Track': return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    case 'At Risk': return 'text-orange-500 border-orange-500 bg-orange-500/10';
    case 'Off Track': return 'text-destructive border-destructive bg-destructive/10';
    case 'Completed': return 'text-muted-foreground border-border bg-surface';
    default: return 'text-foreground border-border bg-surface';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'P1': return 'text-destructive';
    case 'P2': return 'text-orange-500';
    case 'P3': return 'text-muted-foreground';
    default: return 'text-foreground';
  }
};

export default function ProjectsPage() {
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Delivery</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Projects</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            Manage delivery across products, engineering teams, programs, and business units.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)} className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Create Project
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
            <input type="text" placeholder="SEARCH PROJECTS..." className="w-full h-8 pl-8 pr-3 bg-background border border-border text-[10px] font-mono uppercase focus:outline-none focus:border-foreground transition-colors" />
          </div>
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border bg-background">
            <Filter className="w-3 h-3 mr-2" /> Filters (2)
          </Button>
        </div>
        <div className="flex items-center gap-2 bg-background border border-border">
          <button 
            onClick={() => setView('table')}
            className={`p-1.5 transition-colors ${view === 'table' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView('grid')}
            className={`p-1.5 transition-colors ${view === 'grid' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 border border-border bg-background overflow-hidden flex flex-col">
        {view === 'table' ? (
          <div className="overflow-auto flex-1 scrollbar-thin">
            <table className="w-full text-left text-sm font-mono border-collapse whitespace-nowrap">
              <thead className="sticky top-0 bg-surface-hover z-10 shadow-[0_1px_0_0_var(--border)]">
                <tr>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Project</th>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Health</th>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Progress</th>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Team</th>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Owner/Manager</th>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Target Date</th>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Next Milestone</th>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Risks</th>
                  <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <Link href={`/dashboard/projects/${project.id}`} className="block">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-bold ${getPriorityColor(project.priority)}`}>{project.priority}</span>
                          <span className="font-sans font-bold text-sm truncate max-w-[200px]">{project.name}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-surface border border-border">{project.code}</span>
                          <span>{project.department}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getHealthColor(project.health)}`}>
                        {project.health}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 h-1.5 bg-surface border border-border overflow-hidden">
                          <div className="h-full bg-foreground" style={{ width: `${project.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground w-6 text-right">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs truncate max-w-[120px]">{project.team}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs">{project.owner}</div>
                      <div className="text-[10px] text-muted-foreground">{project.manager}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs">{project.targetDate}</div>
                      <div className="text-[10px] text-muted-foreground">Started: {project.startDate}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs truncate max-w-[150px]">{project.nextMilestone}</div>
                      <div className="text-[10px] text-muted-foreground">Release: {project.nextRelease}</div>
                    </td>
                    <td className="p-3">
                      {project.openRisks > 0 ? (
                        <span className="flex items-center gap-1 text-[10px] text-destructive">
                          <AlertTriangle className="w-3 h-3" /> {project.openRisks} Open
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto scrollbar-thin">
            {mockProjects.map((project) => (
              <Link href={`/dashboard/projects/${project.id}`} key={project.id} className="border border-border bg-background p-4 hover:border-foreground transition-colors group flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 bg-surface border border-border">{project.code}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 border ${getHealthColor(project.health)}`}>{project.health}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-1">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <h3 className="font-bold text-lg mb-1 group-hover:underline decoration-border underline-offset-4">{project.name}</h3>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layers className="w-3 h-3" /> {project.department}
                </div>
                
                <div className="space-y-3 mb-4 flex-1">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1 bg-surface border border-border w-full overflow-hidden">
                      <div className="h-full bg-foreground" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                     <div>
                       <div className="text-[10px] font-mono text-muted-foreground uppercase">Target</div>
                       <div>{project.targetDate}</div>
                     </div>
                     <div>
                       <div className="text-[10px] font-mono text-muted-foreground uppercase">Next Release</div>
                       <div className="truncate">{project.nextRelease}</div>
                     </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 border border-border bg-surface flex items-center justify-center font-mono text-[9px] uppercase z-20" title={project.owner}>{project.owner.charAt(0)}</div>
                    <div className="w-6 h-6 border border-border bg-surface-hover flex items-center justify-center font-mono text-[9px] uppercase z-10" title={project.manager}>{project.manager.charAt(0)}</div>
                  </div>
                  {project.openRisks > 0 && (
                     <div className="flex items-center gap-1 text-[10px] font-mono uppercase text-destructive bg-destructive/10 px-1.5 py-0.5 border border-destructive/30">
                       <AlertTriangle className="w-3 h-3" /> {project.openRisks} Risks
                     </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="p-3 border-t border-border bg-surface-hover flex justify-between items-center text-[10px] font-mono text-muted-foreground flex-shrink-0">
          <span>Showing 7 projects</span>
          <div className="flex gap-4">
             <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500/20 border border-emerald-500 block" /> 4 On Track</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-500/20 border border-orange-500 block" /> 1 At Risk</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 bg-destructive/20 border border-destructive block" /> 1 Off Track</span>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsCreateModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-background border border-border shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
                <h2 className="font-mono text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                  <div className="w-2 h-2 bg-foreground" /> Create Project
                </h2>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-none hover:bg-surface border border-transparent hover:border-border" onClick={() => setIsCreateModalOpen(false)}>
                  <MoreVertical className="w-4 h-4 rotate-45" /> {/* Close icon lookalike */}
                </Button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Project Name *</label>
                    <input type="text" className="w-full h-9 px-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="e.g. Ledger Migration" />
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Project Code *</label>
                    <input type="text" className="w-full h-9 px-3 bg-background border border-border text-sm font-mono uppercase focus:outline-none focus:border-foreground transition-colors" placeholder="e.g. LGR-MIG" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Description</label>
                  <textarea className="w-full h-24 p-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Brief project objective and scope..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Department</label>
                    <select className="w-full h-9 px-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors">
                      <option>Payments</option>
                      <option>Compliance</option>
                      <option>Infrastructure</option>
                      <option>Consumer</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Priority</label>
                    <select className="w-full h-9 px-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors">
                      <option>P1 - Critical</option>
                      <option>P2 - High</option>
                      <option>P3 - Normal</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Project Manager</label>
                    <input type="text" className="w-full h-9 px-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Search users..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Team</label>
                    <select className="w-full h-9 px-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors">
                      <option>Payments Core</option>
                      <option>Platform</option>
                      <option>Mobile App</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Start Date</label>
                    <input type="date" className="w-full h-9 px-3 bg-background border border-border text-sm font-mono focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Target Date</label>
                    <input type="date" className="w-full h-9 px-3 bg-background border border-border text-sm font-mono focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-foreground font-bold">DevPilot AI Assistants</span>
                  </div>
                  <label className="flex items-center gap-2 p-2 border border-border bg-surface-hover cursor-pointer">
                    <input type="checkbox" className="accent-foreground w-3 h-3" defaultChecked />
                    <span className="text-xs">Auto-generate epics and standard tasks from description</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 border border-border bg-surface-hover cursor-pointer">
                    <input type="checkbox" className="accent-foreground w-3 h-3" defaultChecked />
                    <span className="text-xs">Create baseline project timeline</span>
                  </label>
                </div>

              </div>
              <div className="p-4 border-t border-border bg-surface flex justify-end gap-3">
                <Button variant="outline" className="rounded-none border-border font-mono text-xs uppercase" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                <Button className="rounded-none bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase">Initialize Project</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
