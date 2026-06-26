'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  Bot, 
  GitBranch, 
  GitPullRequest, 
  GitCommit, 
  Activity, 
  Server, 
  Cloud,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  MoreVertical,
  Link2,
  ArrowRight,
  TerminalSquare,
  Box,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const tabs = [
  'Repositories',
  'Pull Requests',
  'Commits',
  'CI/CD',
  'Environments',
  'Deployments'
];

const mockRepositories = [
  { id: 'repo-1', name: 'payments-core', owner: 'Payments Team', branch: 'main', project: 'UPI Refund System', prs: 4, commit: 'a1b2c3d', build: 'Passing', deploy: 'Prod v2.1', health: 'Healthy' },
  { id: 'repo-2', name: 'ledger-api', owner: 'Platform', branch: 'master', project: 'Core Engine V2', prs: 1, commit: '8f9e0a1', build: 'Failing', deploy: 'Staging', health: 'At Risk' },
  { id: 'repo-3', name: 'mobile-ios', owner: 'Mobile Team', branch: 'main', project: 'Mobile Banking', prs: 8, commit: 'c4d5e6f', build: 'Passing', deploy: 'TestFlight', health: 'Healthy' },
  { id: 'repo-4', name: 'auth-service', owner: 'Security', branch: 'main', project: 'Auth V2', prs: 0, commit: '7b8a9c0', build: 'Passing', deploy: 'Prod v1.8', health: 'Healthy' },
];

const mockPRs = [
  { id: 'pr-482', title: 'feat: webhook retry engine', repo: 'payments-core', author: 'S. Chen', reviewers: ['T. Vance'], task: 'PAY-231', build: 'Passing', tests: '124/124', status: 'Open', files: 12, risk: 'Medium', created: '2h ago' },
  { id: 'pr-485', title: 'fix: idempotency key validation', repo: 'payments-core', author: 'M. Johnson', reviewers: ['R. Gupta'], task: 'PAY-234', build: 'Passing', tests: '125/125', status: 'Approved', files: 3, risk: 'Low', created: '5h ago' },
  { id: 'pr-102', title: 'feat: offline transaction sync', repo: 'mobile-ios', author: 'E. Wright', reviewers: [], task: 'MOB-890', build: 'Failing', tests: '89/92', status: 'Draft', files: 45, risk: 'High', created: '1d ago' },
];

const mockCommits = [
  { hash: 'a1b2c3d', author: 'S. Chen', branch: 'feat/webhook-retry', message: 'add exponential backoff to webhook dispatcher', task: 'PAY-231', date: '1h ago' },
  { hash: '8f9e0a1', author: 'L. Davis', branch: 'fix/ledger-export', message: 'resolve race condition in export worker', task: 'PAY-239', date: '3h ago' },
  { hash: 'c4d5e6f', author: 'E. Wright', branch: 'feat/offline-mode', message: 'WIP: local database schema for sync', task: 'MOB-890', date: '1d ago' },
];

const mockPipelines = [
  { id: 'ci-8901', pipeline: 'payments-core-ci', branch: 'feat/webhook-retry', trigger: 'push', status: 'Success', duration: '4m 12s', failedJobs: 0, tests: '124/124', env: '-', time: '1h ago' },
  { id: 'ci-8900', pipeline: 'ledger-api-deploy', branch: 'main', trigger: 'merge', status: 'Failed', duration: '12m 45s', failedJobs: 1, tests: '80/80', env: 'Staging', time: '3h ago' },
  { id: 'ci-8899', pipeline: 'mobile-ios-test', branch: 'feat/offline-mode', trigger: 'pr', status: 'Failed', duration: '8m 20s', failedJobs: 2, tests: '89/92', env: '-', time: '1d ago' },
];

const mockEnvironments = [
  { name: 'Production', version: 'v2.1.4', deployed: 'Oct 10, 2026', health: 'Healthy', owner: 'SRE Team', rollback: 'v2.1.3 (Ready)', release: 'REL-42' },
  { name: 'Staging', version: 'v2.2.0-rc1', deployed: '2 hours ago', health: 'Degraded', owner: 'QA Team', rollback: 'v2.1.4 (Ready)', release: 'REL-43-RC' },
  { name: 'Development', version: 'v2.2.0-dev', deployed: '15 mins ago', health: 'Healthy', owner: 'Dev Team', rollback: 'Auto', release: '-' },
];

