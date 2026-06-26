'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  Bot, 
  Bug,
  ShieldCheck,
  CheckSquare,
  FileText,
  AlertTriangle,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  MoreVertical,
  Link2,
  Lock,
  FileCheck,
  ArrowRight,
  ShieldAlert,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const tabs = [
  'QA Testing',
  'Bugs',
  'Security Reviews',
  'Compliance',
  'Approvals'
];

const mockBugs = [
  { id: 'BUG-402', title: 'Webhook timeout on large payloads', severity: 'Critical', priority: 'P1', project: 'Payments', env: 'Staging', reporter: 'QA Team', assignee: 'S. Chen', task: 'PAY-231', release: 'REL-42', status: 'In Progress', rootCause: '-', created: '2h ago' },
  { id: 'BUG-401', title: 'Idempotency key collision under load', severity: 'High', priority: 'P1', project: 'Payments', env: 'Development', reporter: 'Load Testing', assignee: 'M. Johnson', task: 'PAY-234', release: 'REL-42', status: 'In Review', rootCause: 'DB Constraint', created: '1d ago' },
  { id: 'BUG-398', title: 'Offline sync fails on iOS 16', severity: 'Medium', priority: 'P2', project: 'Mobile App', env: 'UAT', reporter: 'Beta User', assignee: 'E. Wright', task: 'MOB-890', release: 'REL-41', status: 'To Do', rootCause: 'Cache expiry', created: '2d ago' },
  { id: 'BUG-395', title: 'Misaligned icon on settings page', severity: 'Low', priority: 'P4', project: 'Web Portal', env: 'Production', reporter: 'Support', assignee: 'Unassigned', task: '-', release: '-', status: 'Open', rootCause: '-', created: '5d ago' },
];

const mockQA = [
  { plan: 'REL-42 Core Regression', project: 'Payments', automated: '145/150', manual: '12/12', ratio: '97%', regression: 'Passing', uat: 'Pending', owner: 'QA Automation', release: 'REL-42' },
  { plan: 'Auth V2 Security Testing', project: 'Core Backend', automated: '80/80', manual: '5/5', ratio: '100%', regression: 'Passed', uat: 'Signed-off', owner: 'SecOps', release: 'REL-43' },
  { plan: 'Mobile Offline Mode UAT', project: 'Mobile App', automated: '40/45', manual: '2/10', ratio: '65%', regression: 'Failing', uat: 'Blocked', owner: 'Mobile QA', release: 'REL-41' },
];

const mockSecurity = [
  { review: 'Ledger API v2 Threat Model', project: 'Payments', vulns: '0 High, 2 Med', score: '24 (Low)', owner: 'SecOps', due: 'Oct 20, 2026', evidence: '3 attached', status: 'Approved', tasks: '0 open' },
  { review: 'Auth V2 JWT Migration', project: 'Core Backend', vulns: '1 High, 0 Med', score: '75 (High)', owner: 'SecOps', due: 'Oct 15, 2026', evidence: '1 attached', status: 'Needs Revision', tasks: '1 open' },
  { review: 'Mobile Biometric Login', project: 'Mobile App', vulns: '0 High, 0 Med', score: '10 (Info)', owner: 'Mobile Sec', due: 'Oct 25, 2026', evidence: '2 attached', status: 'In Review', tasks: '0 open' },
];

const mockCompliance = [
  { control: 'SOC2-CC6.1', requirement: 'Logical Access', owner: 'IT Admin', evidence: 'Access Logs Q3', due: 'Nov 01, 2026', status: 'Needs Review', project: 'Auth V2', approval: 'Pending' },
  { control: 'PCI-DSS 3.2', requirement: 'Data Encryption', owner: 'Platform Lead', evidence: 'KMS Config', due: 'Oct 15, 2026', status: 'Compliant', project: 'Payments', approval: 'Approved' },
  { control: 'GDPR-Art.17', requirement: 'Right to Erasure', owner: 'Data Privacy', evidence: 'Deletion Job Logs', due: 'Nov 15, 2026', status: 'At Risk', project: 'Core Backend', approval: 'Rejected' },
];

const mockApprovals = [
  { chain: 'Release 42', type: 'Release Manager', approver: 'T. Vance', decision: 'Approved', time: '1h ago', comments: 'All tests passing, approved for prod.' },
  { chain: 'Release 42', type: 'Security Review', approver: 'L. Davis', decision: 'Approved', time: '3h ago', comments: 'Threat model updated. No blockers.' },
  { chain: 'Auth V2', type: 'Compliance', approver: 'J. Smith', decision: 'Rejected', time: '1d ago', comments: 'Missing SOC2 evidence for access control.' },
  { chain: 'Release 41', type: 'QA Sign-off', approver: 'QA Team', decision: 'Pending', time: '-', comments: '-' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Passing':
    case 'Passed':
    case 'Signed-off':
    case 'Approved':
    case 'Compliant':
      return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    case 'Failing':
    case 'Blocked':
    case 'Needs Revision':
    case 'At Risk':
    case 'Rejected':
      return 'text-destructive border-destructive bg-destructive/10';
    case 'Pending':
    case 'In Progress':
    case 'In Review':
    case 'Needs Review':
      return 'text-accent border-accent bg-accent/10';
    default:
      return 'text-foreground border-border bg-surface';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'text-destructive font-bold';
    case 'High': return 'text-orange-500 font-bold';
    case 'Medium': return 'text-accent';
    case 'Low': return 'text-muted-foreground';
    default: return 'text-foreground';
  }
};

