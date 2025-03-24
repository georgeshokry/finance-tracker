import { format } from 'date-fns'

export function formatDate(date: Date, formatMatch = 'dd/MM/yyyy'): string {
  if (!date) return ''
  return format(new Date(date), formatMatch)
}
