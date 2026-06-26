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
  MoreVertical,
  Calendar,
  LayoutGrid,
  List,
  MessageSquare,
  FileText,
  Link2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const incidentData = {
  id: 'INC-119',
  title: 'Ledger API Export Timeout',
  severity: 'SEV-2',
  status: 'Resolved',
  commander: 'S. Chen',
  service: 'Ledger API',
  impact: 'High (Export failures for 45 merchants)',
  start: 'Oct 15, 2026 14:20 UTC',
  end: 'Oct 15, 2026 18:35 UTC',
  duration: '4h 15m',
  release: 'REL-42',
  participants: 8,
  description: 'Ledger export queries began timing out after the deployment of REL-42, causing 45 merchants to fail their end-of-day reconciliation downloads.'
};

const tabs = [
  'Overview',
  'Timeline',
  'Communications',
  'Evidence',
  'Linked Work',
  'Postmortem',
  'Follow-ups'
];

export default function IncidentDetailPage({ params }: { params: Promise<{ incidentId: string }> }) {
  const { incidentId } = React.use(params);
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <Link href="/dashboard/incidents" className="hover:text-foreground hover:underline underline-offset-4">Incidents</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{incidentData.id}</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
              <div className="w-3 h-3 bg-foreground" />
              {incidentData.title}
            </h1>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-orange-500 text-orange-500 bg-orange-500/10 font-bold">
              {incidentData.severity}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-emerald-500 text-emerald-500">
              {incidentData.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-accent hover:bg-accent/10 gap-2">
            <Bot className="w-4 h-4" />
            Incident Insights
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <FileText className="w-4 h-4" />
            Edit Postmortem
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-shrink-0">
        <div className="p-4 border border-border bg-surface">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Commander</div>
          <div className="text-sm font-bold">{incidentData.commander}</div>
        </div>
        <div className="p-4 border border-border bg-surface">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Affected Service</div>
          <div className="text-sm font-bold">{incidentData.service}</div>
        </div>
        <div className="p-4 border border-border bg-surface">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Start Time</div>
          <div className="text-sm font-bold">{incidentData.start}</div>
        </div>
        <div className="p-4 border border-border bg-surface">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Duration</div>
          <div className="text-sm font-bold">{incidentData.duration}</div>
        </div>
        <div className="p-4 border border-border bg-surface">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Customer Impact</div>
          <div className="text-sm font-bold">{incidentData.impact}</div>
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
            <div className="lg:col-span-2 space-y-6">
              
              <div className="border border-border bg-background p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> Incident Summary
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {incidentData.description}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                   <div>
                     <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Systems Affected</span>
                     <div className="mt-1 text-sm font-mono">Ledger DB, API Gateway, Export Worker</div>
                   </div>
                   <div>
                     <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Resolution Time</span>
                     <div className="mt-1 text-sm font-mono">{incidentData.end}</div>
                   </div>
                </div>
              </div>

              <div className="border border-border bg-background">
                <div className="p-4 border-b border-border bg-surface-hover">
                   <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Key Actions</h3>
                </div>
                <div className="p-4 space-y-3">
                   <div className="text-sm p-3 border border-border bg-surface">Rolled back ledger-api to REL-41.</div>
                   <div className="text-sm p-3 border border-border bg-surface">Scaled up database read replicas temporarily.</div>
                   <div className="text-sm p-3 border border-border bg-surface">Manually re-triggered failed export jobs.</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* AI Assistant */}
              <div className="border border-accent/30 bg-accent/5 p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-5 h-5 text-accent" />
                  <h2 className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">DevPilot Assistant</h2>
                </div>
                <div className="space-y-2 mt-4">
                  <Button variant="outline" size="sm" className="w-full justify-start h-8 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-accent/50 text-accent hover:bg-accent hover:text-background text-left">
                    Generate Executive Summary
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start h-8 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background text-left">
                    Draft Postmortem
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start h-8 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background text-left">
                    Suggest Customer Update
                  </Button>
                </div>
              </div>

              <div className="border border-border bg-background p-4">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold mb-4">Linked Resources</h3>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4">
                    <Link2 className="w-4 h-4" /> REL-42 Deployment Log
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4">
                    <Link2 className="w-4 h-4" /> Datadog Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Timeline' && (
          <div className="border border-border bg-background p-6">
             <div className="max-w-2xl mx-auto space-y-8 relative">
               <div className="absolute top-0 bottom-0 left-[15px] w-px bg-border" />
               {[
                 { time: '14:20', label: 'Detection', desc: 'PagerDuty alert triggered for high error rate on /api/v1/export.' },
                 { time: '14:25', label: 'Escalation', desc: 'S. Chen acknowledges page, declares SEV-2 incident.' },
                 { time: '14:40', label: 'Investigation', desc: 'DB metrics show lock contention. Identified slow queries introduced in REL-42.' },
                 { time: '15:15', label: 'Mitigation', desc: 'Rollback to REL-41 initiated.' },
                 { time: '15:30', label: 'Mitigation', desc: 'Rollback complete. Error rates stabilizing.' },
                 { time: '18:35', label: 'Resolution', desc: 'All failed jobs manually re-run successfully. Incident resolved.' },
               ].map((event, i) => (
                 <div key={i} className="flex gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center relative z-10 flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{event.time}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest border border-border px-1.5 py-0.5 bg-surface">{event.label}</span>
                      </div>
                      <p className="text-sm">{event.desc}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'Postmortem' && (
          <div className="border border-border bg-background p-8 max-w-4xl mx-auto">
             <h2 className="text-2xl font-bold tracking-tight mb-8">Incident Postmortem: {incidentData.id}</h2>
             
             <div className="space-y-8">
               <section>
                 <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 mb-4">Summary</h3>
                 <p className="text-sm leading-relaxed text-foreground/80">{incidentData.description}</p>
               </section>

               <section>
                 <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 mb-4">Root Cause</h3>
                 <p className="text-sm leading-relaxed text-foreground/80">A missing index on the \`merchant_id\` column in the new export reporting table (introduced in REL-42) caused full table scans, leading to database lock contention under normal load.</p>
               </section>

               <section>
                 <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 mb-4">Detection Gap</h3>
                 <p className="text-sm leading-relaxed text-foreground/80">Load testing in staging did not adequately simulate the volume of concurrent export requests typical of end-of-day production traffic.</p>
               </section>
               
               <section>
                 <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2 mb-4">Preventive Actions</h3>
                 <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                   <li>Add staging load test profiles that mirror production end-of-day traffic volumes.</li>
                   <li>Implement automated schema linter to flag missing indexes on foreign keys.</li>
                 </ul>
               </section>
             </div>
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== 'Overview' && activeTab !== 'Timeline' && activeTab !== 'Postmortem' && (
          <div className="flex flex-col items-center justify-center h-64 border border-border border-dashed bg-surface/30">
            <h3 className="font-mono text-sm uppercase tracking-widest font-bold mb-2">{activeTab} View</h3>
            <p className="text-xs text-muted-foreground">Select Overview, Timeline, or Postmortem to see the primary implementation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
