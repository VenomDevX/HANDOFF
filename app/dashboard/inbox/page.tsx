'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  CheckCircle2, 
  Settings, 
  Bot, 
  Inbox as InboxIcon, 
  Bell, 
  AtSign, 
  FileSignature, 
  CheckSquare, 
  GitPullRequest, 
  Rocket, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Search, 
  Filter, 
  ListOrdered, 
  MoreHorizontal, 
  Eye, 
  Clock, 
  ArrowUpRight, 
  AlertCircle,
  Archive,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Notification = {
  id: string;
  read: boolean;
  type: string;
  title: string;
  description: string;
  project: string;
  reference: string;
  sender: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
};

const notifications: Notification[] = [
  {
    id: 'notif-1',
    read: false,
    type: 'mention',
    title: 'You were mentioned on PAY-231',
    description: '"Can you take a look at the retry logic here? It seems we might be missing the idempotency key on the final attempt."',
    project: 'Payments Core',
    reference: 'PAY-231',
    sender: 'S. Chen',
    timestamp: '10m ago',
    priority: 'medium',
  },
  {
    id: 'notif-2',
    read: false,
    type: 'approval',
    title: 'Security approval required for Release 3.8.0',
    description: 'Release candidate is ready for production. Waiting for final security sign-off before deployment window opens.',
    project: 'Platform',
    reference: 'REL-3.8.0',
    sender: 'Release System',
    timestamp: '1h ago',
    priority: 'high',
  },
  {
    id: 'notif-3',
    read: true,
    type: 'incident',
    title: 'Production incident INC-119 assigned to you',
    description: 'Elevated error rates on the Ledger API endpoint /v1/export. Alert triggered by Datadog monitor.',
    project: 'Ledger API',
    reference: 'INC-119',
    sender: 'PagerDuty',
    timestamp: '2h ago',
    priority: 'critical',
  },
  {
    id: 'notif-4',
    read: false,
    type: 'pr',
    title: 'Pull request #482 is ready for review',
    description: 'feat(auth): implement token rotation for long-lived sessions',
    project: 'Auth Service',
    reference: 'PR #482',
    sender: 'J. Doe',
    timestamp: '3h ago',
    priority: 'medium',
  },
  {
    id: 'notif-5',
    read: true,
    type: 'ai',
    title: 'Sprint 14 is at risk of missing its goal',
    description: 'Velocity has dropped 15% this week. Two critical path items are blocked by external dependencies.',
    project: 'Mobile Banking',
    reference: 'SPRINT-14',
    sender: 'DevPilot AI',
    timestamp: '5h ago',
    priority: 'high',
  },
];

const categories = [
  { name: 'All', icon: InboxIcon, count: 24 },
  { name: 'Unread', icon: Bell, count: 5 },
  { name: 'Mentions', icon: AtSign, count: 2 },
  { name: 'Approvals', icon: FileSignature, count: 1 },
  { name: 'Task Updates', icon: CheckSquare, count: 8 },
  { name: 'Pull Requests', icon: GitPullRequest, count: 4 },
  { name: 'Release Alerts', icon: Rocket, count: 1 },
  { name: 'Incident Alerts', icon: AlertTriangle, count: 1 },
  { name: 'QA & Security', icon: ShieldCheck, count: 1 },
  { name: 'AI Recommendations', icon: Sparkles, count: 1 },
  { name: 'System Notifications', icon: Terminal, count: 0 },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'mention': return <AtSign className="w-4 h-4 text-blue-500" />;
    case 'approval': return <FileSignature className="w-4 h-4 text-orange-500" />;
    case 'incident': return <AlertTriangle className="w-4 h-4 text-destructive" />;
    case 'pr': return <GitPullRequest className="w-4 h-4 text-emerald-500" />;
    case 'ai': return <Sparkles className="w-4 h-4 text-accent" />;
    default: return <Bell className="w-4 h-4 text-muted-foreground" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'border-destructive text-destructive bg-destructive/10';
    case 'high': return 'border-orange-500/50 text-orange-500 bg-orange-500/10';
    case 'medium': return 'border-border text-foreground bg-surface';
    case 'low': return 'border-border text-muted-foreground bg-surface';
    default: return 'border-border text-foreground bg-surface';
  }
};

