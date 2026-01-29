'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = { role: 'user' | 'assistant'; content: string }

export default function AssistantChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMessage: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    try {
      const history = [...messages, userMessage].map((m) => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      if (!res.ok) {
        const errMsg = data?.error || 'Something went wrong. Please try the Contact form or email.'
        setMessages((prev) => [...prev, { role: 'assistant', content: errMsg }])
        return
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message || 'No response.' }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Network error. Please try again or use the Contact form.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md rounded-xl border border-gray-200 bg-white shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(70vh, 520px)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">Community Assistant</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded hover:bg-white/20 transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 px-4 py-2 bg-gray-50 border-b border-gray-100">
              Ask about Ikoha Community, events, contacts, or how to report an issue.
            </p>
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-6 px-2">
                  <Bot className="w-10 h-10 mx-auto mb-2 text-primary/50" />
                  <p>Ask a question or describe an issue.</p>
                  <p className="mt-1">e.g. &quot;When is the festival?&quot;, &quot;What is 2+2?&quot;, or any question. Add GROQ_API_KEY (free at console.groq.com) for full ChatGPT-like answers.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${
                      m.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-2 bg-gray-100 text-gray-500 text-sm inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking…
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loading}
                aria-label="Message"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                className="rounded-lg bg-primary hover:bg-primary-dark text-white p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-24 z-50 flex items-center gap-2 rounded-full bg-accent hover:bg-accent-dark text-white shadow-xl px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Open Community Assistant"
            title="Ask AI Assistant"
          >
            <Bot className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Ask AI</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
