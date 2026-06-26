'use client';
import { Logo } from '@/components/logo';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bell, 
  Search, 
  Plus, 
  Bot, 
  LayoutDashboard, 
  Briefcase, 
  Inbox, 
  Calendar, 
  Layers, 
  KanbanSquare, 
  CheckSquare, 
  GitBranch, 
  ShieldCheck, 
  FileText, 
  BarChart3, 
  Settings,
  Users,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion } from 'motion/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navGroups = [
    {
      title: 'Main_SYS',
      items: [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Work', href: '/dashboard/my-work', icon: Briefcase },
        { name: 'Inbox', href: '/dashboard/inbox', icon: Inbox },
        { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
      ]
    },
    {
      title: 'Ops_MGT',
      items: [
        { name: 'Projects', href: '/dashboard/projects', icon: Layers },
        { name: 'Sprints', href: '/dashboard/sprints', icon: KanbanSquare },
        { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
      ]
    },
    {
      title: 'Eng_Core',
      items: [
        { name: 'Repositories', href: '/dashboard/repositories', icon: GitBranch },
        { name: 'QA & Security', href: '/dashboard/qa-security', icon: ShieldCheck },
        { name: 'Incidents', href: '/dashboard/incidents', icon: AlertCircle },
      ]
    },
    {
      title: 'Data_Knowledge',
      items: [
        { name: 'Documents', href: '/dashboard/documents', icon: FileText },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
      ]
    },
    {
      title: 'Admin_Level',
      items: [
        { name: 'Teams', href: '/dashboard/teams', icon: Users },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-200 font-sans selection:bg-foreground selection:text-background">
      {/* Sidebar */}
      <aside className="w-64 bg-background text-muted-foreground flex flex-col flex-shrink-0 border-r border-border transition-colors duration-200">
        <div className="h-16 flex items-center px-6 border-b border-border text-foreground">
          <Link href="/" className="font-bold text-sm tracking-tight flex items-center gap-3">
            <Logo width={24} height={24} />
              <span className="uppercase tracking-widest text-xs">HANDOFF</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-thin">
          {navGroups.map((group, i) => (
            <div key={i}>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest mb-3 px-2 text-muted-foreground">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item, j) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={j}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                        active 
                          ? 'bg-foreground text-background font-bold border border-foreground' 
                          : 'hover:bg-surface-hover text-muted-foreground hover:text-foreground border border-transparent'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-surface-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-background border border-border flex items-center justify-center text-foreground font-mono text-xs font-bold rounded-none">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-foreground font-bold uppercase tracking-widest truncate">John Doe</div>
              <div className="font-mono text-[10px] uppercase tracking-widest truncate text-muted-foreground mt-1">Apex_Financial</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-8 flex-shrink-0 transition-colors duration-200 z-10">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative w-96">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <input 
                 type="text" 
                 placeholder="SEARCH QUERY... (CTRL+K)" 
                 className="w-full h-9 pl-10 pr-4 text-xs font-mono uppercase tracking-widest bg-surface-hover border border-border rounded-none focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all text-foreground placeholder:text-muted-foreground"
               />
             </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="h-9 px-4 gap-2 border-border text-xs font-mono uppercase tracking-widest text-foreground rounded-none hover:bg-surface-hover hover:text-foreground">
              <Bot className="w-4 h-4 text-accent" />
              Intelligence
            </Button>
            <div className="w-px h-5 bg-border mx-2" />
            <Button size="sm" className="h-9 px-6 gap-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-foreground/90 rounded-none">
              <Plus className="w-4 h-4" />
              Init_Task
            </Button>
            <button className="relative w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-hover rounded-none transition-colors border border-transparent hover:border-border">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-foreground rounded-none" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background transition-colors duration-200 relative">
          <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>
          <div className="mx-auto max-w-7xl p-8 relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

