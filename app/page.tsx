'use client'

import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AuditLogTable from '@/components/audit-log-table'
import SearchFilters from '@/components/search-filters'
import Pagination from '@/components/pagination'
import { useAuditLogs } from '@/hooks/useAuditLogs'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const { logs, total, isLoading } = useAuditLogs()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-red-500 dark:text-red-400">
              Audit Log 
            </h1>
            <p className="text-blue-500 dark:text-blue-400 text-xl">
              Track, analyze, and search system audit logs effortlessly in real-time.
            </p>
          </div>

          {/* Audit Logs Card */}
          <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">Audit Logs</CardTitle>
              <CardDescription className="text-blue-500 dark:text-blue-300 text-xl">
                Easily explore and filter logs — <span className="font-medium text-gray-900 dark:text-white">{total}</span> entries available.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <SearchFilters />

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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
