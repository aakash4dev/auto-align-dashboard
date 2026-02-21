'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PingPongAnimation from './ping-pong-animation'
import AgentMessage, { AgentMessageProps } from './agent-message'
import DebateProgress from './debate-progress'

interface AgenticDebateArenaProps {
  uploadedFiles: {
    knowledge: File[]
    requirement: File[]
  }
}

export default function AgenticDebateArena({ uploadedFiles }: AgenticDebateArenaProps) {
  const [isDebating, setIsDebating] = useState(true)
  const [currentRound, setCurrentRound] = useState(1)
  const [messages, setMessages] = useState<AgentMessageProps[]>([
    {
      id: '1',
      agent: 'defender',
      type: 'violation',
      title: 'Data Privacy Conflict',
      content:
        'The new feature request violates Section 4.2.1 of the Data Protection Policy. User data cannot be stored without explicit GDPR consent.',
      severity: 'high',
      timestamp: new Date(Date.now() - 5000),
    },
    {
      id: '2',
      agent: 'drafter',
      type: 'solution',
      title: 'Consent Framework Enhancement',
      content:
        'Propose implementing a tiered consent system that allows users to opt-in at different levels. This maintains compliance while enabling the new feature for consenting users.',
      severity: 'medium',
      timestamp: new Date(Date.now() - 4000),
    },
    {
      id: '3',
      agent: 'defender',
      type: 'analysis',
      title: 'Compliance Verification',
      content:
        'Tiered consent model is compatible with GDPR Article 7. Requires audit trail logging per Section 5.3.2.',
      severity: 'low',
      timestamp: new Date(Date.now() - 3000),
    },
    {
      id: '4',
      agent: 'drafter',
      type: 'solution',
      title: 'Implementation Path',
      content:
        'Integrate audit logging into existing EventStore infrastructure. Estimated 2-week implementation with 95% compliance coverage.',
      severity: 'low',
      timestamp: new Date(Date.now() - 2000),
    },
  ])

  // Simulate debate rounds
  useEffect(() => {
    if (!isDebating) return

    const interval = setInterval(() => {
      setCurrentRound((prev) => (prev >= 5 ? 1 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [isDebating])

  const defenderMessages = messages.filter((m) => m.agent === 'defender')
  const drafterMessages = messages.filter((m) => m.agent === 'drafter')

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-gradient">Agentic Debate Arena</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Watch as the Defender and Drafter agents engage in multi-round debate to find compliant solutions.
        </p>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left panel - Defender agent */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 rounded-lg border border-purple-accent/30 bg-purple-accent/10 space-y-2">
            <h2 className="text-lg font-bold text-purple-accent">Defender Agent</h2>
            <p className="text-sm text-muted-foreground">Identifies violations and compliance issues</p>
          </div>

          {/* Messages */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {defenderMessages.length === 0 ? (
              <div className="p-4 rounded-lg bg-card border border-border text-center">
                <p className="text-sm text-muted-foreground">Analyzing policies...</p>
              </div>
            ) : (
              defenderMessages.map((msg) => (
                <AgentMessage key={msg.id} {...msg} />
              ))
            )}
          </div>
        </div>

        {/* Center - Ping pong animation */}
        <div className="lg:col-span-1 flex flex-col items-center justify-between">
          <div className="w-full p-6 rounded-lg border border-border bg-card/50">
            <PingPongAnimation round={currentRound} isDebating={isDebating} />
          </div>

          {/* Control buttons */}
          <div className="mt-6 flex gap-2 w-full justify-center">
            <Button
              variant={isDebating ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsDebating(!isDebating)}
              className={
                isDebating
                  ? 'bg-purple-accent hover:bg-purple-accent/80 text-white'
                  : 'border-border text-foreground hover:bg-card'
              }
            >
              {isDebating ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right panel - Drafter agent */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 rounded-lg border border-blue-accent/30 bg-blue-accent/10 space-y-2">
            <h2 className="text-lg font-bold text-blue-accent">Drafter Agent</h2>
            <p className="text-sm text-muted-foreground">Proposes compliant solutions</p>
          </div>

          {/* Messages */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {drafterMessages.length === 0 ? (
              <div className="p-4 rounded-lg bg-card border border-border text-center">
                <p className="text-sm text-muted-foreground">Generating solutions...</p>
              </div>
            ) : (
              drafterMessages.map((msg) => (
                <AgentMessage key={msg.id} {...msg} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom progress section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <DebateProgress
            currentRound={currentRound}
            totalRounds={5}
            isDebating={isDebating}
            violations={defenderMessages.length}
            resolutions={drafterMessages.length}
          />
        </div>
      </div>

      {/* Action footer */}
      <div className="p-6 rounded-lg border border-border bg-card/50 flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">Debate Summary</p>
          <p className="text-sm text-muted-foreground mt-1">
            {defenderMessages.length} violation{defenderMessages.length !== 1 ? 's' : ''} found,{' '}
            {drafterMessages.length} solution{drafterMessages.length !== 1 ? 's' : ''} proposed
          </p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-purple-accent to-blue-accent hover:from-purple-accent/80 hover:to-blue-accent/80 text-white">
          <Download className="w-4 h-4" />
          Generate Report
        </Button>
      </div>
    </div>
  )
}
