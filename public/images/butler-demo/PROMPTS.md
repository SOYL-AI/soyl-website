# Butler AI demo screenshot prompts (for Midjourney / Runway)

## 01-dashboard.png  (target 1600x1000)
> Hotel property management dashboard, dark UI, obsidian background #030709,
> mint accent #AFD0CC, minimalist editorial layout, hotel name "Maple Boutique"
> at top, grid of 30 small room cards showing occupancy states, sidebar with
> stats (active calls, resolved requests), modern Linear-style design,
> high information density but clean, no logos, anonymized data — UI screenshot

## 02-transcript.png  (target 1600x1000)
> Live voice transcript panel for hotel AI concierge, dark mode, obsidian
> background #030709, mint accent #AFD0CC, alternating message bubbles
> labeled "Guest" and "Butler", small AI sentiment indicator pills, intent
> extraction strip at bottom showing "Intent: Late Checkout", clean monospace
> timestamps, modern minimalist UI, no logos — UI screenshot

## 03-agents.png  (target 1600x1000)
> Multi-agent activity timeline UI, dark obsidian #030709 background,
> mint #AFD0CC accent line, vertical timeline showing agent handoffs
> (Concierge agent, Booking agent, Notification agent), small role pills,
> timestamps, clean editorial layout, modern dashboard aesthetic, no logos
> — UI screenshot

---

When real images land, swap the React mockups in
`src/components/products/butler-demo/PMSScreenshotsPanel.tsx` for `<Image>`
tags pointing at `/images/butler-demo/01-dashboard.png` etc.
