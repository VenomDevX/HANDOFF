'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft,
  Calendar as CalendarIcon, 
  Plus, 
  Bot, 
  Search, 
  Filter, 
  Layers, 
  Clock, 
  Rocket, 
  Flag, 
  ShieldCheck, 
  User, 
  Users, 
  AlertTriangle, 
  X,
  MoreVertical,
  Link2,
  Bell,
  Repeat,
  ArrowUpRight,
  Eye,
  CheckSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type EventType = 'task' | 'release' | 'milestone' | 'meeting' | 'compliance' | 'leave' | 'incident';

type CalendarEvent = {
  id: string;
  title: string;
  date: number; // Day of the month for mockup
  duration?: number; // Days
  type: EventType;
  time?: string;
  priority?: 'P1' | 'P2' | 'P3';
  project?: string;
};

const mockEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Sprint 42 Planning', date: 2, type: 'meeting', time: '10:00 AM' },
  { id: 'e2', title: 'PAY-231: Retry Logic', date: 4, type: 'task', priority: 'P1', project: 'Payments' },
  { id: 'e3', title: 'Security Audit Q3', date: 5, duration: 3, type: 'compliance' },
  { id: 'e4', title: 'Release v3.8.0', date: 12, type: 'release', project: 'Platform' },
  { id: 'e5', title: 'Frontend Architecture Sync', date: 14, type: 'meeting', time: '2:00 PM' },
  { id: 'e6', title: 'Data Migration Milestone', date: 18, type: 'milestone', project: 'Ledger API' },
  { id: 'e7', title: 'Sarah - OOO', date: 20, duration: 2, type: 'leave' },
  { id: 'e8', title: 'Postmortem: INC-119', date: 22, type: 'incident', time: '11:00 AM' },
  { id: 'e9', title: 'APX-4912: Auth Tokens', date: 25, type: 'task', priority: 'P2', project: 'Auth' },
  { id: 'e10', title: 'End of Sprint 42', date: 28, type: 'milestone' },
];

const layers = [
  { name: 'My Tasks', icon: CheckSquare, active: true },
  { name: 'Team Tasks', icon: Users, active: true },
  { name: 'Sprint Dates', icon: Flag, active: true },
  { name: 'Releases', icon: Rocket, active: true },
  { name: 'Project Milestones', icon: Flag, active: true },
  { name: 'Meetings', icon: Clock, active: true },
  { name: 'Security Reviews', icon: ShieldCheck, active: true },
  { name: 'Compliance Deadlines', icon: ShieldCheck, active: false },
  { name: 'Leave & Holidays', icon: User, active: false },
  { name: 'Incidents & Postmortems', icon: AlertTriangle, active: false },
];

const getEventStyles = (type: EventType) => {
  switch (type) {
    case 'task': return 'border-border bg-surface hover:border-foreground';
    case 'release': return 'border-foreground bg-foreground text-background';
    case 'milestone': return 'border-border bg-surface font-bold border-l-2 border-l-foreground';
    case 'meeting': return 'border-border bg-background border-dashed';
    case 'compliance': return 'border-border bg-surface border-l-2 border-l-accent';
    case 'leave': return 'border-border bg-surface/50 text-muted-foreground italic line-through decoration-muted-foreground/30';
    case 'incident': return 'border-destructive/30 bg-destructive/10 text-destructive';
    default: return 'border-border bg-surface';
  }
};

const getEventIcon = (type: EventType, className: string = "w-3 h-3") => {
  switch (type) {
    case 'release': return <Rocket className={className} />;
    case 'milestone': return <Flag className={className} />;
    case 'meeting': return <Clock className={className} />;
    case 'compliance': return <ShieldCheck className={className} />;
    case 'leave': return <User className={className} />;
    case 'incident': return <AlertTriangle className={className} />;
    case 'task': return <CheckSquare className={className} />;
    default: return null;
  }
};

const getPrioritySymbol = (priority?: string) => {
  if (priority === 'P1') return '!!';
  if (priority === 'P2') return '!';
  return '';
};

