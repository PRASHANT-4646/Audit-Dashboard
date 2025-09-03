'use client'

import { useState, useEffect } from 'react'
import { useAuditLogStore } from '@/store/useAuditLogStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, FilterX } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/useDebounce'
import { MultiSelect, MultiSelectOption } from '@/components/ui/multi-select'

const eventTypes = ['login', 'logout', 'create', 'update', 'delete']
const users = Array.from({ length: 10 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`
}))

const userOptions: MultiSelectOption[] = users.map(user => ({
  value: user.id,
  label: user.name
}))

export default function SearchFilters() {
  const { filters, setSearch, setEventTypes, setUsers, setDateRange, resetFilters } = useAuditLogStore()
  const [localSearch, setLocalSearch] = useState(filters.search)
  const [dateErrors, setDateErrors] = useState<{ start?: string; end?: string }>({})
  
  const debouncedSearch = useDebounce(localSearch, 500)

  const validateDateRange = (start: Date | null, end: Date | null) => {
    const errors: { start?: string; end?: string } = {}

    if (start && end && start > end) {
      errors.start = 'Start date cannot be after end date'
      errors.end = 'End date cannot be before start date'
    }

    if (start && start > new Date()) {
      errors.start = 'Start date cannot be in the future'
    }

    if (end && end > new Date()) {
      errors.end = 'End date cannot be in the future'
    }

    setDateErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch, setSearch])

  const handleEventTypeChange = (eventType: string, checked: boolean) => {
    const newEventTypes = checked
      ? [...filters.eventTypes, eventType]
      : filters.eventTypes.filter(et => et !== eventType)
    setEventTypes(newEventTypes)
  }

  const handleUserChange = (userIds: string[]) => {
    setUsers(userIds)
  }

  const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
    const newDate = date || null
    const newDateRange = {
      ...filters.dateRange,
      [type]: newDate
    }

    if (validateDateRange(
      type === 'start' ? newDate : filters.dateRange.start,
      type === 'end' ? newDate : filters.dateRange.end
    )) {
      setDateRange(newDateRange)
    }
  }

  const handleResetFilters = () => {
    resetFilters()
    setLocalSearch('')
    setDateErrors({})
  }

  const isSearchValid = localSearch.length <= 100

  return (
    <div className="flex flex-col gap-6 p-4 bg-white dark:bg-gray-900 border rounded-2xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 🔍 Search input */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-xl font-medium text-gray-900 dark:text-gray-100">Search</Label>
          <Input
            id="search"
            placeholder="Search in details..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className={cn(
              "w-full bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500",
              !isSearchValid && "border-red-500 focus:ring-red-500"
            )}
          />
          {!isSearchValid && (
            <p className="text-xl text-red-500">Search term must be 100 characters or less</p>
          )}
        </div>

        {/* 📂 Event Type filter */}
        <div className="space-y-2">
          <Label className="text-xl font-medium text-gray-900 dark:text-gray-100">Event Type</Label>
          <div className="flex flex-wrap gap-3">
            {eventTypes.map(eventType => (
              <div key={eventType} className="flex items-center gap-2">
                <Checkbox
                  id={`event-type-${eventType}`}
                  checked={filters.eventTypes.includes(eventType)}
                  onCheckedChange={(checked) => handleEventTypeChange(eventType, checked as boolean)}
                />
                <Label htmlFor={`event-type-${eventType}`} className="text-xl text-gray-800 dark:text-gray-200 cursor-pointer">
                  {eventType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* 👥 User filter */}
        <div className="space-y-2">
          <Label className="text-xl font-medium text-gray-900 dark:text-gray-100">User</Label>
          <MultiSelect 
            options={userOptions}
            selected={filters.users}
            onChange={handleUserChange}
            placeholder="Select users"
          />
        </div>

        {/* 📅 Date Range filter */}
        <div className="space-y-2">
          <Label className="text-xl font-medium text-gray-900 dark:text-gray-100">Date Range</Label>
          <div className="flex flex-col gap-3">
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left rounded-lg font-normal text-xl dark:bg-gray-800 dark:text-gray-100",
                    !filters.dateRange.start && "text-gray-400",
                    dateErrors.start && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-300" />
                  {filters.dateRange.start ? format(filters.dateRange.start, "PPP") : <span>Start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-lg shadow-lg dark:bg-gray-800">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.start || undefined}
                  onSelect={(date) => handleDateChange('start', date)}
                  initialFocus
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left rounded-lg font-normal text-xl dark:bg-gray-800 dark:text-gray-100",
                    !filters.dateRange.end && "text-gray-400",
                    dateErrors.end && "border-red-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-300" />
                  {filters.dateRange.end ? format(filters.dateRange.end, "PPP") : <span>End date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-lg shadow-lg dark:bg-gray-800">
                <Calendar
                  mode="single"
                  selected={filters.dateRange.end || undefined}
                  onSelect={(date) => handleDateChange('end', date)}
                  initialFocus
                  disabled={(date) =>
                    date > new Date() || 
                    (filters.dateRange.start ? date < filters.dateRange.start : false)
                  }
                />
              </PopoverContent>
            </Popover>

            {/* ⛔ Date Errors */}
            {dateErrors.start && <p className="text-xl text-red-500">{dateErrors.start}</p>}
            {dateErrors.end && <p className="text-xl text-red-500">{dateErrors.end}</p>}
          </div>
        </div>
      </div>

      {/* ♻️ Reset Filters Button */}
      <div>
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="gap-2 rounded-lg border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-600"
        >
          <FilterX className="h-5 w-4 text-xl text-gray-900 dark:text-gray-100" />
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
