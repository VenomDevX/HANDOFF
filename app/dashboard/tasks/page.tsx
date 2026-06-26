'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  Bot, 
  Save, 
  Columns, 
  List, 
  LayoutGrid,
  CheckSquare, 
  Bug, 
  FileText, 
  AlertTriangle,
  ShieldCheck,
  Zap,
  BookOpen,
  MoreVertical,
  GitPullRequest,
  CheckCircle2,
  X,
  MessageSquare,
  Clock,
  Layers,
  Users,
  Paperclip,
  Activity,
  AlignLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  GitCommit,
  Link2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type TaskType = 'Task' | 'User Story' | 'Bug' | 'Improvement' | 'Technical Debt' | 'Security Task' | 'Incident Follow-up' | 'Research' | 'Spike' | 'Compliance Task';

type Task = {
  id: string;
  title: string;
  type: TaskType;
  project: string;
  epic: string;
  sprint: string;
  assignee: string;
  team: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  dueDate: string;
  storyPoints: number;
  linkedPr: string;
  lastUpdated: string;
};

const mockTasks: Task[] = [
  {
    id: 'PAY-231',
    title: 'Implement Retry Logic for Webhooks',
    type: 'Task',
    project: 'Payments',
    epic: 'Webhook Resiliency',
    sprint: 'Sprint 42',
    assignee: 'S. Chen',
    team: 'Payments Core',
    status: 'In Progress',
    priority: 'P1',
    dueDate: 'Oct 20, 2026',
    storyPoints: 5,
    linkedPr: 'PR #482',
    lastUpdated: '2h ago',
  },
  {
    id: 'PAY-234',
    title: 'Idempotency Key validation issue',
    type: 'Bug',
    project: 'Payments',
    epic: 'Core Engine V2',
    sprint: 'Sprint 42',
    assignee: 'M. Johnson',
    team: 'Payments Core',
    status: 'In Review',
    priority: 'P1',
    dueDate: 'Oct 18, 2026',
    storyPoints: 3,
    linkedPr: 'PR #485',
    lastUpdated: '1h ago',
  },
  {
    id: 'SEC-112',
    title: 'Update TLS Certificates for Ledger API',
    type: 'Security Task',
    project: 'Platform Security',
    epic: 'Q4 Compliance',
    sprint: 'Sprint 42',
    assignee: 'L. Davis',
    team: 'SecOps',
    status: 'To Do',
    priority: 'P1',
    dueDate: 'Oct 22, 2026',
    storyPoints: 2,
    linkedPr: '-',
    lastUpdated: '5h ago',
  },
  {
    id: 'MOB-890',
    title: 'As a user, I want to view my transaction history offline',
    type: 'User Story',
    project: 'Mobile Banking',
    epic: 'Offline Mode',
    sprint: 'Sprint 18',
    assignee: 'E. Wright',
    team: 'Mobile App',
    status: 'In Progress',
    priority: 'P2',
    dueDate: 'Oct 25, 2026',
    storyPoints: 8,
    linkedPr: 'PR #102',
    lastUpdated: '1d ago',
  },
  {
    id: 'CORE-501',
    title: 'Refactor legacy auth module to use JWT',
    type: 'Technical Debt',
    project: 'Core Backend',
    epic: 'Auth V2',
    sprint: 'Sprint 89',
    assignee: 'R. Gupta',
    team: 'Platform',
    status: 'To Do',
    priority: 'P3',
    dueDate: 'Nov 01, 2026',
    storyPoints: 13,
    linkedPr: '-',
    lastUpdated: '3d ago',
  },
  {
    id: 'INC-119-A',
    title: 'Post-incident: Add rate limiting to export endpoint',
    type: 'Incident Follow-up',
    project: 'Ledger API',
    epic: 'Platform Stability',
    sprint: 'Sprint 42',
    assignee: 'Unassigned',
    team: 'Platform',
    status: 'To Do',
    priority: 'P1',
    dueDate: 'Oct 15, 2026',
    storyPoints: 5,
    linkedPr: '-',
    lastUpdated: '4h ago',
  },
];

