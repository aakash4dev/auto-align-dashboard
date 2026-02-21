'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import DocumentIngestion from '@/components/document-ingestion'
import AgenticDebateArena from '@/components/agentic-debate-arena'
import AlignedOutputPanel from '@/components/aligned-output-panel'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'ingestion' | 'debate' | 'output'>('ingestion')
  const [uploadedFiles, setUploadedFiles] = useState<{
    knowledge: File[]
    requirement: File[]
  }>({
    knowledge: [],
    requirement: [],
  })

  const handleFileUpload = (type: 'knowledge' | 'requirement', files: File[]) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files],
    }))
  }

  const handleRemoveFile = (type: 'knowledge' | 'requirement', index: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  const handleStartDebate = () => {
    setActiveTab('debate')
  }

  return (
    <div className="dark min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            {activeTab === 'ingestion' && (
              <DocumentIngestion
                onFilesUploaded={handleFileUpload}
                uploadedFiles={uploadedFiles}
                onRemoveFile={handleRemoveFile}
                onStartDebate={handleStartDebate}
              />
            )}
            {activeTab === 'debate' && <AgenticDebateArena uploadedFiles={uploadedFiles} />}
            {activeTab === 'output' && <AlignedOutputPanel />}
          </div>
        </main>
      </div>
    </div>
  )
}
