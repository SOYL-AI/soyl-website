'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Message = { role: 'user' | 'assistant'; content: string }
type UIState = 'idle' | 'recording' | 'processing'

export default function SpeakInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [history, setHistory] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [uiState, setUiState] = useState<UIState>('idle')
  const [micAvailable, setMicAvailable] = useState(true)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) setMicAvailable(false)
  }, [])

  async function sendText() {
    const query = input.trim()
    if (!query || uiState !== 'idle') return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: query }])
    setUiState('processing')

    try {
      const res = await fetch('/api/agent/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, history }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail ?? 'Agent error')
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      setHistory(data.history)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', content: msg }])
    } finally {
      setUiState('idle')
    }
  }

  const startRecording = useCallback(async () => {
    if (uiState !== 'idle') return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      audioChunksRef.current = []
      recorder.ondataavailable = e => audioChunksRef.current.push(e.data)
      recorder.start()
      mediaRecorderRef.current = recorder
      setUiState('recording')
    } catch {
      setMicAvailable(false)
    }
  }, [uiState])

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current
    if (!recorder || recorder.state === 'inactive') return

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      recorder.stream.getTracks().forEach(t => t.stop())
      setUiState('processing')

      const formData = new FormData()
      formData.append('audio', audioBlob, 'audio.webm')
      formData.append('history', JSON.stringify(history))

      try {
        const res = await fetch('/api/agent/audio', { method: 'POST', body: formData })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail ?? 'Audio processing error')

        if (data.transcription) {
          setMessages(prev => [...prev, { role: 'user', content: data.transcription }])
        }
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }])
        setHistory(data.history)

        if (data.audio_base64) {
          const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`)
          audio.play().catch(() => {})
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Audio processing failed. Try again.'
        setMessages(prev => [...prev, { role: 'assistant', content: msg }])
      } finally {
        setUiState('idle')
      }
    }

    recorder.stop()
  }, [history])

  const statusLabel: Record<UIState, string> = {
    idle: messages.length === 0 ? 'Ask me anything.' : 'Listening...',
    recording: 'Recording — release to send.',
    processing: 'Processing...',
  }

  const orbDuration = uiState === 'recording' ? 0.7 : uiState === 'processing' ? 1.1 : 2

  return (
    <div className="w-full max-w-3xl px-4">
      <div className="bg-card-bg border border-mint/10 rounded-lg overflow-hidden flex flex-col">

        {/* Transcript */}
        <div className="min-h-[480px] max-h-[60vh] overflow-y-auto p-6 flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 py-16">
              {/* Orb */}
              <div className="relative flex items-center justify-center w-24 h-24">
                {/* Ripple rings */}
                {!prefersReduced && (uiState === 'recording' || uiState === 'processing') && (
                  <>
                    {[0, 0.4, 0.8].map((delay, i) => (
                      <motion.div
                        key={i}
                        className={cn('absolute rounded-full border', uiState === 'recording' ? 'border-red-400/30' : 'border-mint/20')}
                        initial={{ width: 96, height: 96, opacity: 0.6 }}
                        animate={{ width: 96 + 60, height: 96 + 60, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay, ease: 'easeOut' }}
                      />
                    ))}
                  </>
                )}
                <motion.div
                  className={cn(
                    'w-20 h-20 rounded-full border-2 flex items-center justify-center',
                    uiState === 'recording' ? 'border-red-400 bg-red-400/5' : 'border-mint bg-mint/5'
                  )}
                  animate={prefersReduced ? {} : {
                    scale: [1, uiState === 'recording' ? 1.14 : 1.06, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: orbDuration, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {uiState === 'processing' && (
                    <motion.div
                      className="w-5 h-5 border-2 border-mint border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </motion.div>
              </div>
              <p className="text-graphite text-sm tracking-wide">{statusLabel[uiState]}</p>
            </div>
          ) : (
            <>
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] px-4 py-3 rounded-lg text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-elevated border border-mint/20 text-soyl-white'
                          : 'bg-obsidian border border-mint/8 text-soyl-white'
                      )}
                    >
                      {msg.role === 'assistant' && (
                        <span className="text-mint text-xs tracking-[0.15em] uppercase block mb-1.5 font-caption">Butler</span>
                      )}
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {uiState === 'processing' && (
                <motion.div
                  initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-obsidian border border-mint/8 px-4 py-3 rounded-lg flex items-center gap-1.5">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-mint/50"
                        animate={prefersReduced ? {} : { opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input bar */}
        <div className="border-t border-mint/10 p-4 flex gap-3 items-center bg-elevated">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendText()}
            placeholder="Ask Butler anything..."
            disabled={uiState !== 'idle'}
            className="flex-1 bg-obsidian border border-mint/10 rounded px-4 py-2.5 text-sm text-soyl-white placeholder:text-graphite/50 focus:outline-none focus:border-mint/30 transition-colors disabled:opacity-40"
          />

          <button
            onClick={sendText}
            disabled={uiState !== 'idle' || !input.trim()}
            className="px-4 py-2.5 text-sm border border-mint text-mint rounded hover:bg-mint hover:text-obsidian transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-mint shrink-0"
          >
            Send
          </button>

          {micAvailable && (
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={e => { e.preventDefault(); startRecording() }}
              onTouchEnd={e => { e.preventDefault(); stopRecording() }}
              disabled={uiState === 'processing'}
              aria-label={uiState === 'recording' ? 'Release to send audio' : 'Hold to record audio'}
              className={cn(
                'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed',
                uiState === 'recording'
                  ? 'border-red-400 bg-red-400/10 text-red-400'
                  : 'border-mint/40 text-mint hover:border-mint hover:bg-mint/10'
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-graphite/40 text-xs mt-4 tracking-wide">
        Butler is powered by SOYL AI&apos;s voice and RAG pipeline — responses are grounded in our hospitality knowledge base.
      </p>
    </div>
  )
}