const getTypeIcon = (type: TaskType) => {
  switch (type) {
    case 'Bug': return <Bug className="w-3 h-3 text-destructive" />;
    case 'User Story': return <BookOpen className="w-3 h-3 text-emerald-500" />;
    case 'Security Task': return <ShieldCheck className="w-3 h-3 text-orange-500" />;
    case 'Incident Follow-up': return <AlertTriangle className="w-3 h-3 text-destructive" />;
    case 'Spike': return <Zap className="w-3 h-3 text-accent" />;
    case 'Technical Debt': return <Zap className="w-3 h-3 text-muted-foreground" />;
    case 'Task':
    default: return <CheckSquare className="w-3 h-3 text-blue-500" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'P1': return 'text-destructive';
    case 'P2': return 'text-orange-500';
    case 'P3': return 'text-emerald-500';
    case 'P4': return 'text-muted-foreground';
    default: return 'text-foreground';
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'To Do': return 'border-border text-muted-foreground bg-surface';
    case 'In Progress': return 'border-accent text-accent bg-accent/10';
    case 'In Review': return 'border-orange-500 text-orange-500 bg-orange-500/10';
    case 'Done': return 'border-emerald-500 text-emerald-500 bg-emerald-500/10';
    default: return 'border-border text-foreground bg-surface';
  }
};

