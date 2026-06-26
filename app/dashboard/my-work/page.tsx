'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  AlertCircle, 
  FileSignature, 
  TrendingUp, 
  Play, 
  MessageSquare, 
  Eye, 
  ChevronRight, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckSquare, 
  GitPullRequest, 
  Terminal, 
  Bot, 
  ShieldAlert,
  Calendar,
  MoreVertical,
  X,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MyWorkPage() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Overview</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">My Work</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            My Work
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            Your assigned work, approvals, deadlines, and active delivery items.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover">
            Update Status
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

      {/* Top KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Active Tasks', value: '14', icon: CheckSquare, trend: '+2 this week' },
          { label: 'Due Today', value: '3', icon: Clock, trend: '2 High Priority', alert: true },
          { label: 'Overdue', value: '1', icon: AlertOctagon, trend: 'Needs action', error: true },
          { label: 'Blocked Items', value: '2', icon: AlertCircle, trend: 'Awaiting API team', error: true },
          { label: 'Pending Approvals', value: '5', icon: FileSignature, trend: '3 PRs, 2 QA' },
          { label: 'Sprint Points', value: '32/45', icon: TrendingUp, trend: '71% completion' },
        ].map((kpi, i) => (
          <div key={i} className={`p-4 border ${kpi.error ? 'border-destructive/50 bg-destructive/5' : kpi.alert ? 'border-accent/50 bg-accent/5' : 'border-border bg-surface'} relative overflow-hidden group`}>
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <kpi.icon className={`w-12 h-12 ${kpi.error ? 'text-destructive' : kpi.alert ? 'text-accent' : 'text-muted-foreground'}`} />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{kpi.label}</div>
            <div className="text-3xl font-bold tracking-tighter mb-1 relative z-10">{kpi.value}</div>
            <div className={`font-mono text-[10px] uppercase tracking-widest ${kpi.error ? 'text-destructive' : kpi.alert ? 'text-accent' : 'text-muted-foreground'} relative z-10`}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Priorities */}
          <div className="border border-border bg-background">
            <div className="p-4 border-b border-border flex items-center justify-between bg-surface-hover">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-accent animate-pulse" />
                Today&apos;s Priorities
              </h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { id: 'APX-4921', title: 'Implement Retry Logic for Stripe Webhooks', project: 'Payments Core', time: '14:00', priority: 'P1', status: 'In Progress', pr: 'Open' },
                { id: 'APX-4925', title: 'Fix Race Condition in Ledger Export', project: 'Ledger API', time: '16:30', priority: 'P1', status: 'Not Started', pr: 'None' },
                { id: 'APX-4910', title: 'Review Security Audit Findings', project: 'Compliance', time: '18:00', priority: 'P2', status: 'In Review', pr: 'Merged' },
                { id: 'APX-4899', title: 'Update Node.js Runtime in CI Pipeline', project: 'Platform', time: 'EOD', priority: 'P2', status: 'Blocked', pr: 'Draft' },
              ].map((task, i) => (
                <div key={i} className="p-4 hover:bg-surface-hover transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer" onClick={() => setSelectedTask(task.id)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-surface border border-border text-muted-foreground">{task.id}</span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 border ${task.priority === 'P1' ? 'bg-destructive/10 border-destructive/30 text-destructive' : 'bg-surface border-border text-foreground'}`}>
                        {task.priority}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-accent border border-accent/30 px-2 py-0.5 bg-accent/5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due {task.time}
                      </span>
                    </div>
                    <div className="text-sm font-bold truncate">{task.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-4 font-mono tracking-wider">
                      <span>{task.project}</span>
                      <span className="flex items-center gap-1"><GitPullRequest className="w-3 h-3" /> PR: {task.pr}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border hover:bg-accent hover:text-background hover:border-accent">
                      <Play className="w-3 h-3 mr-2" /> Start
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border hover:bg-destructive hover:text-background hover:border-destructive">
                      Block
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Tasks Data Table */}
          <div className="border border-border bg-background">
            <div className="p-4 border-b border-border bg-surface-hover flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">My Tasks</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="FILTER TASKS..." className="h-7 pl-7 pr-3 bg-background border border-border text-[10px] font-mono uppercase w-48 focus:outline-none focus:border-foreground" />
                </div>
                <Button variant="outline" size="sm" className="h-7 px-3 rounded-none text-[10px] font-mono uppercase border-border">
                  <Filter className="w-3 h-3 mr-2" /> Filter
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-border overflow-x-auto scrollbar-none">
              {['All Work', 'In Progress', 'Waiting for Review', 'Blocked', 'Completed'].map((tab, i) => (
                <button key={i} className={`px-4 py-3 text-xs font-mono uppercase tracking-widest whitespace-nowrap border-b-2 ${i === 1 ? 'border-foreground text-foreground font-bold' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border bg-surface-hover/50">
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">ID</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Title</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Due</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Pts</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { id: 'APX-4921', title: 'Implement Retry Logic', status: 'In Progress', due: 'Today', pts: '5' },
                    { id: 'APX-4912', title: 'Update Auth Tokens', status: 'In Review', due: 'Tomorrow', pts: '3' },
                    { id: 'APX-4899', title: 'Node.js Runtime Update', status: 'Blocked', due: 'Oct 24', pts: '8' },
                    { id: 'APX-4905', title: 'Refactor Dashboard Queries', status: 'In Progress', due: 'Oct 25', pts: '5' },
                    { id: 'APX-4882', title: 'Export PDF Fix', status: 'Not Started', due: 'Oct 26', pts: '2' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-hover group cursor-pointer" onClick={() => setSelectedTask(row.id)}>
                      <td className="p-3 text-muted-foreground text-xs">{row.id}</td>
                      <td className="p-3 text-xs font-sans font-medium truncate max-w-[200px]">{row.title}</td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 border ${row.status === 'Blocked' ? 'border-destructive text-destructive' : row.status === 'In Progress' ? 'border-accent text-accent' : 'border-border text-muted-foreground'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3 text-[10px] text-muted-foreground">{row.due}</td>
                      <td className="p-3 text-[10px] text-muted-foreground">{row.pts}</td>
                      <td className="p-3">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-3 h-3 text-muted-foreground" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-3 border-t border-border flex justify-between items-center text-[10px] font-mono text-muted-foreground bg-surface-hover">
              <span>Showing 1-5 of 14 tasks</span>
              <div className="flex gap-2">
                <button className="hover:text-foreground">Prev</button>
                <span>1 / 3</span>
                <button className="hover:text-foreground">Next</button>
              </div>
            </div>
          </div>

          {/* Grid for Sprint & Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* My Sprint Work */}
            <div className="border border-border bg-background p-5">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4">Sprint 42: Ledger Finalization</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">
                    <span>Points Completed</span>
                    <span className="text-foreground">32 / 45</span>
                  </div>
                  <div className="h-2 w-full bg-surface border border-border overflow-hidden">
                    <div className="h-full bg-foreground w-[71%]" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 border border-border bg-surface-hover">
                    <div className="text-2xl font-bold">13</div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Pts Remaining</div>
                  </div>
                  <div className="p-3 border border-border bg-surface-hover border-l-destructive/50">
                    <div className="text-2xl font-bold text-destructive">8</div>
                    <div className="text-[10px] font-mono text-destructive uppercase tracking-widest">Pts at Risk</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border border-border bg-background flex flex-col">
              <div className="p-4 border-b border-border bg-surface-hover">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Recent Activity</h3>
              </div>
              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                {[
                  { user: 'S. Chen', action: 'approved your PR', target: '#4921-webhook-retry', time: '10m ago' },
                  { user: 'M. Johnson', action: 'mentioned you in', target: 'APX-4899', time: '1h ago' },
                  { user: 'System', action: 'deployed to staging', target: 'Release v2.4', time: '2h ago' },
                  { user: 'You', action: 'changed status to In Progress', target: 'APX-4921', time: '3h ago' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="w-6 h-6 bg-surface border border-border rounded-none flex items-center justify-center text-[10px] font-mono text-muted-foreground flex-shrink-0 mt-0.5">
                      {item.user.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-xs">{item.user}</span> <span className="text-muted-foreground text-xs">{item.action}</span> <span className="font-mono text-[10px] px-1 bg-surface border border-border text-foreground">{item.target}</span>
                      <div className="text-[10px] font-mono text-muted-foreground mt-1">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (Side Panel) */}
        <div className="space-y-8">
          
          {/* AI Brief */}
          <div className="border border-border bg-background relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
            <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold">AI Daily Brief</h3>
              </div>
              <div className="text-[9px] font-mono uppercase text-muted-foreground bg-surface px-1.5 py-0.5 border border-border flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Auth: JD
              </div>
            </div>
            <div className="p-4 space-y-4 text-sm leading-relaxed text-muted-foreground font-light">
              <p>
                Good morning. You have <strong className="text-foreground font-normal">7 active tasks</strong> today. 
                <strong className="text-accent font-normal"> Two items are due by EOD.</strong>
              </p>
              <p>
                <span className="inline-block w-2 h-2 bg-destructive mr-2" />
                The <span className="font-mono text-xs text-foreground bg-surface border border-border px-1">Node.js Update</span> task is currently blocked by a pending architecture review from Platform Engineering.
              </p>
              <p>
                <span className="inline-block w-2 h-2 bg-foreground mr-2" />
                Sarah approved your PR for webhook retries. You can proceed with merging.
              </p>
            </div>
            <div className="px-4 pb-2">
              <div className="text-[10px] font-mono text-muted-foreground border-t border-border/50 pt-2 flex flex-col gap-1">
                <span className="flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> Sources: Jira (3), GitHub (1), Slack (2)</span>
                <span className="flex items-center gap-1"><Terminal className="w-3 h-3"/> Logged query. Human approval required for actions.</span>
              </div>
            </div>
            <div className="p-3 border-t border-border bg-surface-hover/50 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-6 px-2 rounded-none text-[9px] font-mono uppercase border-border text-accent hover:bg-accent hover:text-background">
                Summarize Blockers
              </Button>
              <Button variant="outline" size="sm" className="h-6 px-2 rounded-none text-[9px] font-mono uppercase border-border hover:bg-foreground hover:text-background">
                Suggest Priority
              </Button>
            </div>
          </div>

          {/* Blockers */}
          <div className="border border-destructive/30 bg-background">
            <div className="p-4 border-b border-destructive/30 bg-destructive/5 flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-destructive flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> My Blockers (1)
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-sm font-bold">APX-4899: Update Node.js</div>
              <div className="text-xs text-muted-foreground">Blocked by: <span className="font-mono text-[10px] text-foreground">ARC-102 Platform Review</span></div>
              <div className="text-xs text-muted-foreground flex items-center gap-2">Owner: <span className="text-foreground">D. Smith</span> <span className="text-[10px] font-mono px-1 bg-destructive/10 text-destructive">2 Days</span></div>
              <Button variant="outline" size="sm" className="w-full h-7 mt-2 rounded-none text-[10px] font-mono uppercase border-destructive text-destructive hover:bg-destructive hover:text-background">
                Escalate Blocker
              </Button>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="border border-border bg-background">
            <div className="p-4 border-b border-border bg-surface-hover flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Next 7 Days</h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { date: 'Today', task: 'Stripe Webhooks', label: 'APX-4921' },
                { date: 'Tomorrow', task: 'Auth Tokens', label: 'APX-4912' },
                { date: 'Oct 25', task: 'Dashboard Queries', label: 'APX-4905' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-16 font-mono text-[10px] uppercase text-muted-foreground text-right pt-1">{item.date}</div>
                  <div className="flex-1 border-l border-border pl-4 relative">
                    <div className="absolute -left-1 top-1.5 w-2 h-2 bg-background border border-foreground" />
                    <div className="text-xs font-bold">{item.task}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approvals */}
          <div className="border border-border bg-background">
             <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold">My Approvals</h3>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-foreground text-background">3 Pending</span>
            </div>
            <div className="divide-y divide-border">
              {[
                { title: 'Merge PR #492: Fix Pagination API', type: 'Code Review', req: 'T. Vance' },
                { title: 'Release Candidate v2.4 Sign-off', type: 'QA Approval', req: 'Release Mgr' },
              ].map((item, i) => (
                <div key={i} className="p-4 hover:bg-surface-hover transition-colors">
                  <div className="text-xs font-bold mb-1">{item.title}</div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">{item.type} • {item.req}</div>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] font-mono uppercase hover:bg-foreground hover:text-background rounded-none">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Task Detail Drawer */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setSelectedTask(null)}
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
                  <span className="font-mono text-xs bg-surface border border-border px-2 py-1">{selectedTask}</span>
                  <span className="font-mono text-[10px] uppercase text-accent border border-accent/30 px-2 py-1 bg-accent/5">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 rounded-none border-border">Copy Link</Button>
                  <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-surface border border-transparent hover:border-border transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 tracking-tight">Implement Retry Logic for Stripe Webhooks</h2>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest mb-1">Assignee</div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-surface border border-border flex items-center justify-center text-[10px] font-mono">Y</div>
                        <span>You</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest mb-1">Project</div>
                      <div>Payments Core</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest mb-1">Due Date</div>
                      <div className="text-accent flex items-center gap-1"><Clock className="w-3 h-3"/> Today, 14:00</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest mb-1">Priority</div>
                      <div className="text-destructive">P1 - Critical</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2">Description</h3>
                  <div className="text-sm text-muted-foreground space-y-4 leading-relaxed font-light">
                    <p>
                      Webhook events from Stripe occasionally fail due to transient database locks on the <code>LedgerTransaction</code> table. We need to implement an exponential backoff retry mechanism for the webhook handler.
                    </p>
                    <pre className="p-4 bg-surface border border-border font-mono text-xs overflow-x-auto text-foreground">
                      {`// Expected implementation pattern
const retryConfig = {
  retries: 5,
  minTimeout: 1000,
  maxTimeout: 30000,
  factor: 2
};`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 flex items-center justify-between">
                    <span>Linked Pull Requests</span>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px] uppercase p-0">Create PR</Button>
                  </h3>
                  <div className="p-3 border border-border bg-surface-hover flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GitPullRequest className="w-4 h-4 text-accent" />
                      <div>
                        <div className="text-sm font-bold">feat(payments): exponential backoff for webhooks</div>
                        <div className="text-xs text-muted-foreground font-mono mt-1">#4921-webhook-retry • Opened 2h ago</div>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 bg-surface border border-border">Open</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-accent" /> DevPilot Analysis
                  </h3>
                  <div className="p-4 border border-border bg-accent/5 text-sm space-y-3">
                    <p>Based on the PR changes, the implementation matches the requirements. However, ensure that idempotency keys are being passed correctly in the retry loop.</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-[10px] font-mono uppercase bg-background border-border text-foreground hover:bg-foreground hover:text-background rounded-none">
                        Review Code
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-[10px] font-mono uppercase bg-background border-border text-foreground hover:bg-foreground hover:text-background rounded-none">
                        Generate Tests
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="h-20 border-t border-border bg-surface p-4 flex items-center justify-between flex-shrink-0">
                <Button variant="outline" className="rounded-none border-border font-mono text-xs uppercase">Add Comment</Button>
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-none border-destructive text-destructive hover:bg-destructive hover:text-background font-mono text-xs uppercase">Mark Blocked</Button>
                  <Button className="rounded-none bg-foreground text-background hover:bg-foreground/90 font-mono text-xs uppercase">Complete Task</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
