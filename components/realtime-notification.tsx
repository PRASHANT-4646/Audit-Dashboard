'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { useAuditLogs } from '@/hooks/useAuditLogs'
import { AuditLog } from '@/types'

export default function RealTimeNotification() {
  const { mutate } = useAuditLogs()

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly new log create karo
      if (Math.random() > 0.7) {
        const newLog: AuditLog = {
          id: `log-${Date.now()}`,
          eventType: ['login', 'logout', 'create', 'update', 'delete'][Math.floor(Math.random() * 5)],
          userId: `user-${Math.floor(Math.random() * 10) + 1}`,
          userName: `User ${Math.floor(Math.random() * 10) + 1}`,
          timestamp: new Date().toISOString(),
          details: `New action performed at ${new Date().toLocaleTimeString()}`,
          ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

        // 🔔 Notification show karo
        toast(`${newLog.eventType.toUpperCase()} Event`, {
          description: `A new ${newLog.eventType} event was recorded`,
          action: {
            label: "Refresh",
            onClick: () => {
              mutate()
            }
          }
        })
      }
    }, 10000) // 10s interval

    return () => clearInterval(interval)
  }, [mutate])

  return null
}