export default function QaSecurityPage() {
  const [activeTab, setActiveTab] = useState('Bugs');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Quality & Control</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">QA & Security</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            QA & Security
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            Manage testing, defects, security reviews, compliance evidence, and release approvals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <ShieldCheck className="w-4 h-4" />
            Start Security Review
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <FileCheck className="w-4 h-4" />
            Create Test Plan
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Create Bug
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-accent hover:bg-accent/10 gap-2">
            <Bot className="w-4 h-4" />
            Ask DevPilot AI
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

      {/* Top Controls */}
      <div className="p-3 border border-border bg-surface-hover flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder={`SEARCH ${activeTab.toUpperCase()}...`} className="w-full h-8 pl-8 pr-3 bg-background border border-border text-[10px] font-mono uppercase focus:outline-none focus:border-foreground transition-colors" />
          </div>
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border bg-background">
            <Filter className="w-3 h-3 mr-2" /> Filters
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex gap-6">
        
        {/* Left Column (Table) */}
        <div className="flex-1 min-w-0 border border-border bg-background flex flex-col overflow-hidden">
          <div className="overflow-auto flex-1 scrollbar-thin">
            <table className="w-full text-left text-sm font-mono border-collapse whitespace-nowrap">
              <thead className="sticky top-0 bg-surface-hover z-10 shadow-[0_1px_0_0_var(--border)]">
                {activeTab === 'Bugs' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Bug ID</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Title</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Severity / Priority</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Project</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Environment</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Assignee</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Task/Release</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Created</th>
                  </tr>
                )}
                {activeTab === 'QA Testing' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Test Plan</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Project / Release</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Automated Tests</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Manual Tests</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Pass/Fail Ratio</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Regression Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">UAT Sign-off</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Owner</th>
                  </tr>
                )}
                {activeTab === 'Security Reviews' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Security Review</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Project</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Risk Score</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Vulnerabilities</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Owner</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Due Date</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Evidence</th>
                  </tr>
                )}
                {activeTab === 'Compliance' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Control</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Requirement</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Project</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Owner</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Due Date</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Approval State</th>
                  </tr>
                )}
                {activeTab === 'Approvals' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Approval Chain</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Type</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Decision</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Approver</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Comments</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Timestamp</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-border">
                {activeTab === 'Bugs' && mockBugs.map((bug) => (
                  <tr key={bug.id} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="text-[10px] bg-surface border border-border px-1.5 py-0.5 inline-flex text-muted-foreground">
                        {bug.id}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Bug className={`w-4 h-4 ${bug.severity === 'Critical' ? 'text-destructive' : 'text-muted-foreground'}`} />
                        <span className="font-sans font-bold text-sm truncate max-w-[200px] group-hover:underline decoration-border underline-offset-4">{bug.title}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={getSeverityColor(bug.severity)}>{bug.severity}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className="font-bold">{bug.priority}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs">{bug.project}</td>
                    <td className="p-3 text-xs">{bug.env}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(bug.status)} uppercase tracking-widest`}>
                        {bug.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-surface border border-border flex items-center justify-center font-mono text-[9px] uppercase">{bug.assignee !== 'Unassigned' ? bug.assignee.charAt(0) : '?'}</div>
                        <span className="text-xs">{bug.assignee}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs">{bug.task}</div>
                      <div className="text-[10px] text-muted-foreground">{bug.release}</div>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{bug.created}</td>
                  </tr>
                ))}
                
                {activeTab === 'QA Testing' && mockQA.map((qa, i) => (
                  <tr key={i} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-accent" />
                        <span className="font-sans font-bold text-sm group-hover:underline decoration-border underline-offset-4">{qa.plan}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs">{qa.project}</div>
                      <div className="text-[10px] text-muted-foreground">{qa.release}</div>
                    </td>
                    <td className="p-3 text-xs">{qa.automated}</td>
                    <td className="p-3 text-xs">{qa.manual}</td>
                    <td className="p-3">
                      <span className="font-bold text-sm">{qa.ratio}</span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(qa.regression)} uppercase tracking-widest`}>
                        {qa.regression}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(qa.uat)} uppercase tracking-widest`}>
                        {qa.uat}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{qa.owner}</td>
                  </tr>
                ))}

                {activeTab === 'Security Reviews' && mockSecurity.map((sec, i) => (
                  <tr key={i} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className={`w-4 h-4 ${sec.score.includes('High') ? 'text-destructive' : 'text-emerald-500'}`} />
                        <span className="font-sans font-bold text-sm group-hover:underline decoration-border underline-offset-4">{sec.review}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs">{sec.project}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(sec.status)} uppercase tracking-widest`}>
                        {sec.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs font-bold">{sec.score}</td>
                    <td className="p-3 text-xs">{sec.vulns}</td>
                    <td className="p-3 text-xs">{sec.owner}</td>
                    <td className="p-3 text-xs text-muted-foreground">{sec.due}</td>
                    <td className="p-3 text-xs flex items-center gap-1"><Link2 className="w-3 h-3"/> {sec.evidence}</td>
                  </tr>
                ))}

                {activeTab === 'Compliance' && mockCompliance.map((comp, i) => (
                  <tr key={i} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="text-[10px] bg-surface border border-border px-1.5 py-0.5 inline-flex font-bold">
                        {comp.control}
                      </div>
                    </td>
                    <td className="p-3 font-sans text-sm">{comp.requirement}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(comp.status)} uppercase tracking-widest`}>
                        {comp.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{comp.project}</td>
                    <td className="p-3 text-xs">{comp.owner}</td>
                    <td className="p-3 text-xs text-muted-foreground">{comp.due}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(comp.approval)} uppercase tracking-widest`}>
                        {comp.approval}
                      </span>
                    </td>
                  </tr>
                ))}

                {activeTab === 'Approvals' && mockApprovals.map((app, i) => (
                  <tr key={i} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="font-sans font-bold text-sm">{app.chain}</div>
                    </td>
                    <td className="p-3 text-xs">{app.type}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(app.decision)} uppercase tracking-widest`}>
                        {app.decision}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{app.approver}</td>
                    <td className="p-3 text-xs truncate max-w-[250px]">{app.comments}</td>
                    <td className="p-3 text-xs text-muted-foreground">{app.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-3 border-t border-border bg-surface-hover flex justify-between items-center text-[10px] font-mono text-muted-foreground flex-shrink-0">
            <span>Showing {activeTab} data</span>
          </div>
        </div>

        {/* Right Column (Release Readiness & AI) */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-6">
          
          {/* Release Readiness Panel */}
          <div className="border border-border bg-background flex flex-col">
            <div className="p-4 border-b border-border bg-surface-hover">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Release Readiness
              </h3>
              <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-widest">Target: REL-42</p>
            </div>
            <div className="p-4 space-y-4">
              {[
                { label: 'Development Complete', status: 'done' },
                { label: 'Code Review Complete', status: 'done' },
                { label: 'QA Passed', status: 'pending' },
                { label: 'Security Approved', status: 'pending' },
                { label: 'Compliance Approved', status: 'blocked' },
                { label: 'Release Manager Approved', status: 'pending' },
              ].map((step, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    {step.status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {step.status === 'pending' && <div className="w-4 h-4 border border-border rounded-full" />}
                    {step.status === 'blocked' && <XCircle className="w-4 h-4 text-destructive" />}
                    <span className={step.status === 'blocked' ? 'text-destructive font-bold' : step.status === 'done' ? 'text-muted-foreground line-through' : 'text-foreground font-bold'}>
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border bg-surface-hover">
              <Button className="w-full h-8 rounded-none text-[10px] font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
                Request Missing Approvals
              </Button>
            </div>
          </div>

          {/* AI Assistant Panel */}
          <div className="border border-accent/30 bg-accent/5 relative overflow-hidden flex-1 flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />
            <div className="p-4 border-b border-accent/20 bg-accent/10 flex items-center gap-2">
              <Bot className="w-4 h-4 text-accent" />
              <h2 className="font-mono text-[10px] uppercase tracking-widest font-bold text-foreground">DevPilot QA & Sec</h2>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
              <div className="text-sm text-foreground/80 leading-relaxed">
                <p className="mb-2">Release 42 is <span className="font-bold text-destructive">blocked</span>.</p>
                <p>There is 1 critical bug (BUG-402) open in Staging. Compliance approval is pending SOC2 evidence for access logs. Security review requires threat model updates.</p>
              </div>
              <div className="space-y-2 mt-auto">
                <Button variant="outline" size="sm" className="w-full justify-start h-8 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-accent/50 text-accent hover:bg-accent hover:text-background text-left">
                  Draft Remediation Tasks
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background text-left">
                  Summarize Compliance Gaps
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 px-3 rounded-none text-[10px] font-mono uppercase tracking-widest border-border hover:bg-foreground hover:text-background text-left">
                  Identify Release Risk
                </Button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