export default function CalendarPage() {
  const [view, setView] = useState('Month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Mock calendar grid (5 weeks)
  const daysInMonth = 31;
  const startOffset = 2; // Starts on Wednesday (0=Mon, 1=Tue, 2=Wed)
  const gridCells = Array.from({ length: 35 }, (_, i) => {
    const day = i - startOffset + 1;
    return (day > 0 && day <= daysInMonth) ? day : null;
  });

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 flex-shrink-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
            <span>Overview</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Calendar</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-3 h-3 bg-foreground" />
            Calendar
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            Plan delivery work, releases, team availability, and critical deadlines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-foreground hover:bg-surface-hover gap-2">
            <Plus className="w-4 h-4" />
            Add Deadline
          </Button>
          <Button className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
          <Button variant="outline" className="h-9 px-4 rounded-none text-xs font-mono uppercase tracking-widest border-border text-accent hover:bg-accent/10 gap-2">
            <Bot className="w-4 h-4" />
            Ask DevPilot AI
          </Button>
        </div>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-2 border border-border bg-surface-hover flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-xs font-mono uppercase tracking-widest border-border bg-background">
            Today
          </Button>
          <div className="flex items-center gap-1 bg-background border border-border px-2 h-8">
            <button className="p-1 hover:bg-surface"><ChevronLeft className="w-4 h-4" /></button>
            <span className="font-mono text-xs uppercase px-2 font-bold">October 2026</span>
            <button className="p-1 hover:bg-surface"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex border border-border bg-background">
             {['Day', 'Week', 'Month', 'Agenda'].map((v) => (
               <button 
                 key={v}
                 onClick={() => setView(v)}
                 className={`h-8 px-4 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                   view === v ? 'bg-foreground text-background font-bold' : 'hover:bg-surface text-muted-foreground hover:text-foreground'
                 }`}
               >
                 {v}
               </button>
             ))}
           </div>
        </div>

        <div className="flex items-center gap-2 flex-1 md:justify-end">
           <div className="relative w-48">
             <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
             <input type="text" placeholder="SEARCH EVENTS..." className="w-full h-8 pl-7 pr-3 bg-background border border-border text-[10px] font-mono uppercase focus:outline-none focus:border-foreground" />
           </div>
           <Button variant="outline" size="sm" className="h-8 px-3 rounded-none text-[10px] font-mono uppercase border-border bg-background">
             <Filter className="w-3 h-3 mr-2" /> Filter
           </Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left Column - Layers */}
        <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-2 pb-8 scrollbar-none">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Layers className="w-3 h-3" /> Calendar Layers
          </div>
          <div className="space-y-1">
            {layers.map((layer, i) => (
              <label key={i} className="flex items-center gap-3 p-2 hover:bg-surface-hover cursor-pointer group">
                <div className={`w-3 h-3 border flex items-center justify-center transition-colors ${layer.active ? 'border-foreground bg-foreground' : 'border-border bg-background group-hover:border-foreground'}`}>
                  {layer.active && <div className="w-1.5 h-1.5 bg-background" />}
                </div>
                <layer.icon className="w-3 h-3 text-muted-foreground" />
                <span className={`text-xs font-mono uppercase tracking-wider ${layer.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {layer.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Middle Column - Calendar Grid */}
        <div className="lg:col-span-7 flex flex-col border border-border bg-background min-h-0">
          <div className="grid grid-cols-7 border-b border-border bg-surface-hover">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="p-2 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground border-r border-border last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-5 flex-1 bg-surface/50">
            {gridCells.map((day, i) => (
              <div key={i} className="border-r border-b border-border relative bg-background p-1 flex flex-col gap-1 min-h-[100px]">
                {day && (
                  <>
                    <div className={`text-[10px] font-mono text-right p-1 ${day === new Date().getDate() ? 'text-foreground font-bold underline' : 'text-muted-foreground'}`}>
                      {day}
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-none">
                      {mockEvents.filter(e => e.date === day || (e.duration && e.date <= day && e.date + e.duration > day)).map(event => (
                        <div 
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`px-1.5 py-1 text-[9px] font-mono uppercase border cursor-pointer truncate flex items-center gap-1.5 transition-opacity hover:opacity-80 ${getEventStyles(event.type)}`}
                        >
                          {getEventIcon(event.type)}
                          {event.priority && <span className="font-bold">{getPrioritySymbol(event.priority)}</span>}
                          <span className="truncate flex-1">{event.time ? `${event.time} ` : ''}{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Insights */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 pb-8 scrollbar-none">
          
          {/* AI Insights */}
          <div className="border border-border bg-background relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
            <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Schedule Insights</h3>
              </div>
            </div>
            <div className="p-4 space-y-4 text-sm leading-relaxed text-muted-foreground font-light">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground">Conflict Detected</span>
                  <p className="text-xs mt-1">Sprint Planning overlaps with the Security Audit kickoff on the 5th. Consider rescheduling one of these events.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground">Overloaded Day</span>
                  <p className="text-xs mt-1">Oct 14 has 4 consecutive meetings. No focus time available for task APX-4912.</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-border bg-surface-hover flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-6 px-2 rounded-none text-[9px] font-mono uppercase border-border hover:bg-foreground hover:text-background">
                Resolve Conflicts
              </Button>
              <Button variant="outline" size="sm" className="h-6 px-2 rounded-none text-[9px] font-mono uppercase border-border hover:bg-foreground hover:text-background">
                Suggest Focus Time
              </Button>
            </div>
          </div>

          {/* Upcoming This Week */}
          <div className="border border-border bg-background">
            <div className="p-4 border-b border-border bg-surface-hover">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-foreground" /> Upcoming This Week
              </h3>
            </div>
            <div className="divide-y divide-border">
              {mockEvents.slice(0, 4).map((event, i) => (
                <div key={i} className="p-3 flex items-start gap-3 hover:bg-surface-hover cursor-pointer" onClick={() => setSelectedEvent(event)}>
                  <div className={`mt-0.5 w-6 h-6 flex items-center justify-center border ${getEventStyles(event.type)}`}>
                    {getEventIcon(event.type, "w-3 h-3")}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{event.title}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-widest">
                      Oct {event.date} {event.time ? `• ${event.time}` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Availability */}
          <div className="border border-border bg-background">
            <div className="p-4 border-b border-border bg-surface-hover">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <Users className="w-4 h-4" /> Team Availability
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { name: 'Sarah Chen', status: 'Out of Office (Oct 20-21)', type: 'leave' },
                { name: 'Marcus Johnson', status: 'Available', type: 'active' },
                { name: 'Emily Davis', status: 'In a meeting (until 2PM)', type: 'busy' },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center text-xs font-mono font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-background rounded-full ${
                      user.type === 'active' ? 'bg-emerald-500' : user.type === 'busy' ? 'bg-destructive' : 'bg-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold">{user.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground truncate max-w-[150px]">{user.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Event Detail Drawer */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-[500px] h-full bg-background border-l border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-surface-hover flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 border ${getEventStyles(selectedEvent.type)} flex items-center gap-2`}>
                    {getEventIcon(selectedEvent.type)}
                    {selectedEvent.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 rounded-none border-border">Edit</Button>
                  <button onClick={() => setSelectedEvent(null)} className="p-2 hover:bg-surface border border-transparent hover:border-border transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 tracking-tight">{selectedEvent.title}</h2>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> Date</div>
                      <div>October {selectedEvent.date}, 2026</div>
                    </div>
                    {selectedEvent.time && (
                      <div>
                        <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Time</div>
                        <div>{selectedEvent.time}</div>
                      </div>
                    )}
                    {selectedEvent.duration && (
                      <div>
                        <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Duration</div>
                        <div>{selectedEvent.duration} Days</div>
                      </div>
                    )}
                    {selectedEvent.project && (
                      <div>
                        <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1"><Layers className="w-3 h-3" /> Project</div>
                        <div>{selectedEvent.project}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2">Attendees & Owners</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-surface border border-border flex items-center justify-center text-[10px] font-mono">Y</div>
                      <span className="text-sm">You (Organizer)</span>
                    </div>
                    {selectedEvent.type === 'meeting' && (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-surface border border-border flex items-center justify-center text-[10px] font-mono">S</div>
                          <span className="text-sm text-muted-foreground">Sarah Chen (Accepted)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-surface border border-border flex items-center justify-center text-[10px] font-mono">M</div>
                          <span className="text-sm text-muted-foreground">Marcus Johnson (Pending)</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {selectedEvent.type === 'meeting' && (
                  <div className="space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2">Location</h3>
                    <Button variant="outline" className="w-full justify-start rounded-none border-border font-mono text-xs hover:bg-surface">
                      <Link2 className="w-4 h-4 mr-2" /> Join Video Call
                    </Button>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2">Notes</h3>
                  <div className="text-sm text-muted-foreground font-light leading-relaxed">
                    No additional notes provided for this event.
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold border-b border-border pb-2">Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground"><Bell className="w-4 h-4" /> Reminders</div>
                      <span className="font-mono text-[10px] uppercase px-2 py-1 bg-surface border border-border">10m before</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground"><Repeat className="w-4 h-4" /> Recurrence</div>
                      <span className="font-mono text-[10px] uppercase px-2 py-1 bg-surface border border-border">None</span>
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