export default function InboxPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedNotifId, setSelectedNotifId] = useState<string | null>(notifications[0].id);

  const selectedNotif = notifications.find(n => n.id === selectedNotifId);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Overview</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Inbox</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            Inbox
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            Track mentions, approvals, delivery alerts, incidents, and important updates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Mark All Read
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Settings className="w-4 h-4" />
            Configure
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Bot className="w-4 h-4" />
            Ask DevPilot AI
          </Button>
        </div>
      </div>

      {/* Main Layout - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left Column - Categories */}
        <div className="lg:col-span-2 flex flex-col gap-1 overflow-y-auto pr-2 pb-8 scrollbar-none">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4 pl-2">Categories</div>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center justify-between w-full p-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                activeCategory === cat.name 
                  ? 'bg-foreground text-background font-bold' 
                  : 'text-muted-foreground hover:bg-surface-hover hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-3">
                <cat.icon className="w-4 h-4" />
                <span className="truncate">{cat.name}</span>
              </div>
              {cat.count > 0 && (
                <span className={`px-1.5 py-0.5 text-[9px] ${activeCategory === cat.name ? 'bg-background text-foreground' : 'bg-surface border border-border'}`}>
                  {cat.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Middle Column - Notification List */}
        <div className="lg:col-span-6 flex flex-col border border-border bg-background min-h-0 relative">
          
          {/* Top Tools */}
          <div className="p-3 border-b border-border bg-surface-hover flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="SEARCH INBOX..." className="w-full h-8 pl-8 pr-3 bg-background border border-border text-[10px] font-mono uppercase focus:outline-none focus:border-foreground transition-colors" />
              </div>
              <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border">
                <Filter className="w-3 h-3 mr-2" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border">
                <ListOrdered className="w-3 h-3 mr-2" /> Sort
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 px-2 rounded-none border-border">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-border">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => setSelectedNotifId(notif.id)}
                    className={`p-4 cursor-pointer transition-colors relative group ${
                      selectedNotifId === notif.id ? 'bg-surface-hover border-l-2 border-l-foreground' : 'hover:bg-surface-hover border-l-2 border-l-transparent'
                    } ${!notif.read ? 'bg-background' : 'bg-surface/30 opacity-70'}`}
                  >
                    {!notif.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent animate-pulse" />
                    )}
                    <div className="flex items-start gap-4 pr-6">
                      <div className="mt-1 flex-shrink-0 bg-surface border border-border w-8 h-8 flex items-center justify-center">
                        {getTypeIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-bold text-sm truncate">{notif.title}</span>
                          <span className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border ${getPriorityColor(notif.priority)}`}>
                            {notif.priority}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                          {notif.description}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-mono uppercase text-muted-foreground">
                          <span className="text-foreground">{notif.sender}</span>
                          <span>•</span>
                          <span>{notif.project}</span>
                          <span>•</span>
                          <span className="border border-border px-1 bg-surface">{notif.reference}</span>
                          <span>•</span>
                          <span>{notif.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-mono text-sm uppercase tracking-widest font-bold mb-2">Inbox Zero</h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  You are all caught up. No notifications require action.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Detail Panel */}
        <div className="lg:col-span-4 flex flex-col border border-border bg-background min-h-0 relative">
          {selectedNotif ? (
            <>
              {/* Detail Header */}
              <div className="p-4 border-b border-border bg-surface flex flex-col gap-4 flex-shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-background border border-border w-10 h-10 flex items-center justify-center">
                      {getTypeIcon(selectedNotif.type)}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                        {selectedNotif.project} / {selectedNotif.reference}
                      </div>
                      <h2 className="text-sm font-bold leading-tight">{selectedNotif.title}</h2>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                  <Button size="sm" className="h-8 rounded-none text-[10px] font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 flex-1">
                    {selectedNotif.type === 'approval' ? 'Approve' : 'Open Item'}
                  </Button>
                  {selectedNotif.type === 'approval' && (
                    <Button variant="outline" size="sm" className="h-8 rounded-none text-[10px] font-mono uppercase tracking-widest border-destructive text-destructive hover:bg-destructive hover:text-background flex-1">
                      Reject
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="h-8 px-3 rounded-none border-border hover:bg-surface-hover" title="Snooze">
                    <Clock className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 px-3 rounded-none border-border hover:bg-surface-hover" title="Archive">
                    <Archive className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Detail Content */}
              <div className="flex-1 overflow-y-auto p-0">
                
                {/* AI Brief panel inside detail */}
                <div className="p-4 border-b border-border bg-accent/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-accent" />
                    <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">DevPilot AI Summary</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {selectedNotif.type === 'incident' && "This incident affects the core ledger export functionality. You are the primary on-call for this service. Datadog reports a 15% error rate spike in the last 10 minutes."}
                    {selectedNotif.type === 'mention' && "S. Chen is asking for your input on the retry logic implementation in PAY-231. They specifically need confirmation on the idempotency key usage."}
                    {selectedNotif.type === 'approval' && "This release contains 14 PRs across 3 teams. QA has already signed off. Security review is the final required gate."}
                    {selectedNotif.type === 'ai' && "Mobile Banking sprint velocity has trended downward for 2 consecutive weeks. Addressing the blocked API dependencies could recover ~20 story points."}
                    {selectedNotif.type === 'pr' && "This PR introduces a new token rotation mechanism. It touches critical auth paths and requires careful review of the session invalidation logic."}
                  </p>
                  <div className="flex gap-2">
                     <Button variant="outline" size="sm" className="h-6 px-2 rounded-none text-[9px] font-mono uppercase tracking-widest border-accent/30 text-accent hover:bg-accent hover:text-background">
                       Explain Context
                     </Button>
                     <Button variant="outline" size="sm" className="h-6 px-2 rounded-none text-[9px] font-mono uppercase tracking-widest border-border text-muted-foreground hover:bg-foreground hover:text-background">
                       Draft Reply
                     </Button>
                  </div>
                </div>

                {/* Message / Description content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center text-xs font-mono font-bold">
                       {selectedNotif.sender.charAt(0)}
                     </div>
                     <div>
                       <div className="text-xs font-bold">{selectedNotif.sender}</div>
                       <div className="text-[10px] font-mono text-muted-foreground">{selectedNotif.timestamp}</div>
                     </div>
                  </div>
                  <div className="text-sm leading-relaxed border-l-2 border-border pl-4 py-1 text-foreground/90">
                    {selectedNotif.description}
                  </div>
                </div>

                {/* Related Activity / Details */}
                <div className="p-5 border-t border-border bg-surface/30">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Related Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold">System</span> <span className="text-muted-foreground">linked task to epic</span>
                        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold">M. Johnson</span> <span className="text-muted-foreground">changed status to In Review</span>
                        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">3 hours ago</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Quick Reply Footer */}
              <div className="p-4 border-t border-border bg-background flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type a quick reply..." 
                  className="flex-1 h-9 px-3 bg-surface border border-border text-xs focus:outline-none focus:border-foreground"
                />
                <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase bg-foreground text-background">
                  Send
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs font-mono uppercase tracking-widest">
              Select an item to view details
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