const mockDeployments = [
  { id: 'dep-992', project: 'Payments', env: 'Development', version: 'v2.2.0-dev', status: 'Success', trigger: 'Auto (merge)', time: '15m ago', rollback: 'Available' },
  { id: 'dep-991', project: 'Ledger API', env: 'Staging', version: 'v1.9.0-rc2', status: 'Failed', trigger: 'Manual (L. Davis)', time: '3h ago', rollback: 'Initiated' },
  { id: 'dep-990', project: 'Mobile App', env: 'Production', version: 'v4.5.1', status: 'Success', trigger: 'Release (REL-41)', time: '2d ago', rollback: 'Available' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Passing':
    case 'Success':
    case 'Approved':
    case 'Healthy':
      return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    case 'Failing':
    case 'Failed':
    case 'At Risk':
    case 'Degraded':
      return 'text-destructive border-destructive bg-destructive/10';
    case 'Draft':
    case 'Open':
    case 'Available':
      return 'text-accent border-accent bg-accent/10';
    default:
      return 'text-foreground border-border bg-surface';
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

export default function RepositoriesPage() {
  const [activeTab, setActiveTab] = useState('Repositories');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-80px)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Engineering</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Repositories</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            Engineering
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            Connect delivery work to repositories, pull requests, pipelines, environments, and deployments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <TerminalSquare className="w-4 h-4" />
            Deployment Logs
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Rocket className="w-4 h-4" />
            Create Release
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Link2 className="w-4 h-4" />
            Connect Repository
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

      {/* Main Content */}
      <div className="flex-1 min-h-0 flex gap-6">
        <div className="flex-1 min-w-0 border border-border bg-background flex flex-col overflow-hidden">
          <div className="overflow-auto flex-1 scrollbar-thin">
            <table className="w-full text-left text-sm font-mono border-collapse whitespace-nowrap">
              <thead className="sticky top-0 bg-surface-hover z-10 shadow-[0_1px_0_0_var(--border)]">
                {activeTab === 'Repositories' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Repository</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Owner</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Project</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Branch</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Latest Commit</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">PRs</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Build</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Deploy</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Health</th>
                  </tr>
                )}
                {activeTab === 'Pull Requests' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Pull Request</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Repository</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Author</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Reviewers</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Linked Task</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Build/Tests</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Changed</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Risk</th>
                  </tr>
                )}
                {activeTab === 'Commits' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Commit</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Message</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Author</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Branch</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Task</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Date</th>
                  </tr>
                )}
                {activeTab === 'CI/CD' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Pipeline</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Branch/Trigger</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Duration</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Tests</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Environment</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Time</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal"></th>
                  </tr>
                )}
                {activeTab === 'Environments' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Environment</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Health</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Version</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Last Deployed</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Owner</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Release</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Rollback</th>
                  </tr>
                )}
                {activeTab === 'Deployments' && (
                  <tr>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Deployment</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Status</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Project</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Environment</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Version</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Triggered By</th>
                    <th className="p-3 text-[10px] uppercase tracking-widest text-muted-foreground font-normal">Time</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-border">
                {activeTab === 'Repositories' && mockRepositories.map((repo) => (
                  <tr key={repo.id} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans font-bold text-sm">{repo.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs">{repo.owner}</td>
                    <td className="p-3 text-xs">{repo.project}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-[10px] bg-surface border border-border px-1.5 py-0.5 inline-flex">
                        <GitBranch className="w-3 h-3" /> {repo.branch}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-[10px] bg-surface border border-border px-1.5 py-0.5 inline-flex">
                        <GitCommit className="w-3 h-3" /> {repo.commit}
                      </div>
                    </td>
                    <td className="p-3 text-xs">{repo.prs} open</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(repo.build)} uppercase tracking-widest`}>
                        {repo.build}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{repo.deploy}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(repo.health)} uppercase tracking-widest`}>
                        {repo.health}
                      </span>
                    </td>
                  </tr>
                ))}
                
                {activeTab === 'Pull Requests' && mockPRs.map((pr) => (
                  <tr key={pr.id} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <GitPullRequest className="w-4 h-4 text-accent" />
                        <span className="font-sans font-bold text-sm group-hover:underline decoration-border underline-offset-4">{pr.title}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">{pr.id} • {pr.created}</div>
                    </td>
                    <td className="p-3 text-xs">{pr.repo}</td>
                    <td className="p-3 text-xs">{pr.author}</td>
                    <td className="p-3 text-xs">{pr.reviewers.length ? pr.reviewers.join(', ') : 'None'}</td>
                    <td className="p-3">
                      <span className="text-[10px] bg-surface border border-border px-1.5 py-0.5 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
                        {pr.task}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(pr.status)} uppercase tracking-widest`}>
                        {pr.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-none ${pr.build === 'Passing' ? 'bg-emerald-500' : 'bg-destructive'}`} />
                        <span className="text-xs">{pr.tests}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs">{pr.files} files</td>
                    <td className="p-3">
                      <span className={`font-bold text-[10px] uppercase tracking-widest ${getRiskColor(pr.risk)}`}>{pr.risk}</span>
                    </td>
                  </tr>
                ))}

                {activeTab === 'Commits' && mockCommits.map((commit) => (
                  <tr key={commit.hash} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-[10px] bg-surface border border-border px-1.5 py-0.5 inline-flex text-muted-foreground group-hover:text-foreground">
                        <GitCommit className="w-3 h-3" /> {commit.hash}
                      </div>
                    </td>
                    <td className="p-3 font-sans text-sm">{commit.message}</td>
                    <td className="p-3 text-xs">{commit.author}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-[10px] bg-surface border border-border px-1.5 py-0.5 inline-flex">
                        <GitBranch className="w-3 h-3" /> {commit.branch}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] bg-surface border border-border px-1.5 py-0.5 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
                        {commit.task}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{commit.date}</td>
                  </tr>
                ))}

                {activeTab === 'CI/CD' && mockPipelines.map((pl) => (
                  <tr key={pl.id} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="font-sans text-sm font-bold">{pl.pipeline}</div>
                      <div className="text-[10px] text-muted-foreground">{pl.id}</div>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(pl.status)} uppercase tracking-widest`}>
                        {pl.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="text-xs">{pl.branch}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{pl.trigger}</div>
                    </td>
                    <td className="p-3 text-xs">{pl.duration}</td>
                    <td className="p-3 text-xs">
                      {pl.failedJobs > 0 ? (
                        <span className="text-destructive font-bold">{pl.failedJobs} jobs failed</span>
                      ) : (
                        <span>{pl.tests} passed</span>
                      )}
                    </td>
                    <td className="p-3 text-xs">{pl.env}</td>
                    <td className="p-3 text-xs text-muted-foreground">{pl.time}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-none text-muted-foreground hover:text-foreground">
                        <TerminalSquare className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'Environments' && mockEnvironments.map((env) => (
                  <tr key={env.name} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-muted-foreground" />
                        <span className="font-sans font-bold text-sm">{env.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(env.health)} uppercase tracking-widest`}>
                        {env.health}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] bg-surface border border-border px-1.5 py-0.5">
                        {env.version}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{env.deployed}</td>
                    <td className="p-3 text-xs">{env.owner}</td>
                    <td className="p-3 text-xs">
                      {env.release !== '-' ? (
                        <span className="underline decoration-border underline-offset-4">{env.release}</span>
                      ) : '-'}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{env.rollback}</td>
                  </tr>
                ))}

                {activeTab === 'Deployments' && mockDeployments.map((dep) => (
                  <tr key={dep.id} className="hover:bg-surface-hover group cursor-pointer transition-colors">
                    <td className="p-3">
                      <div className="font-sans text-sm font-bold">{dep.id}</div>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 border ${getStatusColor(dep.status)} uppercase tracking-widest`}>
                        {dep.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{dep.project}</td>
                    <td className="p-3 text-xs">{dep.env}</td>
                    <td className="p-3">
                      <span className="text-[10px] bg-surface border border-border px-1.5 py-0.5">
                        {dep.version}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{dep.trigger}</td>
                    <td className="p-3 text-xs text-muted-foreground">{dep.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-3 border-t border-border bg-surface-hover flex justify-between items-center text-[10px] font-mono text-muted-foreground flex-shrink-0">
            <span>Showing {activeTab} data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
