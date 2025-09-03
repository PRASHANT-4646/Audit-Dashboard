'use client'

import { AuditLog } from '@/types'
import { format } from 'date-fns'

interface LogDetailModalProps {
  log: AuditLog | null
  onClose: () => void
}

export default function LogDetailModal({ log, onClose }: LogDetailModalProps) {
  if (!log) return null

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'login': return 'bg-blue-100 text-blue-800'
      case 'logout': return 'bg-gray-100 text-gray-800'
      case 'create': return 'bg-green-100 text-green-800'
      case 'update': return 'bg-yellow-100 text-yellow-800'
      case 'delete': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-200 text-gray-900'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Log Details</h2>
          <p className="text-xl text-gray-500">
            Detailed information about the audit log entry
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex justify-between text-xl">
            <span className="font-medium text-gray-600">ID</span>
            <span className="text-gray-800">{log.id}</span>
          </div>

          <div className="flex justify-between text-xl">
            <span className="font-medium text-gray-600">Timestamp</span>
            <span className="text-gray-800">
              {format(new Date(log.timestamp), 'PPpp')}
            </span>
          </div>

          <div className="flex justify-between items-center text-xl">
            <span className="font-medium text-gray-600">Event Type</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(
                log.eventType
              )}`}
            >
              {log.eventType}
            </span>
          </div>

          <div className="flex justify-between text-xl">
            <span className="font-medium text-gray-600">User</span>
            <span className="text-gray-800">
              {log.userName} ({log.userId})
            </span>
          </div>

          {log.ipAddress && (
            <div className="flex justify-between text-xl">
              <span className="font-medium text-gray-600">IP Address</span>
              <span className="text-gray-800">{log.ipAddress}</span>
            </div>
          )}

          {log.userAgent && (
            <div className="flex justify-between text-xl">
              <span className="font-medium text-gray-600">User Agent</span>
              <span className="text-gray-800 truncate max-w-[70%]">
                {log.userAgent}
              </span>
            </div>
          )}

          <div className="text-xl">
            <span className="font-medium text-gray-600 block mb-1">Details</span>
            <p className="text-gray-800 whitespace-pre-wrap rounded-md bg-gray-50 p-3">
              {log.details}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
