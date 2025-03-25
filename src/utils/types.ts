import { expense, income } from '@/utils/constants'

export type DialogType = 'edit' | 'add'
export type FinanceType = typeof income | typeof expense
export type TransactionType = 'income' | 'outcome'
export type transactionFilter = {
  dateRange: Array<string | Date>
  category: ''
}
export interface ExpansesCategory {
  id: number
  value: string
  label: string
  icon: string
}

export interface ExpenseCategories {
  [key: string]: ExpansesCategory
}

export interface Transaction {
  id: string
  name: string
  description: string
  category: string | null
  amount: number
  currency: string
  date: Date
  transactionType: TransactionType
}

export interface Finance {
  formDialog: boolean
  confirmDialog: boolean
  currentDialogType: DialogType
  title: string
  dialogFinanceType: FinanceType
  currencyList: string[]
  currentCurrency: string
  transactionList: Transaction[]
  currentExchange: ExchangeRateResponse
  transactionToDeleteEdit: Transaction
  filters: transactionFilter
  loading: boolean
}

export interface ExchangeRateResponse {
  result: string
  documentation: string
  terms_of_use: string
  time_last_update_unix: number
  time_last_update_utc: string
  time_next_update_unix: number
  time_next_update_utc: string
  base_code: string
  conversion_rates: Record<string, number>
}
