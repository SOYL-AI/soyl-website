'use client'
import { cn } from '@/lib/utils'

type Card = {
  caption: string
  title: string
  description: string
  body: React.ReactNode
}

const ROOM_STATES = [
  // Hand-tuned spread of 30 squares: occupied / clean / dirty / arriving.
  // Real PMS screenshots will replace this — keep the visual rhythm believable.
  'occ', 'clean', 'occ', 'occ', 'dirty', 'clean', 'occ', 'arriving', 'occ', 'clean',
  'occ', 'dirty', 'clean', 'occ', 'occ', 'arriving', 'clean', 'occ', 'dirty', 'occ',
  'clean', 'occ', 'arriving', 'occ', 'clean', 'occ', 'dirty', 'occ', 'clean', 'occ',
] as const

const ROOM_STATE_CLASS: Record<typeof ROOM_STATES[number], string> = {
  occ: 'bg-mint/40',
  clean: 'bg-mint/15 border border-mint/30',
  dirty: 'bg-graphite/40',
  arriving: 'bg-mint',
}

function DashboardMockup() {
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mint" />
          <span className="font-heading font-semibold text-sm text-soyl-white">Maple Boutique</span>
          <span className="text-graphite/60 text-xs">· 30 rooms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
          <span className="text-mint/70 text-[10px] font-mono uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Room grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-10 gap-1.5">
          {ROOM_STATES.map((state, i) => (
            <div key={i} className={cn('w-4 h-4 rounded-sm', ROOM_STATE_CLASS[state])} />
          ))}
        </div>
      </div>

      {/* Stat strip */}
      <div className="flex items-center justify-between gap-3 text-[10px] font-mono">
        <div className="flex flex-col">
          <span className="text-soyl-white text-sm font-bold">12</span>
          <span className="text-graphite/60 uppercase tracking-widest">Active calls</span>
        </div>
        <div className="w-px h-8 bg-mint/10" />
        <div className="flex flex-col">
          <span className="text-soyl-white text-sm font-bold">47</span>
          <span className="text-graphite/60 uppercase tracking-widest">Resolved</span>
        </div>
        <div className="w-px h-8 bg-mint/10" />
        <div className="flex flex-col">
          <span className="text-mint text-sm font-bold">3</span>
          <span className="text-graphite/60 uppercase tracking-widest">Needs human</span>
        </div>
      </div>
    </div>
  )
}

function TranscriptMockup() {
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-mint/70 text-[10px] font-mono uppercase tracking-widest">Call · Room 214</span>
        <span className="text-graphite/50 text-[10px] font-mono">00:42</span>
      </div>

      {/* Transcript bubbles */}
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className="self-start max-w-[78%]">
          <span className="text-graphite/60 text-[9px] font-mono uppercase tracking-widest block mb-1">Guest</span>
          <div className="bg-elevated border border-mint/10 rounded-lg px-3 py-2 text-xs text-soyl-white">
            Can I push my checkout to 2pm tomorrow?
          </div>
        </div>
        <div className="self-end max-w-[78%]">
          <span className="text-mint text-[9px] font-mono uppercase tracking-widest block mb-1 text-right">Butler</span>
          <div className="bg-mint/10 border border-mint/25 rounded-lg px-3 py-2 text-xs text-soyl-white">
            Done. 2pm checkout confirmed for room 214.
          </div>
        </div>
        <div className="self-start max-w-[78%]">
          <span className="text-graphite/60 text-[9px] font-mono uppercase tracking-widest block mb-1">Guest</span>
          <div className="bg-elevated border border-mint/10 rounded-lg px-3 py-2 text-xs text-soyl-white">
            Thanks!
          </div>
        </div>
      </div>

      {/* Intent pill */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-graphite/50 text-[10px] font-mono uppercase tracking-widest">Intent extracted</span>
        <span className="text-mint text-[10px] font-mono uppercase tracking-widest border border-mint/30 px-2 py-0.5 rounded-full bg-mint/5">
          Late Checkout
        </span>
      </div>
    </div>
  )
}

const TIMELINE = [
  { time: '10:42', agent: 'Concierge', body: 'Fielded inbound query · room 214' },
  { time: '10:42', agent: 'Booking', body: 'Extended checkout to 2pm' },
  { time: '10:43', agent: 'Notification', body: 'Alerted housekeeping' },
]

function AgentTimelineMockup() {
  return (
    <div className="absolute inset-0 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-mint/70 text-[10px] font-mono uppercase tracking-widest">Agent activity</span>
        <span className="text-graphite/50 text-[10px] font-mono">Last 60s</span>
      </div>

      <div className="relative flex-1 pl-4">
        {/* Timeline line */}
        <div className="absolute left-1.5 top-1 bottom-1 w-px bg-mint/30" />

        <div className="flex flex-col gap-3">
          {TIMELINE.map((step, i) => (
            <div key={i} className="relative flex items-start gap-3">
              {/* Dot */}
              <div className="absolute -left-3 top-1 w-2 h-2 rounded-full bg-mint border-2 border-obsidian" />
              <span className="text-graphite/60 text-[10px] font-mono w-10 shrink-0 mt-0.5">{step.time}</span>
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-mint text-[10px] font-mono uppercase tracking-widest border border-mint/25 px-2 py-0.5 rounded-full bg-mint/5 self-start">
                  {step.agent}
                </span>
                <span className="text-soyl-white text-xs leading-snug">{step.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CARDS: Card[] = [
  {
    caption: '01 · Dashboard',
    title: 'Live operations dashboard',
    description: 'Property-wide view: occupancy, requests, things needing a human.',
    body: <DashboardMockup />,
  },
  {
    caption: '02 · Transcript',
    title: 'Live voice transcript',
    description: 'Every guest call, transcribed and intent-tagged in real time.',
    body: <TranscriptMockup />,
  },
  {
    caption: '03 · Agents',
    title: 'Multi-agent activity',
    description: 'Watch concierge, booking, and notification agents hand off.',
    body: <AgentTimelineMockup />,
  },
]

export default function PMSScreenshotsPanel() {
  return (
    <div className="flex flex-col gap-6">
      {CARDS.map(card => (
        <div
          key={card.caption}
          className="bg-card-bg border border-mint/10 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          {/* Mockup surface */}
          <div className="relative aspect-[16/10] bg-obsidian/60 border-b border-mint/10">
            {card.body}
          </div>

          {/* Caption + title */}
          <div className="p-5">
            <span className="text-mint text-[10px] font-mono uppercase tracking-widest block mb-1.5">
              {card.caption}
            </span>
            <h3 className="font-heading font-semibold text-base text-soyl-white mb-1">
              {card.title}
            </h3>
            <p className="text-graphite text-xs leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
