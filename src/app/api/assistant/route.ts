import { NextResponse } from 'next/server'

// General AI assistant; knows Ikoha when relevant
const SYSTEM_PROMPT = `You are a helpful, friendly AI assistant. Your role is to:
- Answer the user's questions: general knowledge, advice, explanations, and more. Be clear, natural, and conversational.
- When the user asks about Ikoha Community (Ikoha, Ovia South-West, Edo State, Nigeria), use this context: location (Ovia South-West LGA, Iguobazuwa ward), annual festival January 1st, contact asenlucky9@gmail.com or the site's Contact form, resources (cocoa, palm oil, granite), and site pages: News (/news), Events, Minerals (/minerals), Projects (/projects), Businesses (/businesses), Contact (/contact).
- Keep answers concise but helpful. Use plain language. If unsure, say so. For official complaints or requests about Ikoha, suggest using the Contact form or email asenlucky9@gmail.com.`

export type AssistantMessage = { role: 'user' | 'assistant' | 'system'; content: string }

const DEFAULT_RESPONSE = `I need an API key to answer questions.

**Free option:** Get a Groq API key at https://console.groq.com. Add to your project's .env.local:
\`GROQ_API_KEY=your_key_here\`

Then restart the dev server.`

function getFallbackResponse(userMessage: string): string {
  const q = userMessage.toLowerCase().trim()
  if (q.length < 2) return DEFAULT_RESPONSE

  // Festival / celebration
  if (q.includes('festival') || q.includes('celebrat') || (q.includes('when') && (q.includes('january') || q.includes('event')))) {
    return 'The Ikoha Annual Festival is held on January 1st each year. For more events, visit the News & Events page on this site.'
  }

  // Contact / email / report / issue / feedback / suggest
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('report') || q.includes('issue') || q.includes('feedback') || q.includes('suggest') || q.includes('complaint') || q.includes('who do i')) {
    return 'You can reach the community by email at asenlucky9@gmail.com or use the Contact form on this website. The team will respond as soon as possible.'
  }

  // Location / where
  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('find ikoha') || (q.includes('ikoha') && q.includes('located'))) {
    return 'Ikoha is in Ovia South-West Local Government Area, Edo State, Nigeria (Iguobazuwa ward, South-South Nigeria).'
  }

  // News & events
  if (q.includes('news') || q.includes('update') || q.includes('announcement')) {
    return 'Check the News & Events page on this site for the latest news, announcements, and updates.'
  }
  if (q.includes('event') || q.includes('meeting') || q.includes('calendar')) {
    return 'Upcoming events and the community calendar are on the News & Events page. You can also register for events there.'
  }

  // Resources / minerals / agriculture
  if (q.includes('mineral') || q.includes('granite') || q.includes('stone') || q.includes('resource')) {
    return 'Ikoha has mineral resources including granite, and agricultural resources like cocoa and palm oil. Visit the Minerals page on this site for more details.'
  }
  if (q.includes('agriculture') || q.includes('cocoa') || q.includes('palm') || q.includes('farm')) {
    return 'Ikoha has rich agricultural resources including cocoa and palm oil. See the Minerals and Resources sections on this site for more.'
  }

  // Forum / discuss / community discussion
  if (q.includes('forum') || q.includes('discuss') || q.includes('talk') || q.includes('join discussion')) {
    return 'You can join community discussions on the Forum page. Create an account or browse threads there.'
  }

  // Gallery / photos / pictures
  if (q.includes('gallery') || q.includes('photo') || q.includes('picture') || q.includes('image')) {
    return 'Community photos and the gallery are on the Gallery page. You can view and share images there.'
  }

  // Heroes / leaders
  if (q.includes('hero') || q.includes('leader') || q.includes('oba') || q.includes('chairman') || q.includes('history')) {
    return "Community leaders and heroes are featured on the Heroes page. Visit it to learn about Ikoha's history and leaders."
  }

  // Projects
  if (q.includes('project') || q.includes('development') || q.includes('construction')) {
    return 'Community development projects are listed on the Projects page. Check there for ongoing and planned initiatives.'
  }

  // Businesses
  if (q.includes('business') || q.includes('local business') || q.includes('shop') || q.includes('opportunit')) {
    return "Local businesses and opportunities are on the Businesses page. Visit it to explore what's available in the community."
  }

  // Population / residents / people
  if (q.includes('population') || q.includes('resident') || q.includes('people') || q.includes('how many')) {
    return 'Ikoha has a growing population of residents. For official figures or details, you can contact the community via the Contact form or email.'
  }

  // Greetings / help / what can you do
  if (q.includes('hello') || q.includes('hi ') || q.includes('hey') || q.includes('good morning') || q.includes('good afternoon') || q.includes('good evening')) {
    return "Hello! I'm the Ikoha Community assistant. You can ask me about the festival, location, contact details, news, events, resources, forum, gallery, and more. How can I help?"
  }
  if (q.includes('help') || q.includes('what can you') || q.includes('what do you') || q.includes('how can you')) {
    return DEFAULT_RESPONSE
  }

  // Not Ikoha-specific: show setup message when no API key
  return ''
}

async function callLLM(
  apiUrl: string,
  apiKey: string,
  model: string,
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[]
): Promise<string> {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || res.statusText)
  }
  const data = await res.json()
  return data?.choices?.[0]?.message?.content?.trim() || "I couldn't generate a response. Please try again."
}

export async function POST(request: Request) {
  try {
    const groqKey = process.env.GROQ_API_KEY?.trim() || ''
    const openAiKey = process.env.OPENAI_API_KEY?.trim() || ''
    if (process.env.NODE_ENV === 'development' && !groqKey && !openAiKey) {
      console.warn('[Assistant] No GROQ_API_KEY or OPENAI_API_KEY in env. Add GROQ_API_KEY to .env.local in project root and restart dev server.')
    }
    const body = await request.json()
    const messages = Array.isArray(body.messages) ? body.messages as AssistantMessage[] : []
    const lastUser = messages.filter((m: AssistantMessage) => m.role === 'user').pop()
    const userContent = lastUser?.content?.trim() ?? ''

    if (!userContent) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    }

    // When no API key: Ikoha questions get fallback; other questions get setup message
    if (!groqKey && !openAiKey) {
      const fallback = getFallbackResponse(userContent)
      return NextResponse.json({ message: fallback || DEFAULT_RESPONSE })
    }

    const systemPrompt = { role: 'system' as const, content: SYSTEM_PROMPT }
    const chatMessages = [
      systemPrompt,
      ...messages.filter((m: AssistantMessage) => m.role !== 'system').slice(-20).map((m: AssistantMessage) => ({
        role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.content,
      })),
    ]

    // Prefer Groq (free tier); fallback to OpenAI
    if (groqKey) {
      try {
        const content = await callLLM(
          'https://api.groq.com/openai/v1/chat/completions',
          groqKey,
          'llama-3.1-8b-instant',
          chatMessages
        )
        return NextResponse.json({ message: content })
      } catch (e) {
        console.warn('Groq API error, trying OpenAI:', e)
        if (!openAiKey) throw e
      }
    }

    if (openAiKey) {
      const content = await callLLM(
        'https://api.openai.com/v1/chat/completions',
        openAiKey,
        'gpt-3.5-turbo',
        chatMessages
      )
      return NextResponse.json({ message: content })
    }

    const fallback = getFallbackResponse(userContent)
    return NextResponse.json({ message: fallback || DEFAULT_RESPONSE })
  } catch (e) {
    console.error('Assistant API error:', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or use the Contact form.' },
      { status: 500 }
    )
  }
}
