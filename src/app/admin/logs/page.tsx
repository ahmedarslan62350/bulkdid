import { Suspense } from 'react'
import LogMonitor from '@/components/layout/admin/LogsMonitor'

export const dynamic = 'force-dynamic'

async function getInitialLogs() {
  return [
    { id: '1', timestamp: '2023-05-01T12:00:00Z', level: 'info', message: 'Application started' },
    { id: '2', timestamp: '2023-05-01T12:01:00Z', level: 'warning', message: 'High CPU usage detected' },
    { id: '3', timestamp: '2023-05-01T12:02:00Z', level: 'error', message: 'Database connection failed' },
  ]
}

export default async function LogsPage() {
  const initialLogs = await getInitialLogs()

  return (
    <div className="w-full h-screen p-5 overflow-y-auto scroll-smooth">
      <h1 className="text-2xl font-bold mb-4">Terminal Logs Monitor</h1>
      <Suspense fallback={<div>Loading logs...</div>}>
        <LogMonitor initialLogs={initialLogs} />
      </Suspense>
    </div>
  )
}