export default function TasksPage() {
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = mockTasks.find(t => t.id === selectedTaskId);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Delivery</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Tasks</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            Tasks
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            Manage and track work across projects, teams, releases, and delivery stages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Layers className="w-4 h-4" />
            Bulk Update
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Save className="w-4 h-4" />
            Save View
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Create Task
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
            <input type="text" placeholder="SEARCH TASKS..." className="w-full h-8 pl-8 pr-3 bg-background border border-border text-[10px] font-mono uppercase focus:outline-none focus:border-foreground transition-colors" />
          </div>
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border bg-background">
            <Filter className="w-3 h-3 mr-2" /> Filters
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
            onClick={() => setView('kanban')}
            className={`p-1.5 transition-colors ${view === 'kanban' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Columns className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 flex gap-6">
        
        <div className="flex-1 min-w-0 border border-border bg-background flex flex-col overflow-hidden">
          {view === 'table' ? (
            <div className="overflow-auto flex-1 scrollbar-thin">
              <table className="w-full text-left text-sm font-mono border-collapse whitespace-nowrap">
                <thead className="sticky top-0 bg-surface-hover z-10 shadow-[0_1px_0_0_var(--border)]">
                  <tr>
                    <th className="p-3 w-8"><input type="checkbox" className="accent-foreground w-3 h-3" /></th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Task ID</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Title</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Priority</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Assignee</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Sprint</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Pts</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Due Date</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">PR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockTasks.map((task) => (
                    <tr 
                      key={task.id} 
                      className="hover:bg-surface-hover group cursor-pointer transition-colors"
                      onClick={() => setSelectedTaskId(task.id)}
                    >
                      <td className="p-3" onClick={e => e.stopPropagation()}><input type="checkbox" className="accent-foreground w-3 h-3" /></td>
                      <td className="p-3">
                        <div className="text-[10px] text-muted-foreground uppercase">{task.id}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(task.type)}
                          <span className="font-sans font-bold text-sm truncate max-w-[250px] group-hover:underline decoration-border underline-offset-4">{task.title}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 border ${getStatusStyle(task.status)} uppercase tracking-widest`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`font-bold ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-surface border border-border flex items-center justify-center font-mono text-[9px] uppercase">{task.assignee !== 'Unassigned' ? task.assignee.charAt(0) : '?'}</div>
                          <span className="text-xs">{task.assignee}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-xs truncate max-w-[100px]">{task.sprint}</div>
                      </td>
                      <td className="p-3">
                        <span className="text-xs bg-surface border border-border px-1.5 py-0.5">{task.storyPoints}</span>
                      </td>
                      <td className="p-3">
                        <div className="text-xs text-muted-foreground">{task.dueDate}</div>
                      </td>
                      <td className="p-3">
                        {task.linkedPr !== '-' ? (
                           <span className="text-[10px] flex items-center gap-1 text-muted-foreground hover:text-foreground">
                             <GitPullRequest className="w-3 h-3" /> {task.linkedPr}
                           </span>
                        ) : <span className="text-muted-foreground">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto scrollbar-thin p-4 flex gap-4 bg-surface/30">
              {['To Do', 'In Progress', 'In Review', 'Done'].map(status => (
                <div key={status} className="flex-shrink-0 w-80 flex flex-col">
                  <div className="font-mono text-xs uppercase tracking-widest font-bold mb-3 flex items-center justify-between">
                    <span>{status}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-background border border-border">
                      {mockTasks.filter(t => t.status === status).length}
                    </span>
                  </div>
                  <div className="flex-1 space-y-3">
                    {mockTasks.filter(t => t.status === status).map(task => (
                      <div 
                        key={task.id} 
                        className="p-3 bg-background border border-border hover:border-foreground transition-colors cursor-pointer shadow-sm"
                        onClick={() => setSelectedTaskId(task.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-[10px] uppercase text-muted-foreground">{task.id}</span>
                          <span className={`font-bold text-[10px] ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                        </div>
                        <div className="text-sm font-bold leading-tight mb-3 line-clamp-2">{task.title}</div>
                        <div className="flex items-center gap-2 mb-3">
                          {getTypeIcon(task.type)}
                          <span className="text-[10px] font-mono uppercase text-muted-foreground truncate">{task.epic}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-surface border border-border flex items-center justify-center font-mono text-[9px] uppercase">{task.assignee !== 'Unassigned' ? task.assignee.charAt(0) : '?'}</div>
                            <span className="text-muted-foreground text-[10px]">{task.assignee !== 'Unassigned' ? task.assignee.split(' ')[0] : 'Unassigned'}</span>
                          </div>
                          <div className="font-mono text-[10px] px-1.5 py-0.5 border border-border bg-surface text-muted-foreground">
                            {task.storyPoints} pts
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="p-3 border-t border-border bg-surface-hover flex justify-between items-center text-[10px] font-mono text-muted-foreground flex-shrink-0">
            <span>Showing 6 tasks</span>
          </div>
        </div>

      </div>

      {/* Task Detail Drawer */}
      <AnimatePresence>
        {selectedTaskId && selectedTask && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setSelectedTaskId(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-background border-l border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-surface-hover flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-surface border border-border px-2 py-1">
                    {selectedTask.id}
                  </span>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(selectedTask.type)}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{selectedTask.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 rounded-none border-border">Edit</Button>
                  <Button variant="outline" size="sm" className="h-8 rounded-none border-border"><MoreVertical className="w-4 h-4" /></Button>
                  <button onClick={() => setSelectedTaskId(null)} className="p-2 hover:bg-surface border border-transparent hover:border-border transition-colors ml-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
                
                {/* Title & Core Fields */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 tracking-tight leading-tight">{selectedTask.title}</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-border p-3 flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</span>
                      <select className="bg-transparent border-none p-0 text-sm font-bold focus:ring-0 cursor-pointer" defaultValue={selectedTask.status}>
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>In Review</option>
                        <option>Done</option>
                      </select>
                    </div>
                    <div className="border border-border p-3 flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Assignee</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-5 h-5 bg-surface border border-border flex items-center justify-center font-mono text-[9px] uppercase">{selectedTask.assignee !== 'Unassigned' ? selectedTask.assignee.charAt(0) : '?'}</div>
                        <span className="text-sm font-bold">{selectedTask.assignee}</span>
                      </div>
                    </div>
                    <div className="border border-border p-3 flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Priority</span>
                      <span className={`text-sm font-bold ${getPriorityColor(selectedTask.priority)}`}>{selectedTask.priority}</span>
                    </div>
                    <div className="border border-border p-3 flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Sprint</span>
                      <span className="text-sm font-bold text-accent underline decoration-accent/30 underline-offset-4 cursor-pointer hover:decoration-accent">{selectedTask.sprint}</span>
                    </div>
                  </div>
                </div>

                {/* AI Assistant */}
                <div className="border border-accent/30 bg-accent/5 p-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-accent" />
                    <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">DevPilot Assistant</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-accent/50 text-accent hover:bg-accent hover:text-background">
                      Rewrite Description
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background">
                      Generate Subtasks
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background">
                      Estimate Effort
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 flex items-center gap-2">
                    <AlignLeft className="w-3 h-3" /> Description
                  </h3>
                  <div className="text-sm text-foreground/80 leading-relaxed font-light min-h-[100px]">
                    <p className="mb-4">The current webhook delivery system fails silently on network timeouts. We need to implement an exponential backoff retry mechanism for failed webhook deliveries to third-party endpoints.</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4 text-muted-foreground">
                      <li>Max 5 retries</li>
                      <li>Initial delay: 5 seconds</li>
                      <li>Multiplier: 2.0</li>
                      <li>Log all failed attempts to Datadog</li>
                    </ul>
                  </div>
                </div>

                {/* Acceptance Criteria */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 flex items-center gap-2">
                    <CheckSquare className="w-3 h-3" /> Acceptance Criteria
                  </h3>
                  <div className="space-y-2">
                    {['Webhooks retry up to 5 times on 5xx errors.', 'Webhooks do NOT retry on 4xx errors (except 429).', 'Final failure triggers an alert in #eng-alerts.', 'Unit tests cover all retry scenarios.'].map((ac, i) => (
                      <label key={i} className="flex items-start gap-3 p-2 hover:bg-surface transition-colors cursor-pointer border border-transparent hover:border-border">
                        <input type="checkbox" className="accent-foreground w-4 h-4 mt-0.5" />
                        <span className="text-sm text-foreground/80">{ac}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> Details
                  </h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Project</div>
                      <div>{selectedTask.project}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Epic</div>
                      <div className="underline decoration-border underline-offset-4 cursor-pointer">{selectedTask.epic}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Story Points</div>
                      <div className="font-mono bg-surface border border-border inline-block px-1.5">{selectedTask.storyPoints}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Due Date</div>
                      <div>{selectedTask.dueDate}</div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 flex items-center gap-2">
                    <Link2 className="w-3 h-3" /> Linked Items
                  </h3>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center justify-between p-2 border border-border bg-surface-hover hover:border-foreground transition-colors group">
                      <div className="flex items-center gap-3">
                        <GitPullRequest className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-mono text-emerald-500">{selectedTask.linkedPr !== '-' ? selectedTask.linkedPr : 'No PR linked'}</span>
                        <span className="text-xs text-muted-foreground ml-2">feat: webhook retry engine</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>

                {/* Activity */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Activity
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center font-mono text-[10px] uppercase flex-shrink-0">M</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-sm font-bold">M. Johnson</span>
                          <span className="text-[10px] font-mono text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm text-foreground/80 bg-surface/50 border border-border p-3">I&apos;ve opened the PR for this. Just waiting on CI to pass before moving to review.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-background border border-border flex items-center justify-center font-mono text-[10px] uppercase flex-shrink-0 text-muted-foreground">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <span className="text-sm"><span className="font-bold">S. Chen</span> moved task to <span className="font-bold">In Progress</span></span>
                        <div className="text-[10px] font-mono text-muted-foreground mt-1">1 day ago</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comment input */}
                  <div className="mt-6 flex gap-3">
                    <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center font-mono text-[10px] uppercase flex-shrink-0">Y</div>
                    <div className="flex-1 flex flex-col gap-2">
                      <textarea className="w-full min-h-[80px] p-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Add a comment..." />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-none border-border">Cancel</Button>
                        <Button size="sm" className="h-8 rounded-none bg-foreground text-background">Comment</Button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
