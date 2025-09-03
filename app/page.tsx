'use client'

import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuditLogTable from '@/components/audit-log-table'
import SearchFilters from '@/components/search-filters'
import Pagination from '@/components/pagination'
// import RealTimeNotification from '@/components/realtime-notification'
import { useAuditLogs } from '@/hooks/useAuditLogs'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const { logs, total, isLoading } = useAuditLogs()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 ">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-red-500">
              Audit Log 
            </h1>
            <p className="text-blue-500 text-xl" >
              Track, analyze, and search system audit logs effortlessly in real-time.
            </p>
          </div>
          
          {/* <RealTimeNotification /> */}

          {/* Audit Logs Card */}
          <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Audit Logs</CardTitle>
              <CardDescription className="text-blue-500 text-xl">
                Easily explore and filter logs — <span className="font-medium text-gray-900">{total}</span> entries available.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <SearchFilters />

              <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                ) : (
                  <>
                    <AuditLogTable logs={logs} />
                    <Pagination total={total} />
                  </>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
